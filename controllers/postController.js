import { v4 as uuid } from "uuid";
import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { body, validationResult } from "express-validator";
import { htmlToText } from "html-to-text";

import PostModel from "../models/PostModel.js";
import formidable from "formidable";

export const createPost = (req, res) => {
  const form = formidable({ multiples: true });
  form.parse(req, async (error, fields, files) => {
    try {
      const { title, body, description, slug, id, name } = fields;

      const errors = [];
      if (title === "") {
        errors.push({ msg: "title is required" });
      }
      if (body === "") {
        errors.push({ msg: "body is required" });
      }
      if (description === "") {
        errors.push({ msg: "description is required" });
      }
      if (slug === "") {
        errors.push({ msg: "slug is required" });
      }
      if (Object.keys(files).length === 0) {
        errors.push({ msg: "You must upload a picture" });
      } else {
        const { type } = files.image;
        const extension = type.split("/")[1].toLowerCase();
        if (
          extension !== "jpg" &&
          extension !== "png" &&
          extension !== "jpeg" &&
          extension !== "gif"
        ) {
          errors.push({ msg: `${extension} is not valid extension.` });
        } else {
          if (errors.length === 0) {
            files.image.name = uuid() + "." + extension;
          }
        }
      }

      const checkSlug = await PostModel.findOne({ slug });
      if (checkSlug) {
        errors.push({ msg: "please choose a unique slug/URL" });
      }
      if (errors.length !== 0) {
        return res.status(400).json({ errors, files });
      } else {
        const __dirname = dirname(fileURLToPath(import.meta.url));
        const newPath =
          __dirname + `/../client/public/images/poster/${files.image.name}`;
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
                userId: id,
              });
              return res.status(200).json({
                msg: "your post have been created successfully.",
                response,
              });
            } catch (error) {
              return res
                .status(500)
                .json({ errors: error, msg: error.message });
            }
          }
        });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ errors: err, msg: err.message });
    }
  });
};

export const fetchPosts = async (req, res) => {
  // getting page for fetching page data
  const { id, page } = req.params;
  // this will decide total post par page.
  const parPage = 5;
  // this will decrease post for skip
  const skip = (page - 1) * parPage;

  try {
    // counting user all post
    const count = await PostModel.find({ userId: id }).countDocuments();
    // getting 5post for 1page and sorting with latest updated.
    const response = await PostModel.find({ userId: id })
      .skip(skip)
      .limit(parPage)
      .sort({ updatedAt: -1 });
    // sending post and count, par page for pagination section
    return res.status(200).json({ response, count, parPage });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errors: err, msg: err.message });
  }
};

export const fetchPost = async (req, res) => {
  const id = req.params.id;
  try {
    const post = await PostModel.findOne({ _id: id });
    if (post) {
      return res.status(200).json({ post });
    }
  } catch (error) {
    return res.status(500).json({ errors: error, msg: error.message });
  }
};

export const updateValidations = [
  body("title").notEmpty().trim().withMessage("Title is required"),
  body("body")
    .notEmpty()
    .trim()
    .custom((value) => {
      let PostBody = value.replace(/\n/, "");
      if (htmlToText(PostBody).trim().length === 0) {
        return false;
      } else {
        return true;
      }
    })
    .withMessage("Body is required"),
  body("description").notEmpty().trim().withMessage("Description is required"),
];

export const updatePost = async (req, res) => {
  const { title, description, body, id } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    await PostModel.findByIdAndUpdate(id, {
      title,
      description,
      body,
    });
    return res.status(200).json({ msg: "your post has been updated" });
  } catch (error) {
    return res.status(500).json({ errors: error, msg: error.message });
  }
};

export const updateImage = (req, res) => {
  const form = formidable({ multiples: true });

  form.parse(req, (errors, fields, files) => {
    const imageErrors = [];
    if (Object.keys(files).length === 0) {
      imageErrors.push({ msg: "Please choose image" });
    } else {
      const { type } = files.image;
      const split = type.split("/");
      const extension = split[1].toLowerCase();
      if (extension !== "jpg" && extension !== "jpeg" && extension !== "png") {
        imageErrors.push({ msg: `${extension} invalid file extension.` });
      } else {
        files.image.name = uuid() + "." + extension;
      }
    }
    if (imageErrors.length !== 0) {
      return res.status(400).json({ errors: imageErrors });
    } else {
      const __dirname = dirname(fileURLToPath(import.meta.url));
      const newPath =
        __dirname + `/../client/public/images/poster/${files.image.name}`;
      fs.copy(files.image.path, newPath, async (error) => {
        if (!error) {
        }
      });
    }
  });
};
