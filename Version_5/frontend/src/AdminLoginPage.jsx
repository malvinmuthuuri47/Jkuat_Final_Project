import React, { useState, useContext } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import SchoolIcon from '@mui/icons-material/School'
import { AuthContext } from './context/AuthContext'
axios.defaults.withCredentials = true

const AdminLoginPage = () => {
    const role = process.env.REACT_APP_Role || 'admin'
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const { dispatch } = useContext(AuthContext)

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            await axios.post("http://127.0.0.1:5000/admin/login", { role, email, password })
            .then((response) => {
              const email = response.data.admin.email
              dispatch({type: 'LOGIN', payload: response})
              localStorage.setItem('admin', JSON.stringify(email))
              navigate('/adminDashboard')
            })
            .catch(error => {
              console.log(error)
            })
    
            // Reset state
            setEmail('')
            setPassword('')
        } catch (error) {
            console.log(error)
        }
    }


    // OnSubmit handler to redirect to the adminDashboard when the admin correctly authenticates
  return (
    <main className="main-section">
      <div className='img-div'>
        <img src='School.jpeg' alt='School' />
      </div>
      <div className='form-div'>
        <form method='POST' onSubmit={handleSubmit}>
          <SchoolIcon />
          <h2>Welcome to XYZ Campus.</h2>
          <h3>Championing Excellence and Briliance</h3>
          <div className="input-group">
            <label htmlFor='input1'>Admin Email:</label> <br/>
            <input 
              id='input1'
              type='text'
              name='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            /> <br/>
          </div>
          <div className="input-group">
            <label htmlFor='input2' >Password:</label> <br/>
            <input 
              id='input2'
              type='password'
              name='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            /><br />
          </div>
          <div className="button-container">
            <button type='submit'>Login</button>
            <Link to='/'>
              <button>Back to Home Page</button>
            </Link>
          </div>
        </form>
      </div>

        {/* {errMsg && <p style={{ color: 'red' }}>{errMsg}</p>} */}
    </main>
  )
}

export default AdminLoginPage