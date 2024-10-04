import { useContext } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import axios from 'axios'
axios.defaults.withCredentials = true

const NavBar = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const { dispatch } = useContext(AuthContext)

    const handleDashboardClick = () => {
        if (location.pathname !== '/adminDashboard') {
            navigate('/adminDashboard')
        }
    }

    const handleLogout = async () => {
        try {
          const response = await axios.post(`http://127.0.0.1:5000/admin/logout`)
          if (response) {
            console.log('Response from admin/logout API', response)
            dispatch({type: 'LOGOUT'})
            localStorage.removeItem('admin')
            navigate('/adminLogin')
          }
        }
        catch (error) {
          console.log('Error trying to access delete token API')
        }
      }
  return (
    <>
        <div className="navbar">

            <Link to='/adminDashboard' onClick={handleDashboardClick}>Dashboard</Link>
            <Link to='/admin/createStudent'>Add a new Student</Link>
            <Link to='/admin/viewStudents'>View Student Details</Link>
            <button onClick={handleLogout}>Logout</button>
        </div>

    </>
  )
}

export default NavBar