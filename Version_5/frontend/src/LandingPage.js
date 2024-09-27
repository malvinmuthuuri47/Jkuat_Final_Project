import React, { useState } from 'react'
import './App.css'
import { Link, useNavigate } from 'react-router-dom'
import Axios from 'axios'
// import AdminLoginPage from './AdminLoginPage'

const LandingPage = () => {
  const navigate = useNavigate()
  const [ regNo, setRegNo ] = useState('')
  const [ password, setPassword ] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    Axios.post("http://127.0.0.1:5000/user/login", { regNo, password })
    .then(response => {
      navigate('/userDashboard')
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
            <img src='/logo192.png' alt='School'/>
        </div>
        <div className="form-section">
            <form method='POST'>
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
              <Link to='/AdminLogin'>Login as Admin</Link>
            </form>
        </div>
    </main>
    
  )
}

export default LandingPage