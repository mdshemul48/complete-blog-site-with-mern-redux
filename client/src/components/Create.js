import React, { useState } from "react";
import ReactQuill from 'react-quill';
import Helmet from "react-helmet";

import 'react-quill/dist/quill.snow.css';
const Create = () => {
  const [currentImage, setCurrentImage] = useState("Choose image")
  const [blogPost, setBlogPost] = useState("")
  console.log(blogPost)
  const fileHandler = (event) => {
    setCurrentImage(event.target.files[0].name)
  }

  return <div className="create mt-100">
    <Helmet>
      <title>Create new post</title>
      <meta name="description" content="create a new post" />
    </Helmet>
    <div className="container">
      <div className="row">
        <div className="col-6">
          <div className="card">
            <h3 className="card__h3">Create a new post</h3>
            <form>
              <div className="group">
                <label htmlFor="title">
                  Post Title
                </label>
                <input type="text" name="title" id="title" className="group__control" placeholder="Post Title..." />
              </div>
              <div className="group">
                <label htmlFor="image" className="image__label">{currentImage}</label>
                <input type="file" name="picture" id="image" onChange={fileHandler} />
              </div>
              <div className="group">
                <label htmlFor="body">
                  <ReactQuill theme="snow" value={blogPost} onChange={setBlogPost} />
                </label>
              </div>
              <div className="group">
                <input type="submit" value="Create post" className="btn btn-default btn-block" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>;
};

export default Create;
