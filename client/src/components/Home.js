import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { homePosts } from "../store/asyncMethods/PostMethods";
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
    </>
  );
};

export default Home;
