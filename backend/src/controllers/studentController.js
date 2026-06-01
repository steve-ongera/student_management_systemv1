const db = require('../db/database');

const promisify = (fn) => (...args) => new Promise((resolve, reject) =>
  fn(...args, (err, result) => err ? reject(err) : resolve(result))
);

const dbFind = promisify(db.find.bind(db));
const dbFindOne = promisify(db.findOne.bind(db));
const dbInsert = promisify(db.insert.bind(db));
const dbUpdate = promisify(db.update.bind(db));
const dbRemove = promisify(db.remove.bind(db));
const dbCount = promisify(db.count.bind(db));

// GET /api/students
const getAllStudents = async (req, res) => {
  try {
    const { search, status } = req.query;
    let query = {};
    
    if (status) query.status = status;
    
    let students = await dbFind(query);
    
    // Apply search filter in-memory (NeDB regex)
    if (search) {
      const re = new RegExp(search, 'i');
      students = students.filter(s => re.test(s.name) || re.test(s.email) || re.test(s.course));
    }
    
    // Sort newest first
    students.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    
    // Rename _id to id
    students = students.map(({ _id, ...s }) => ({ id: _id, ...s }));
    
    // Compute stats from all students
    const all = await dbFind({});
    const stats = {
      total: all.length,
      active: all.filter(s => s.status === 'active').length,
      inactive: all.filter(s => s.status === 'inactive').length,
      graduated: all.filter(s => s.status === 'graduated').length,
      avg_gpa: all.length ? +(all.reduce((sum, s) => sum + (s.gpa || 0), 0) / all.length).toFixed(2) : 0
    };
    
    res.json({ students, stats });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/students/:id
const getStudentById = async (req, res) => {
  try {
    const student = await dbFindOne({ _id: req.params.id });
    if (!student) return res.status(404).json({ error: 'Student not found' });
    const { _id, ...rest } = student;
    res.json({ id: _id, ...rest });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/students
const createStudent = async (req, res) => {
  try {
    const { name, email, course, year, gpa, status, enrolled_at } = req.body;
    if (!name || !email || !course) return res.status(400).json({ error: 'Name, email, and course are required' });
    
    const now = new Date().toISOString();
    const doc = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      course: course.trim(),
      year: parseInt(year) || 1,
      gpa: parseFloat(gpa) || 0,
      status: status || 'active',
      enrolled_at: enrolled_at || now.split('T')[0],
      created_at: now,
      updated_at: now
    };
    
    const inserted = await dbInsert(doc);
    const { _id, ...rest } = inserted;
    res.status(201).json({ id: _id, ...rest });
  } catch (err) {
    if (err.errorType === 'uniqueViolated') return res.status(409).json({ error: 'Email already exists' });
    res.status(500).json({ error: err.message });
  }
};

// PUT /api/students/:id
const updateStudent = async (req, res) => {
  try {
    const existing = await dbFindOne({ _id: req.params.id });
    if (!existing) return res.status(404).json({ error: 'Student not found' });
    
    const { name, email, course, year, gpa, status, enrolled_at } = req.body;
    const update = {
      name: name?.trim() || existing.name,
      email: email?.trim().toLowerCase() || existing.email,
      course: course?.trim() || existing.course,
      year: parseInt(year) || existing.year,
      gpa: gpa !== undefined ? parseFloat(gpa) : existing.gpa,
      status: status || existing.status,
      enrolled_at: enrolled_at || existing.enrolled_at,
      updated_at: new Date().toISOString()
    };
    
    await dbUpdate({ _id: req.params.id }, { $set: update });
    const updated = await dbFindOne({ _id: req.params.id });
    const { _id, ...rest } = updated;
    res.json({ id: _id, ...rest });
  } catch (err) {
    if (err.errorType === 'uniqueViolated') return res.status(409).json({ error: 'Email already exists' });
    res.status(500).json({ error: err.message });
  }
};

// DELETE /api/students/:id
const deleteStudent = async (req, res) => {
  try {
    const existing = await dbFindOne({ _id: req.params.id });
    if (!existing) return res.status(404).json({ error: 'Student not found' });
    await dbRemove({ _id: req.params.id });
    res.json({ message: 'Student deleted successfully', id: req.params.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getAllStudents, getStudentById, createStudent, updateStudent, deleteStudent };