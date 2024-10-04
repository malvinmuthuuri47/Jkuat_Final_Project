import React, { useState, useContext } from 'react'
import './App.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from './context/AuthContext'
import SchoolIcon from '@mui/icons-material/School'
axios.defaults.withCredentials = true
// import AdminLoginPage from './AdminLoginPage'

const LandingPage = () => {
  const navigate = useNavigate()
  const [ regNo, setRegNo ] = useState('')
  const [ password, setPassword ] = useState('')
  const { dispatch } = useContext(AuthContext)

  const handleSubmit = (event) => {
    event.preventDefault()
    axios.post("http://127.0.0.1:5000/user/login", { regNo, password })
    .then(response => {
      console.log(response)
      dispatch({type: 'LOGIN', payload: response})
      localStorage.setItem('user', JSON.stringify(response))
      navigate(`/userDashboard/${regNo}`)
      // console.log('Data sent to backend:', response)
    })
    .catch(error => console.log(error))

    // Reset the state for the inputs
    setRegNo('')
    setPassword('')
  }

  return (
    <main className="main">
        <div className="img-section">
            <img src='/School.jpeg' alt='School'/>
        </div>
        <div className="form-section">
          <form className='regForm' method='POST'>
            <SchoolIcon />
            <h2>Welcome to XYZ Campus.</h2>
            <h3>Championing Excellence and Briliance</h3>
            <label>Registration Number:</label> <br/>
            <input
              type='text'
              name='regno'
              value={regNo}
              onChange={(e) => setRegNo(e.target.value)}
            /> <br/>
            <label>Password:</label> <br/>
            <input 
              type='password'
              name='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            /><br />
            <button type='submit' onClick={handleSubmit}>Login</button>
            <p>Don't have an account? Contact Admin.</p>
            <Link className='regFormLink' to='/AdminLogin'>Login as Admin</Link>
          </form>
        </div>
    </main>
    
  )
}

export default LandingPage