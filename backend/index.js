import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import cors from "cors"
import Route from "./routes/routes.js"
dotenv.config()

const PORT = process.env.PORT
const mongourl = process.env.MONGOURL
const app = express() 
// app.use(cors({
//     origin: 'http://localhost:3000', 
//     methods: ['GET', 'POST', 'PUT', 'DELETE'], 
//     allowedHeaders: ['Content-Type']
// }))
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

mongoose.connect(mongourl).then(() => {
app.use("/", Route) 
app.listen(PORT, () =>  {
    console.log(`Server is listening on port ${PORT}`)
})
 
}).catch((error) => {
    console.log(error)
})

app.get("/", (req, res) => {  
    return res.status(200).send("Hello There!")

})

 