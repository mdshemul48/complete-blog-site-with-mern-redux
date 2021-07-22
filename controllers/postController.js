import formidable from "formidable"
import { v4 as uuid } from 'uuid'
import fs from 'fs'
import { dirname } from 'path';
import { fileURLToPath } from 'url';

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
        if (slug === "") {
            errors.push({ msg: "slug is required" })
        }
        if (Object.keys(files).length === 0) {
            errors.push({ msg: "You must upload a picture" })

        } else {
            const { type } = files.image
            const extension = type.split("/")[1].toLowerCase()
            if (extension !== "jpg" && extension !== "png" && extension !== "jpeg" && extension !== "gif") {
                errors.push({ msg: `${extension} is not valid extension.` })
            } else {
                if (errors.length === 0) {
                    files.image.name = uuid() + "." + extension
                    const __dirname = dirname(fileURLToPath(import.meta.url));
                    const newPath = __dirname + `/../client/public/images/poster/${files.image.name}`
                    fs.copyFile(files.image.path, newPath, (err) => {
                        if (!err) {
                            console.log("IMAGE uploaded!")
                        }
                    })
                }
            }
        }
        if (errors.length !== 0) {
            return res.status(400).json({ errors, files })
        }
    })
}