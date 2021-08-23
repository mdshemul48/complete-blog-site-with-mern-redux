import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useSelector, useDispatch } from "react-redux";
import {
  REDIRECT_FALSE,
  REMOVE_MESSAGE,
  SET_LOADER,
  SET_MESSAGE,
} from "../store/types/PostTypes";
import { Toaster, toast } from "react-hot-toast";
import { fetchPosts } from "../store/asyncMethods/PostMethods";
import { Link, useParams } from "react-router-dom";
import { BsPencil, BsArchive, BsImage } from "react-icons/bs";
import axios from "axios";
import dateFormate from "dateformat";
import Pagination from "./Pagination";
import Loader from "./Loader";
import Sidebar from "./sidebar";
const Dashboard = () => {
  const { redirect, message, loading } = useSelector(
    (state) => state.PostReducer
  );
  const {
    user: { _id: id },
    token,
  } = useSelector((state) => state.AuthReducer);
  const { posts, count, parPage } = useSelector((state) => state.FetchPosts);
  let { page } = useParams();
  if (page === undefined) {
    page = 1;
  }
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPosts(id, page));
    if (redirect) {
      dispatch({ type: REDIRECT_FALSE });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: REMOVE_MESSAGE });
    }
  }, [dispatch, redirect, message, id, page]);
  useEffect(() => {
    dispatch(fetchPosts(id, page));
    if (redirect) {
      dispatch({ type: REDIRECT_FALSE });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: REMOVE_MESSAGE });
    }
  }, [page, dispatch, id, message, redirect]);
  const deletePost = async (id) => {
    const confirm = window.confirm("Are you really want to delete this post?");
    if (confirm) {
      dispatch({ type: SET_LOADER });
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const {
          data: { msg },
        } = await axios.delete(`/delete/${id}`, config);
        dispatch(fetchPosts(id, page));
        dispatch({ type: SET_MESSAGE, payload: msg });
      } catch (error) {
        dispatch({ type: SET_LOADER });
        console.log(error.response);
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Dashboard</title>
        <meta name='description' content='Dashboard' />
      </Helmet>
      <Toaster
        position='top-right'
        reverseOrder={false}
        toastOptions={{
          className: "",
          style: {
            fontSize: "15px",
          },
        }}
      />
      <div className='container mt-100'>
        <div className='row ml-minus-15 mr-minus-15'>
          <div className='col-3 p-15'>
            <Sidebar />
          </div>
          <div className='col-9 p-15'>
            {!loading ? (
              posts.length > 0 ? (
                posts.map((post) => {
                  return (
                    <div className='dashboard__posts' key={post._id}>
                      <div className='dashboard__posts__title'>
                        <Link to='/'>{post.title}</Link>
                        <span>Published {dateFormate(post.updatedAt)}</span>
                      </div>
                      <div className='dashboard__posts__links'>
                        <Link to={`/updateImage/${post._id}`}>
                          <BsImage className='icon' />
                        </Link>
                        <Link to={`/edit/${post._id}`}>
                          <BsPencil className='icon' />
                        </Link>
                        <BsArchive
                          onClick={() => deletePost(post._id)}
                          className='icon'
                        />
                      </div>
                    </div>
                  );
                })
              ) : (
                "you dont have any post"
              )
            ) : (
              <Loader />
            )}
            <Pagination
              path='dashboard'
              count={count}
              parPage={parPage}
              page={page}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
