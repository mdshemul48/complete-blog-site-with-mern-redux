import React, { useState } from "react";
import ReactQuill from 'react-quill';
import Helmet from "react-helmet";
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from 'react-redux'
import { cerateAction } from '../store/asyncMethods/PostMethods'



const Create = () => {
  const dispatch = useDispatch()
  const { user: { _id: id, name } } = useSelector(state => state.AuthReducer)

  const [currentImage, setCurrentImage] = useState("Choose image")
  const [imagePreview, setImagePreview] = useState("")
  const [blogPost, setBlogPost] = useState("")
  const [formState, setFormState] = useState({
    title: "",
    description: ""

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
    setFormState(prevState => ({ ...prevState, [event.target.name]: event.target.files[0] }))

  }
  const descriptionHandler = (event) => {
    setFormState(prevState => ({ ...prevState, description: event.target.value, }))
  }
  const titleHandler = (event) => {
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

  const postHandler = (event) => {
    event.preventDefault()
    const { title, description, image } = formState

    const formData = new FormData()
    formData.append("title", title)
    formData.append("description", description)
    formData.append("image", image)
    formData.append("slug", slug)
    formData.append("body", blogPost)
    formData.append("name", name)
    formData.append("id", id)

    dispatch(cerateAction(formData))
  }


  return <div className="create mt-100">
    <Helmet>
      <title>Create new post</title>
      <meta name="description" content="create a new post" />
    </Helmet>
    <div className="container">
      <form onSubmit={postHandler}>
        <div className="row ml-minus-15 mr-minus-15">
          <div className="col-6 p-15">
            <div className="card">
              <h3 className="card__h3">Create a new post</h3>
              <div className="group">
                <label htmlFor="title">
                  Post Title
                </label>
                <input type="text" name="title" id="title" value={formState.title} onChange={titleHandler} className="group__control" placeholder="Post Title..." />
              </div>
              <div className="group">
                <label htmlFor="image" className="image__label">{currentImage}</label>
                <input type="file" name="image" id="image" onChange={fileHandler} />
              </div>
              <div className="group">
                <label htmlFor="body">
                  Post Body
                </label>
                <ReactQuill id="body" theme="snow" value={blogPost} onChange={setBlogPost} />
              </div>
              <div className="group">
                <label htmlFor="description">Meta Description</label>
                <textarea id="description" name="" cols="30" rows="10" defaultValue={formState.description} onChange={descriptionHandler} className="group__control" placeholder="meta description..." maxLength="150"></textarea>
                <p className="length">{formState.description ? formState.description.length : 0}</p>
              </div>

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

              <div className="group">
                <input type="submit" value="Create post" className="btn btn-default btn-block" />
              </div>

            </div>
          </div>
        </div>
      </form>
    </div>
  </div>;
};

export default Create;
