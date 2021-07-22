import formidable from "formidable"
import { v4 as uuid } from 'uuid'
import fs from 'fs'
import { dirname } from 'path';
import { fileURLToPath } from 'url';

import PostModel from "../models/PostModel.js"

export const createPost = (req, res) => {
    const form = formidable({ multiples: true })
    form.parse(req, async (error, fields, files) => {
        try {
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
                    }
                }
            }

            const checkSlug = await PostModel.findOne({ slug })
            if (checkSlug) {
                errors.push({ msg: "please choose a unique slug/URL" })
            }
            if (errors.length !== 0) {
                return res.status(400).json({ errors, files })
            } else {
                const __dirname = dirname(fileURLToPath(import.meta.url));
                const newPath = __dirname + `/../client/public/images/poster/${files.image.name}`
                return fs.copyFile(files.image.path, newPath, async (err) => {
                    if (!err) {
                        try {

                            const response = await PostModel.create({
                                title,
                                body,
                                image: files.image.name,
                                description,
                                slug,
                                userName: name,
                                userId: id
                            })
                            return res.status(200).json({ msg: "your post have been created successfully.", response })

                        } catch (error) {
                            return res.status(500).json({ errors: error, msg: error.message })
                        }
                    }
                })





            }
            return res.status(201).json({ message: "post Created" })
        } catch (err) {
            console.log(err)
            return res.status(500).json({ errors: err, msg: err.message })
        }
    })
}