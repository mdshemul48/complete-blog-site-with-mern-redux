import React, { useState } from "react";
import ReactQuill from 'react-quill';
import Helmet from "react-helmet";

import 'react-quill/dist/quill.snow.css';
const Create = () => {
  const [currentImage, setCurrentImage] = useState("Choose image")
  const [imagePreview, setImagePreview] = useState("")
  const [blogPost, setBlogPost] = useState("")
  const [formState, setFormState] = useState({
    title: "",

  })

  const [slug, setSlug] = useState("")
  const [slugButton, setSlugButton] = useState(false)
  const fileHandler = (event) => {
    setCurrentImage(event.target.files[0].name)
    const imageReader = new FileReader()
    imageReader.onloadend = () => {
      setImagePreview(imageReader.result)
    }
    imageReader.readAsDataURL(event.target.files[0])
  }

  const inputHandler = (event) => {
    setFormState(prevState => {
      return { ...prevState, [event.target.name]: event.target.value }
    })

    const createSlug = event.target.value.trim().replaceAll(" ", "-")
    setSlug(createSlug)
  }
  const slugHandler = (event) => {
    setSlugButton(true)
    setSlug(event.target.value)
  }

  const slugURLHandler = (event) => {
    event.preventDefault()
    setSlug(prevState => prevState.trim().replaceAll(" ", "-"))
  }

  return <div className="create mt-100">
    <Helmet>
      <title>Create new post</title>
      <meta name="description" content="create a new post" />
    </Helmet>
    <div className="container">
      <form>
        <div className="row ml-minus-15 mr-minus-15">
          <div className="col-6 p-15">
            <div className="card">
              <h3 className="card__h3">Create a new post</h3>
              <form>
                <div className="group">
                  <label htmlFor="title">
                    Post Title
                  </label>
                  <input type="text" name="title" id="title" value={formState.title} onChange={inputHandler} className="group__control" placeholder="Post Title..." />
                </div>
                <div className="group">
                  <label htmlFor="image" className="image__label">{currentImage}</label>
                  <input type="file" name="picture" id="image" onChange={fileHandler} />
                </div>
                <div className="group">
                  <label htmlFor="body">
                    Post Body
                  </label>
                  <ReactQuill id="body" theme="snow" value={blogPost} onChange={setBlogPost} />
                </div>
                <div className="group">
                  <input type="submit" value="Create post" className="btn btn-default btn-block" />
                </div>
              </form>
            </div>
          </div>
          <div className="col-6 p-15">
            <div className="card">
              <div className="group">
                <label htmlFor="slug">Post URL</label>
                <input type="text" name="slug" id="slug" className="group__control" placeholder="post URL..." value={slug} onChange={slugHandler} />
              </div>
              <div className="group">
                {slugButton ? <button className="btn btn-default" onClick={slugURLHandler}>Update Slug</button> : ""}
              </div>
              <div className="group">
                <div className="">
                  {imagePreview ? <img className="imagePreview" src={imagePreview} alt="gg" /> : ""}
                </div>
              </div>






            </div>
          </div>
        </div>
      </form>
    </div>
  </div>;
};

export default Create;
