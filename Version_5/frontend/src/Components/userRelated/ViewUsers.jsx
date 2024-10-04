import { useEffect, useState } from 'react'
import axios from 'axios'
import Navbar from '../Navbar'
import Footer from '../Footer'
import { useNavigate, Link } from 'react-router-dom'
axios.defaults.withCredentials = true

const ViewUsers = () => {
    const [userData, setUserData] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5000/admin/users')
                if (response) {
                    console.log('Data From admin getfunction for users', response.data.details)
                    setUserData(response.data.details)
                }
            } catch (error) {
                console.log(error)
            }
            finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    const handleDelete = async (regno) => {
        try {
            const response = await axios.delete(`http://127.0.0.1:5000/admin/users/${regno}`, {withCredentials: true})
            if (response) {
                console.log(response)
                setUserData((prevData) => prevData.filter((user) => user.regno !== regno))
            }
        }
        catch (error) {
            console.log(error)
        }
    }

  return (
    <div className='userDetails-container'>
        <Navbar />
        <div className='userDetails-div'>
            {loading ? (
                <p>Loading Data..</p>
            ) : (
                userData.map((data, index) =>  (
                    <section key={index} className='userData-section'>
                        <p>Name: {data.name}</p>
                        <p>Registration Number: {data.regno}</p>
                        <p>Fees Status: {data.fees}</p>
                        <p>Subjects currently Enrolled:</p>
                        {data.subjects && data.subjects.map((subject, index) => (
                            <div key={index}>
                                <p>Unit: </p>
                                <p>{subject.name}</p> <br />
                                <p>Score: </p>
                                <p>{subject.score}</p>
                            </div>
                        ))}
                        <hr />
                        <div className='userData-section-buttons'>
                            <Link to={`/admin/editStudent/${data.regno}`}>
                                <button>Edit</button>
                            </Link>
                            
                            <button onClick={() => handleDelete(data.regno)}>Delete</button>
                        </div>
                    </section>
                ))
            )}
        </div>
        <Footer /> 
    </div>
  )
}

export default ViewUsers