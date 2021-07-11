import React from "react";
import Helmet from "react-helmet";
const Create = () => {
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
                <label htmlFor="image" className="image__label">Choose image</label>
                <input type="file" name="picture" id="image" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>;
};

export default Create;
