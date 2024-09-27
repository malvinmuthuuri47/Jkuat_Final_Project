import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

const EditUser = () => {
    const { regno } = useParams()
    const [userDetails, setUserDetails] = useState('')

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value
        }))
    }

    const handleSubjectChange = (index, field, value) => {
        const updatedSubjects = userDetails.subjects.map((subject, i) => (
            i === index ? { ...subject, [field]: value } : subject
        ))
        setUserDetails((prevDetails) => ({
            ...prevDetails,
            subjects: updatedSubjects,
        }))
    }
    // console.log(params)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:5000/admin/users/${regno}`)
                if (response) {
                    console.log(response.data.user)
                    setUserDetails(response.data.user)
                }
                else {
                    console.log('Failed to get user details')
                }
            }
            catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [regno])


    const postData = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(`http://127.0.0.1:5000/admin/users/${regno}`, userDetails)
            if (response) {
                console.log(response)
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    const navigate = useNavigate()
    const prevPage = (event) => {
        event.preventDefault()
        navigate(-1)
    }

  return (
    <div>
        {userDetails ? (
            <>
                <h1>Edit {userDetails.name}'s details</h1>
                <form onSubmit={postData}>
                    <label>Name</label>
                    <input 
                        type="text"
                        name="name"
                        value={userDetails.name}
                        onChange={handleInputChange}
                        required
                    /> <br />
                    <label>Fees Status</label>
                    <input 
                        type="text"
                        name="fees"
                        value={userDetails.fees}
                        onChange={handleInputChange}
                        required
                    /> <br />
                    <label>Registration Number</label>
                    <input 
                        type="text"
                        name="regno"
                        value={userDetails.regno}
                        readOnly
                    /> <br />
                    <label>Subjects</label>
                    {userDetails.subjects && userDetails.subjects.length > 0 ? (
                        userDetails.subjects.map((subject, index) => (
                            <div key={index}>
                                <label>Subject {index + 1}</label> <br />
                                <input 
                                    type="text"
                                    value={subject.name}
                                    onChange={(e) => handleSubjectChange(index, 'name', e.target.value)}
                                />
                                <label>Score</label>
                                <input 
                                    type="text"
                                    value={subject.score}
                                    onChange={(e) => handleSubjectChange(index, 'score', e.target.value)}
                                />
                            </div>
                        ))
                    ) : (
                        <p>No Subjects Available</p>
                    )}
                    <button type="submit">Submit</button>
                </form>
                <button onClick={prevPage}>Go Back</button>
            </>
        ): (
            <p>Loading User Details...</p>
        )}
    </div>
  )
}

export default EditUser