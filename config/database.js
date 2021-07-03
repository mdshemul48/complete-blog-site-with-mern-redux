import mongoose from "mongoose"


const connect = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        console.log("DB connected.")
    } catch (err) {
        console.log(err)
    }
}

export default connect