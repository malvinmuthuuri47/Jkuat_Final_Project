import React, { useState } from 'react'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'

const AdminLoginPage = () => {
    const role = process.env.REACT_APP_Role || 'admin'
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    // const [errMsg, setErrMsg] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault()

        try {
            Axios.post("http://127.0.0.1:5000/admin/login", { role, email, password }, { withCredentials: true })
            .then(response => {
              navigate('/adminDashboard')
              console.log(response)
            })
            .catch(error => {
              console.log(error.response)
              // setErrMsg(error.response.data)
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
    <>
        <form method='POST' onSubmit={handleSubmit}>
              <label>Admin Email:</label> <br/>
              <input 
                type='email'
                name='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              /> <br/>
              <label>Password:</label> <br/>
              <input 
                type='password'
                name='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              /><br />
              <button type='submit'>Login</button>
        </form>

        {/* {errMsg && <p style={{ color: 'red' }}>{errMsg}</p>} */}
    </>
  )
}

export default AdminLoginPage