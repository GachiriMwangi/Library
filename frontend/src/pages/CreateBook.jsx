import React, {useState} from 'react'
import Spinner from '../components/Spinner' 
import Button from '../components/Button'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CreateBook = () => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("") 
  const [publishYear, setPublishYear] = useState('')
  const [loading, setLoading] = useState(false) 
  const  navigate = useNavigate() 
  const handleSaveBook = () => {
    const data = {
      title, 
      author, 
      publishYear
    }
    setLoading(true)
    axios.post('http://localhost:5000/books', data)
    .then(() => {
      setLoading(false) 
      navigate("/")
    })
    .catch((error) => {
      console.log(error)
      setLoading(false)
    })
  }
  return (
    <div>
      <h5>Create Book</h5>
    </div>
  )
}

export default CreateBook
