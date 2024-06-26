import React, {useState} from 'react'
import { Link } from 'react-router-dom' 
import { PiBookOpenTextLight } from "react-icons/pi"
import { BiUserCircle, BiShow } from "react-icons/bi"
import { AiOutlineEdit } from "react-icons/ai"
import { BsInfoCircle } from "react-icons/bs"
import { MdOutlineDelete } from "react-icons/md"
import BookModel from './BookModel'
const BookSingleCard = ({item}) => {
    const [showModel, setShowModel] = useState(false)
  return (

                  <div
            className="border-2 border-gray-500 rounded-lg px-4 py-2 m-4 relative hover:shadow-xl">
<h2 className="absolute top-1 right-2 px-4 py-1 bg-red-200 rounded-lg">
    {item.publishYear}
</h2>
<h4 className="my-2 text-gray-500">
    {item._id}
</h4>
<div className="flex justify-start items-center gap-x-2">
    <PiBookOpenTextLight
    className="text-red-300 text-2xl"
     />
     <h2 className="my-1">
        {item.title}
     </h2>
     </div>
     <div>
     <div className="flex justify-start items-center gap-x-2">
        <BiUserCircle className="ext-red-300 text-2xl"/>
        <h2 className="my-1">
            {item.author}
        </h2>
        </div>
       
        <div className="flex justify-between items-center gap-x-2 my-4 p-4">
        <BiShow 
        className="text-3xl text-blue-800 hober:text-black cursor-pointer"
        onClick={() => setShowModel(true)}
        />
            <Link to={`/books/details/${item._id}`}>
                <BsInfoCircle className="text-2xl text-green-800 hover:text-black" />
            </Link>
            <Link to={`/books/edit/${item._id}`}>
                <AiOutlineEdit className="text-2xl text-yellow-600 hover:text-black" />
            </Link>
            <Link to={`/books/delete/${item._id}`}>
                <MdOutlineDelete className="text-2xl text-red-600 hover:text-black" />
            </Link>
        </div>
     
</div>
          
            {
                showModel && (
                    <BookModel item={item} 
                    onClose={() => setShowModel(false)} />
                )
            }
    </div>
  )
}

export default BookSingleCard
