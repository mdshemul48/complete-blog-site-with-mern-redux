import { useState } from "react";
import Helmet from "react-helmet";
import { useParams } from "react-router";
const EditImage = () => {
  const { id } = useParams();
  const [state, setState] = useState({
    image: "",
    imagePreview: "",
    imageName: "Choose Image",
  });

  const imageHandle = (event) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setState((prevState) => ({
        ...prevState,
        imagePreview: reader.result,
        image: event.target.files[0],
        imageName: event.target.files[0].name,
      }));
    };
    reader.readAsDataURL(event.target.files[0]);
  };

  return (
    <>
      <Helmet>
        <title>Update Image</title>
        <meta name="description" content="Image Update" />
      </Helmet>
      <div className="container mt-100">
        <div className="row">
          <div className="col-6">
            <div className="card">
              <h3 className="card__h3">Update Post Image</h3>
              <form>
                <div className="group">
                  <label htmlFor="image" className="image__label">
                    {state.imageName}
                  </label>
                  <input
                    type="file"
                    name="image"
                    id="image"
                    onChange={imageHandle}
                  />
                </div>
                <div className="group">
                  {state.imagePreview ? (
                    <img src={state.imagePreview} width={"100%"} alt="" />
                  ) : (
                    ""
                  )}
                </div>
                <div className="group">
                  <input
                    type="submit"
                    value="Update image"
                    className="btn btn-default btn-block"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditImage;
