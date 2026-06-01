const Datastore = require('@seald-io/nedb');
const path = require('path');

const db = new Datastore({
  filename: path.join(__dirname, '../../data/students.db'),
  autoload: true
});

// Ensure unique email
db.ensureIndex({ fieldName: 'email', unique: true });

// Seed if empty
db.count({}, (err, count) => {
  if (!err && count === 0) {
    const seedData = [
      { name: 'Alice Johnson', email: 'alice@example.com', course: 'Computer Science', year: 2, gpa: 3.9, status: 'active', enrolled_at: '2023-09-01' },
      { name: 'Bob Smith', email: 'bob@example.com', course: 'Mathematics', year: 3, gpa: 3.5, status: 'active', enrolled_at: '2022-09-01' },
      { name: 'Carol Williams', email: 'carol@example.com', course: 'Physics', year: 1, gpa: 3.7, status: 'active', enrolled_at: '2024-09-01' },
      { name: 'David Brown', email: 'david@example.com', course: 'Engineering', year: 4, gpa: 3.2, status: 'active', enrolled_at: '2021-09-01' },
      { name: 'Eva Martinez', email: 'eva@example.com', course: 'Biology', year: 2, gpa: 3.8, status: 'active', enrolled_at: '2023-09-01' },
      { name: 'Frank Lee', email: 'frank@example.com', course: 'Chemistry', year: 3, gpa: 2.9, status: 'inactive', enrolled_at: '2022-09-01' },
      { name: 'Grace Kim', email: 'grace@example.com', course: 'Computer Science', year: 4, gpa: 4.0, status: 'graduated', enrolled_at: '2020-09-01' },
    ];
    const now = new Date().toISOString();
    seedData.forEach(s => db.insert({ ...s, created_at: now, updated_at: now }));
    console.log(' Database seeded');
  }
});

console.log('Database initialized');
module.exports = db;