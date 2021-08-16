import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { homePosts } from "../store/asyncMethods/PostMethods";
import Loader from "./Loader";
const Home = () => {
  let { page } = useParams();

  if (page === undefined) {
    page = 1;
  }
  const { loading } = useSelector((state) => state.PostReducer);
  const { posts, count, parPage } = useSelector((state) => state.FetchPosts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(homePosts(page));
  }, [dispatch, page]);
  return (
    <>
      <Helmet>
        <title>Web articles</title>
        <meta name='description' content='Learn html, css, and javascript' />
      </Helmet>
      <div className='container'>
        <div className='col-8'>
          {!loading ? (
            posts.length > 0 ? (
              posts.map((post) => {
                return (
                  <div className='row'>
                    <div className='col-8'></div>
                    <div className='col-4'>image section</div>
                  </div>
                );
              })
            ) : (
              "No posts"
            )
          ) : (
            <Loader />
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
