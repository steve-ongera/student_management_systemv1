#  Student Management System

A full-stack Student Management System built with **Node.js + Express** (backend) and **React** (frontend).

---

##  Project Structure

```
student-management-system/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── studentController.js   # CRUD logic
│   │   ├── models/
│   │   │   └── Student.js             # Student schema (SQLite via better-sqlite3)
│   │   ├── routes/
│   │   │   └── studentRoutes.js       # Express routes
│   │   ├── middleware/
│   │   │   └── errorHandler.js        # Global error handling
│   │   └── db/
│   │       └── database.js            # DB init & connection
│   ├── data/
│   │   └── students.db                # SQLite database (auto-created)
│   ├── package.json
│   └── server.js                      # Entry point
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── api/
│   │   │   └── studentApi.js          # Axios API calls
│   │   ├── components/
│   │   │   ├── StudentTable.jsx       # List all students
│   │   │   ├── StudentForm.jsx        # Add / Edit form
│   │   │   ├── StudentModal.jsx       # Modal wrapper
│   │   │   ├── SearchBar.jsx          # Search/filter
│   │   │   ├── StatsCards.jsx         # Summary stats
│   │   │   └── ConfirmDialog.jsx      # Delete confirmation
│   │   ├── App.jsx                    # Root component + state
│   │   ├── main.jsx                   # React entry point
│   │   └── index.css                  # Global styles
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

---

##  Features

-  Add, Edit, Delete, View students
-  Search & filter by name, email, or course
-  Summary stats (total, active, average GPA)
-  SQLite database (no setup needed)
-  RESTful API
-  Responsive UI

---

##  Tech Stack

| Layer     | Technology                          |
|-----------|-------------------------------------|
| Backend   | Node.js, Express, better-sqlite3    |
| Frontend  | React 18, Vite, Axios               |
| Database  | SQLite (file-based, zero config)    |
| Styling   | CSS (custom design system)          |

---

##  Quick Start

### 1. Backend
```bash
cd backend
npm install
npm run dev        # Starts on http://localhost:5000
```

### 2. Frontend
```bash
cd frontend
npm install
npm run dev        # Starts on http://localhost:5173
```

---

##  API Endpoints

| Method | Endpoint              | Description         |
|--------|-----------------------|---------------------|
| GET    | `/api/students`       | Get all students    |
| GET    | `/api/students/:id`   | Get student by ID   |
| POST   | `/api/students`       | Create student      |
| PUT    | `/api/students/:id`   | Update student      |
| DELETE | `/api/students/:id`   | Delete student      |

---

##  Student Schema

```json
{
  "id": 1,
  "name": "Jane Doe",
  "email": "jane@example.com",
  "course": "Computer Science",
  "year": 2,
  "gpa": 3.8,
  "status": "active",
  "enrolled_at": "2024-01-15"
}
```