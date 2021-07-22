import dotenv from "dotenv"
import express from "express"
import bodyParser from "body-parser"

// all the routers 
import userRouter from "./routes/userRoutes.js"
import postRoutes from "./routes/postRoutes.js"

// castom module and config
import connectDB from "./config/database.js"

dotenv.config()

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// connecting mongodb database 
connectDB()

app.use("/", userRouter)
app.use("/", postRoutes)


const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log("api rocks on http://localhost:5000")
})