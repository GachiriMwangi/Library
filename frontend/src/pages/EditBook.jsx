import React, {useState, useEffect} from 'react'
import Spinner from '../components/Spinner' 
import Button from '../components/Button'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { useSnackbar } from "notistack"

const EditBook = () => {

  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("") 
  const [publishYear, setPublishYear] = useState('')
  const [loading, setLoading] = useState(false) 
  const  navigate = useNavigate() 
  const { enqueueSnackbar } = useSnackbar()
  const { id } = useParams()
  // Get the Book 
  useEffect(() => {
    axios.get(`http://localhost:4000/books/${id}`)
    .then((response) => {
      setTitle(response.data.title)
      setAuthor(response.data.author)
      setPublishYear(response.data.publishYear)
      setLoading(false)
    }) 
    .catch((error) => {
      console.log(error) 
      alert("An unexpected error occurred!")
      setLoading(false)
    })
  }, [])
  const handleEditBook = async() => {
    const data = {
      title, 
      author, 
      publishYear
    }
    setLoading(true)
    await axios.put(`http://localhost:4000/books/${id}`, data)
    .then(() => {
      setLoading(false) 
      enqueueSnackbar("Book edited successfully", {
        variant: 'success'
      })
      navigate("/")
    })
    .catch((error) => {
      setLoading(false)
      enqueueSnackbar("An error occurred when updating the book", {
        variant: 'error'
      })
      console.log(error)
    
    })
  }
  return (
    <div className="p-4">
      <Button />
      <h1 className="text-3xl my-4"> Edit Book</h1>
      {
        loading ? ( 
          <Spinner />
        ) : ( 
           <div className="flex flex-col border-2 border-sky-400  rounded-xl w-[600px] p-4 mx-auto"> 
      <div className="my-4">
        <label className="text-xl mr-4 text-gray-500">Title</label>
        <input 
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)} 
        className="border-2 border-gray-500 px-4 py-2 w-full" />
        </div>
      <div className="my-4">
        <label className="text-xl mr-4 text-gray-500">Author</label>
        <input 
        type="text"
        value={author}
        onChange={(e) => setAuthor(e.target.value)} 
        className="border-2 border-gray-500 rounded-15 px-4 py-2 w-full" />
        </div>
      <div className="my-4">
        <label className="text-xl mr-4 text-gray-500">Publish Year</label>
        <input 
        type="text"
        value={publishYear}
        onChange={(e) => setPublishYear(e.target.value)} 
        className="border-2 border-gray-500 px-4 py-2 w-full" />
        </div>
        <button onClick={handleEditBook} className="p-2 bg-sky-300 m-8 rounded-xl">
Save
        </button>
           </div>
 
        )
      }
    

    </div>
  )
}

export default EditBook
