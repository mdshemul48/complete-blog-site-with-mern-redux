import dotenv from "dotenv"
import express from "express"



dotenv.config()

const app = express()


app.get("/", (req, res) => {
    return res.send("hello world")
})

app.listen(5000, () => {
    console.log("api rocks on http://localhost:5000")
})