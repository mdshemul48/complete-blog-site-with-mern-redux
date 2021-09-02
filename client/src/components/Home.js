import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import dateformat from "dateformat";
import htmlToText from "html2plaintext";
import { homePosts } from "../store/asyncMethods/PostMethods";
import Pagination from "./Pagination";

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
      <div className='container mt-100' style={{ marginBottom: "100px" }}>
        <div className='col-9 home'>
          {!loading ? (
            posts.length > 0 ? (
              posts.map((post) => {
                return (
                  <div className='row post-style' key={post._id}>
                    <div className='col-8'>
                      <div className='post'>
                        <div className='post__header'>
                          <div className='post__header__avator'>
                            {post.userName[0]}
                          </div>
                          <div className='post__header__user'>
                            <span>{post.userName}</span>
                            <span>{dateformat(post.updatedAt)}</span>
                          </div>
                        </div>
                        <div className='post__body'>
                          <h1 className='post__body__title'>
                            <Link to={`/details/${post._id}`}>
                              {post.title}
                            </Link>
                          </h1>
                          <div className='post__body__details'>
                            {htmlToText(post.body.slice(0, 300))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='col-4'>
                      <div className='post__image'>
                        <img src={`/images/poster/${post.image}`} alt='post' />
                      </div>
                    </div>
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
        <div className='row'>
          <div className='col-9'>
            <Pagination
              path='home'
              page={page}
              parPage={parPage}
              count={count}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
