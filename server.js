import dotenv from "dotenv"
import express from "express"



dotenv.config()

const app = express()


app.get("/", (req, res) => {
    return res.send("hello world")
})


const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log("api rocks on http://localhost:5000")
})