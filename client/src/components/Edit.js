import { useState, useEffect } from "react";
import Helmet from "react-helmet";
import { useParams, useHistory } from "react-router";
import ReactQuill from "react-quill";
import { Toaster, toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { fetchPost, updateAction } from "../store/asyncMethods/PostMethods";
import { POST_RESET } from "../store/types/PostTypes";
import Loader from "./Loader";
import "react-quill/dist/quill.snow.css";
const Edit = (props) => {
  const { id } = useParams();
  const { push } = useHistory();
  const [postDetail, setPostDetail] = useState({ title: "", description: "" });
  const [postBody, setPostBody] = useState("");
  const dispatch = useDispatch();
  const { loading, redirect } = useSelector((state) => state.PostReducer);
  const { post, postStatus } = useSelector((state) => state.FetchPost);
  const { editErrors } = useSelector((state) => state.updatePost);

  useEffect(() => {
    if (postStatus) {
      setPostDetail({
        title: post.title,
        description: post.description,
      });
      setPostBody(post.body);
      dispatch({ type: POST_RESET });
    }
  }, [dispatch, id, post.title, post.description, postStatus, post.body, post]);

  useEffect(() => {
    dispatch(fetchPost(id));
  }, [dispatch, id]);

  const updatedPost = (event) => {
    event.preventDefault();

    dispatch(
      updateAction({
        title: postDetail.title,
        body: postBody,
        description: postDetail.description,
        id: post._id,
      })
    );
  };

  useEffect(() => {
    if (editErrors.length !== 0) {
      editErrors.map((err) => toast.error(err.msg));
    }
  }, [editErrors, dispatch]);

  useEffect(() => {
    if (redirect) {
      push("/dashboard");
    }
  }, [redirect, push]);

  return !loading ? (
    <>
      <Helmet>
        <title>Edit post</title>
        <meta name="description" content="update post" />
      </Helmet>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          className: "",
          style: {
            fontSize: "15px",
          },
        }}
      />
      <div className="mt-100">
        <div className="container">
          <div className="row">
            <div className="col-6">
              <div className="card">
                <h3 className="card__h3">Create a new post</h3>
                <form action="title" onSubmit={updatedPost}>
                  <label htmlFor="title"></label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    className="group__control"
                    value={postDetail.title}
                    onChange={(event) =>
                      setPostDetail({
                        ...postDetail,
                        title: event.target.value,
                      })
                    }
                    placeholder="Post title"
                  />

                  <ReactQuill
                    id="body"
                    theme="snow"
                    value={postBody}
                    onChange={setPostBody}
                  />

                  <div className="group">
                    <label htmlFor="description">Meta Description</label>

                    <textarea
                      id="description"
                      name="description"
                      cols="30"
                      rows="10"
                      defaultValue={postDetail.description}
                      onChange={(event) =>
                        setPostDetail({
                          ...postDetail,
                          description: event.target.value,
                        })
                      }
                      onKeyUp={(event) =>
                        setPostDetail({
                          ...postDetail,
                          description: event.target.value,
                        })
                      }
                      className="group__control"
                      placeholder="meta description..."
                      maxLength="150"
                    ></textarea>
                    <p className="length">
                      {postDetail.description
                        ? postDetail.description.length
                        : 0}
                    </p>
                  </div>
                  <div className="group">
                    <input
                      type="submit"
                      value="Edit"
                      className="btn btn-default btn-block"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <Loader />
  );
};

export default Edit;
