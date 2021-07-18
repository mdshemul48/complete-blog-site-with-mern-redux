import formidable from "formidable"

export const createPost = (req, res) => {
    const form = formidable({ multiples: true })
    form.parse(req, (error, fields, files) => {
        const { title, body, description, slug, id, name } = fields
        const errors = []
        if (title === "") {
            errors.push({ msg: "title is required" })
        }
        if (body === "") {
            errors.push({ msg: "body is required" })
        }
        if (description === "") {
            errors.push({ msg: "description is required" })
        }
        if (description === "") {
            errors.push({ msg: "description is required" })
        }
        if (slug === "") {
            errors.push({ msg: "slug is required" })
        }


        if (errors.length !== 0) {
            return res.status(400).json({ errors })
        }
    })
}