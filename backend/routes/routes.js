import { Router } from "express";
import  Book  from "../models/bookModel.js"
const router = Router()

router.get("/books", async(req, res) => {
   try{
    const allBooks = await Book.find({})
    if(allBooks){
        return res.status(200).json({
            success: true, 
            message: 'All Books Retrieved Successfully',
            data: allBooks
        })
    }
    else{
        return res.status(404).json({
            success: false,            
            msg: "No book found"
        })
    }
   }
   catch(error){
    console.log(error)
   }
})

//Get only one book.
router.get("/books/:id", async(req, res) => {
    try{
     const id = req.params.id
     const book = await Book.findById(id)
     if(book){
         return res.status(200).json(
            {
                success: true, 
                message: 'Book Retrieved Successfully', 
                data: book
            }
         )
     }
     else{
         return res.status(404).json({
            success: false,
             msg: "Book not found"
         })
     }
    }
    catch(error){
     console.log(error)
    }
 })

 //Create a book
router.post("/books", async (req, res) => {
try{
if(!req.body.title || !req.body.author || !req.body.publishYear){
    return res.status(400).send({
        message: "Send all required fields: title, author, publishYear"
    })
}
const newBook = {
    title: req.body.title, 
    author: req.body.author, 
    publishYear: req.body.publishYear
} 

const book = await Book.create(newBook)

return res.status(201).json({
    success: true, 
    message: "Book Created Successfully", 
    data: book
})

}
catch(error){
console.log(error)
}
}) 

//Update a book
router.put("/books/:id", async (req, res) => {
    try{
    const id = req.params.id    
    const checkBookAvailability = await Book.findById(id)
    if(!checkBookAvailability){
        return res.status(500).json({
            msg: "Book not found."
        })
    }
    const updatedBook = await Book.findByIdAndUpdate(id, req.body)   
    return res.status(200).json({
        success: true, 
        message: "Book Updated Successfully", 
        data: updatedBook
    })
    }
    catch(error){
    console.log(error)
    res.status(500).json({
        mgs: "Internal server error."
    })
    }
    })  

    //Delete a book 
    router.delete("/books/:id", async(req, res) => {
        try{
            const id = req.params.id
            const book = await Book.findByIdAndDelete(id)    
            if(!book){
                return res.status(404).json({
                    success: false,
                    message: "Book Not Found."
                })
            }
              return res.status(200).json({
                success: true, 
                message: 'Book Deleted Successfully'
              })            
        }
        catch(error){
            console.log(error) 
            res.status(500).json({
                success: false,
                message: "Internal Server error."
            })
        }
    })

export default router