import React, { useState } from 'react'
import '../../App.css'
import { useNavigate, useParams } from 'react-router-dom'
import { io } from 'socket.io-client'

const socket = io('http://localhost:5000', {
    withCredentials: true
})

const NotificationPage = () => {
    const [message, setMessage] = useState('')
    const navigate = useNavigate()
    const { regno } = useParams()

    console.log(`UseParams regno: ${regno}`)
    
    const handleMessage = async (e) => {
        e.preventDefault()
        // Sockets implementation goes here

        socket.on('connect', () => {
            console.log(`Socket connected: ${socket.id}`)
        })

        socket.emit('admin message', { message, regno} )

        socket.on('notification', (payload) => {
            console.log(`The admin payload: ${JSON.stringify(payload)}`)
        })

    }

    const handleNavigate = (e) => {
        navigate('/admin/viewStudents')
    }

  return (
    <div className='notification-form-container'>
        <form className='notification-form' onSubmit={handleMessage}>
            <input 
                type='text'
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button type="submit">Send Message</button>
            <button onClick={handleNavigate} type="button">Go Back</button>
        </form>
    </div>
  )
}

export default NotificationPage