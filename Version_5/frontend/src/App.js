import React from 'react'
import LandingPage from './LandingPage';
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import AdminLoginPage from './AdminLoginPage';
import AdminDashboard from './AdminDashboard'
import UserDashboard from './UserDashboard'
import UserRegistration from './Components/userRelated/UserRegistration'
import ViewUsers from './Components/userRelated/ViewUsers'
import EditUser from './Components/userRelated/EditUser'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<LandingPage />} />
          <Route exact path='/adminLogin' element={<AdminLoginPage />} />
          <Route exact path='/adminDashboard' element={<AdminDashboard />} />
          <Route exact path='/userDashboard' element={<UserDashboard />} />
          <Route exact path='/admin/createStudent' element={<UserRegistration />} />
          <Route exact path='/admin/viewStudents' element={<ViewUsers />} />
          <Route exact path='/admin/editStudent/:regno' element={<EditUser />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;