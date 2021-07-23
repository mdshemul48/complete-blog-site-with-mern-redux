import jwt from "jsonwebtoken"


export default (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        jwt.verify(token, process.env.SECRET)
        next()
    } catch (err) {
        return res.status(401).json({ errors: [{ msg: err.message }] })
    }
}