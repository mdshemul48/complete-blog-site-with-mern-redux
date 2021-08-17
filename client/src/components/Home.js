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
      <div className='container mt-100'>
        <div className='col-9 home'>
          {!loading ? (
            posts.length > 0 ? (
              posts.map((post) => {
                return (
                  <div className='row post-style'>
                    <div className='col-8'>
                      <div className='post'>
                        <div className='post__header'>
                          <div className='post__header__avatar'>
                            {post.userName[0]}
                          </div>
                          <div className='post__header__user'>
                            <span>{post.userName}</span>
                            <span>post time</span>
                          </div>
                        </div>
                      </div>
                    </div>
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
