import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

const ViewUsers = () => {
    const [userData, setUserData] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    const prevPage = (event) => {
        event.preventDefault()
        navigate(-1)
    }

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

  return (
    <>
        <h1>Working on the Data from the backend</h1>
        <div>
            {loading ? (
                <p>Loading Data..</p>
            ) : (
                userData.map((data, index) =>  (
                    <section key={index}>
                        <p>Name: {data.name}</p>
                        <p>Registration Number: {data.regno}</p>
                        <p>Fees Status: {data.fees}</p>
                        <p>Subjects currently Enrolled:</p>
                        {data.subjects && data.subjects.map((subject, index) => (
                            <div key={index}>
                                <label>Unit:</label>
                                <input 
                                    name="unitName"
                                    value={subject.name}
                                    readOnly
                                /> <br />
                                <label>Score</label>
                                <input 
                                    name="unitScore"
                                    value={subject.score}
                                    readOnly
                                />
                            </div>
                        ))}
                        <Link to={`/admin/editStudent/${data.regno}`}>
                            <button>Edit</button>
                        </Link>
                    </section>
                ))
            )}
            <button onClick={prevPage}>Go Back</button>
        </div>    
    </>
  )
}

export default ViewUsers