import React, { useState, useEffect, useContext } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from './context/AuthContext'
import { io } from 'socket.io-client'
import BellIcon from 'react-bell-icon'

const socket = io('http://localhost:5000', {
    withCredentials: true
})

const UserDashboard = () => {
    const { regno } = useParams()
    const [userData, setUserData] = useState({})
    const [loading, setLoading] = useState(true)
    const { dispatch } = useContext(AuthContext)
    const [unreadCount, setUnreadCount] = useState(0)
    const [notifications, setNotifications] = useState([])
    const [isPopupVisible, setIsPopupVisible] = useState(false)
    

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.post(`http://127.0.0.1:5000/user/data`, {regno})
                if (response) {
                    console.log(response.data.data)
                    setUserData(response.data.data)
                }

                socket.on('connect', () => {
                    console.log('User socket connected')
                    socket.emit('user registration', regno)
                })

                socket.on('messageFromAdmin', (payload) => {
                    console.log(`message From Admin: ${payload}`)

                    setNotifications((prev) => [...prev, payload])
                    console.log(notifications)
                    setUnreadCount((prev) => prev + 1)
                })

                // return () => {
                //     console.log('Cleaning up socket connection')
                //     socket.diconnect()
                // }
            }
            catch (error) {
                console.log(error)
            }
            finally {
                setLoading(false)
            }
        }
        getData()
    }, [regno, notifications])

    const handleBellClick = () => {
        setIsPopupVisible((prev) => !prev)

        if (!isPopupVisible) setUnreadCount(0)
    }

    const handleLogout = () => {
        dispatch({type: 'LOGOUT'})
        socket.disconnect(regno)
    }
  return (
    <>
        <div className="userDashContainer">
            <div className="userNav">
                <h1>{loading ? 'Loading...' : `${userData.name}'s Dashboard`}</h1>
                <BellIcon
                    width='40'
                    color='white'
                    active={unreadCount > 0}
                    animate={true}
                    onClick={handleBellClick}
                />
                {unreadCount > 0 && (<span style={{
                    position: 'absolute',
                    top: '-5px',
                    right: '-5px',
                    background: 'red',
                    color: 'white',
                    borderRadius: '50%',
                    padding: '5px 10px',
                    fontSize: '12px'
                }}>{unreadCount}</span>)}
                {isPopupVisible && (<div>
                    <h4>Notifications</h4>
                    {notifications.length > 0 ? (
                        notifications.map((notif, index) => (
                            <div key={index} style={{
                                padding: '5px 0',
                                borderBottom: '1px solid  #f0f0f0',
                                fontSize: '14px'
                            }}>{notif}</div>
                        ))
                    ) : (
                        <p>No New notifications</p>
                    )}
                </div>)}
                <Link to='/'>
                    <button onClick={handleLogout}>Logout</button>
                </Link>
            </div>
            <div className='userDetails'>
                {loading ? (
                    <p>Loading Data...</p>
                ) : (
                        userData && (
                            <section>
                                <p>Name: {userData.name}</p> <br />
                                <p>Registration Number: {userData.regno}</p> <br />
                                <p>Fees: {userData.fees}</p> <br />
                                <p>Subjects Currently Enrolled:</p> <br />
                                {userData.subjects && userData.subjects.map((subject, index) => (
                                    <div key={index}>
                                        <label>Unit:</label>
                                        <p>{subject.name}</p> <br />
                                        <label>Score:</label>
                                        <p>{subject.score}</p>
                                    </div>
                                ))}
                                {userData.fees === 'Paid' && (
                                    <button>Download Exam Card</button>
                                )}
                            </section>
                        )
                    )
                }
            </div>
        </div>
    </>
  )
}

export default UserDashboard