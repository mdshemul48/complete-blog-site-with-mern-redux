import dotenv from "dotenv"
import express from "express"

// castom module and config
import connectDB from "./config/database.js"


dotenv.config()
const app = express()

// connecting mongodb database 
connectDB()

app.get("/", (req, res) => {
    return res.send("hello world")
})


const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log("api rocks on http://localhost:5000")
})