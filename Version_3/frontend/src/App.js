import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import HomePage from './pages/HomePage'
import AdminDashboard from './pages/admin/adminDashboard'
import StudentDashboard from './pages/student/StudentDashboard'
import TeacherDashboard from './pages/teacher/TeacherDashboard'
import LoginPage from './pages/LoginPage'
import AdminRegisterPage from './pages/admin/adminRegisterPage'
import ChooseUser from './pages/ChooseUser'

const App = () => {
  const { currentRole } = useSelector(state => state.user)

  return (
    <Router>
      {currentRole === null &&
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/choose" element={<ChooseUser visitor="normal" />} />
          <Route path="/chooseasguest" element={<ChooseUser visitor="guest" />} />

          <Route path="/Adminlogin" element={<LoginPage role="Admin" />} />
          <Route path="/Studentlogin" element={<LoginPage role="Student" />} />
          <Route path="/Teacherlogin" element={<LoginPage role="Teacher" />} />

          <Route path="/Adminregister" element={<AdminRegisterPage />} />
          
          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
      }

      {currentRole === "Admin" &&
        <>
          <AdminDashboard />
        </>
      }

      {currentRole === "Student" &&
        <>
          <StudentDashboard />
        </>
      }

      {currentRole === "Teacher" &&
        <>
          <TeacherDashboard />
        </>
      }
    </Router>
  )
}

export default App