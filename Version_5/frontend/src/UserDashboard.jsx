import React, { useState, useEffect, useContext } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from './context/AuthContext'

const UserDashboard = () => {
    const { regno } = useParams()
    const [userData, setUserData] = useState({})
    const [loading, setLoading] = useState(true)
    const { dispatch } = useContext(AuthContext)
    

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.post(`http://127.0.0.1:5000/user/data`, {regno})
                if (response) {
                    console.log(response.data.data)
                    setUserData(response.data.data)
                }

            }
            catch (error) {
                console.log(error)
            }
            finally {
                setLoading(false)
            }
        }
        getData()
    }, [regno])

    const handleLogout = () => {
        dispatch({type: 'LOGOUT'})
    }
  return (
    <>
        <div className="userDashContainer">
            <div className="userNav">
                <h1>{loading ? 'Loading...' : `${userData.name}'s Dashboard`}</h1>
                {/* <h1>{userData.name}'s Dashboard</h1> */}
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