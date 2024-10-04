import React, { useState } from 'react'
import Navbar from '../Navbar'
import Footer  from '../Footer'
import axios from 'axios'
axios.defaults.withCredentials = true

const UserRegistration = () => {
    const [name, setName] = useState('')
    const [regNo, setRegNo] = useState('')
    const [password, setPassword] = useState('')
    const [fees, setFees] = useState('Not Paid')
    const [subjects, setSubjects] = useState([
        { name: 'Unit 1', score: '0' },
        { name: 'Unit 2', score: '0' },
        { name: 'Unit 3', score: '0' },
        { name: 'Unit 4', score: '0' },
        { name: 'Unit 5', score: '0' },
        { name: 'Unit 6', score: '0' },
        { name: 'Unit 7', score: '0' },
        { name: 'Unit 8', score: '0' },
    ])

    const handleSubjectChange = (index, e) => {
        const { name, value } = e.target
        const newSubjects = [...subjects]
        newSubjects[index][name] = value
        setSubjects(newSubjects)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const studentData = {
                name,
                regNo,
                password,
                fees,
                subjects
            }

            const response = await axios.post('http://127.0.0.1:5000/admin/users', studentData)

            console.log(response)
            
        }
        catch (error) {
            console.log("Error submitting user data", error)
        }
    }
    
  return (
    <>
        <Navbar />
        <div className="userreg-form-container">
            <div className='userreg-form'>
                <form onSubmit={handleSubmit}>
                    <label>Enter Student Name</label><br />
                    <input 
                        type="text"
                        name="studentName"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    /> <br />
                    <label>Enter Student Registration Number</label><br />
                    <input 
                        type="text"
                        name="studentReg"
                        value={regNo}
                        onChange={(e) => setRegNo(e.target.value)}
                    /> <br />
                    <label>Enter Student Password</label> <br />
                    <input 
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    /> <br />
                    <label>Fees Statement</label> <br />
                    <input
                        type="text"
                        name="fees"
                        value={fees}
                        onChange={(e) => setFees(e.target.value)}
                    /> <br />
                    <h3>Subjects</h3>
                    {subjects.map((subject, index) => {
                        return (
                        <div key={index}>
                            <label>Subject {index + 1} Name:</label> <br />
                            <input 
                                type='text'
                                name='name'
                                vaue={subject.name}
                                onChange={(e) => handleSubjectChange(index, e)}
                                required
                            /><br />

                            <label>Score:</label> <br />
                            <input 
                                type='number'
                                name='score'
                                value={subject.score}
                                onChange={(e) => handleSubjectChange(index, e)}
                                required
                            />
                        </div>
                        )
                    })}
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
        <Footer />
    </>
  )
}

export default UserRegistration