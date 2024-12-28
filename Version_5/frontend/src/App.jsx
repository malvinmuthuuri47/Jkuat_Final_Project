import React from 'react'
import LandingPage from './LandingPage';
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import AdminLoginPage from './AdminLoginPage';
import AdminDashboard from './AdminDashboard'
import UserDashboard from './UserDashboard'
import UserRegistration from './Components/userRelated/UserRegistration'
import ViewUsers from './Components/userRelated/ViewUsers'
import EditUser from './Components/userRelated/EditUser'
import ProtectedRoute from './Components/ProtectedRoute'
import NotificationPage from './Components/notifications/NotificationPage';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<LandingPage />} />
          <Route exact path='/adminLogin' element={<AdminLoginPage />} />
          <Route exact path='/adminDashboard' element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
            } />
          <Route exact path='/userDashboard/:regno' element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          } />
          <Route exact path='/admin/createStudent' element={
            <ProtectedRoute>
              <UserRegistration />
            </ProtectedRoute>
          } />
          <Route exact path='/admin/viewStudents' element={
            <ProtectedRoute>
              <ViewUsers />
            </ProtectedRoute>
          } />
          <Route exact path='/admin/editStudent/:regno' element={
            <ProtectedRoute>
              <EditUser />
            </ProtectedRoute>
          } />
          <Route exact path='/admin/editStudent/sendNotification/:regno' element={
            <ProtectedRoute>
              <NotificationPage />
            </ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;