import React, {useState} from 'react'
import axios from 'axios' 
import { useNavigate, useParams } from 'react-router-dom'
import Button from '../components/Button'
import Spinner from '../components/Spinner'
import { useSnackbar } from 'notistack'

const DeleteBook = () => {
const [loading, setLoading] = useState(false)
const navigate = useNavigate()
const { enqueueSnackbar } = useSnackbar()
const {id} = useParams()
const handleDelete = () => {
  axios.delete(`http://localhost:4000/books/${id}`)
  .then(() => {
    enqueueSnackbar("Book deleted successfully", {
      variant: 'success'
    })
    navigate("/")
    setLoading(false)
  })
  .catch((error) => {
    console.log(error)
    enqueueSnackbar("An error occurred when deleting the book", {
      variant: "error"
    })
    setLoading(false)
  })
}
  return (
    <div className="p-4">
      <Button />
      <h1 className="text-3xl my-4">
        Delete Book
      </h1>
      {
        loading ? ( <Spinner />) : ''
      }
      <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto">
        <h3 className="text-2xl">Are You Sure You Want to Delete this book?</h3>
         <button 
      className="p-4 bg-red-600 text-white m-8 w-75"
      onClick={handleDelete}>
        Yes, Delete It
      </button>
      </div>
   
    </div>
  )
}

export default DeleteBook
