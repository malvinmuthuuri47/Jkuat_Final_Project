// import React, { useEffect, useState } from 'react'
// import SideBar from './Components/SideBar'
// import Axios from 'axios'
// import UserRegistration from './Components/userRelated/UserRegistration'
import { Link, useNavigate } from 'react-router-dom'

const AdminDashboard = () => {
  const navigate = useNavigate()
  const prevPage = (event) => {
    event.preventDefault()
    navigate(-1)
  }
  // const [userData, setUserData] = useState([])

  // useEffect(() => {
  //   const userData = async () => {
  //     try {
  //       const response = await Axios.get('http://127.0.0.1:5000/admin/users')
  //       setUserData(response)
  //       if (response) {
  //         console.log(response)
  //       }
  //     }
  //     catch (error) {
  //       console.log(error)
  //     }
  //   }
  //   userData()
  // }, [])


  return (
    <>
      {/* <UserRegistration /> */}
      <Link to='/admin/createStudent'>Add a new student</Link> <br />
      <Link to='/admin/viewStudents'>View Students</Link> <br />
      {/* This button should have a logout function */}
      <button onClick={prevPage}>Go Back/Logout</button>
    </>
  )
}

export default AdminDashboard