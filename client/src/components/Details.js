import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import dateformat from "dateformat";
import htmlToText from "html2plaintext";
import { postDetails } from "../store/asyncMethods/PostMethods";

import Loader from "./Loader";
const Details = () => {
  const { id } = useParams();
  const { loading, details } = useSelector((state) => state.PostReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(postDetails(id));
  }, [dispatch, id]);

  return (
    <div className='container'>
      <div className='row mt-100'>
        <div className='col-8'>
          {!loading && details?._id ? (
            <div className='post__details'>
              <div className='post__header'>
                <div className='post__header__avator'>
                  {details.userName[0]}
                </div>
                <div className='post__header__user'>
                  <span>{details.userName}</span>
                  <span>{dateformat(details.updatedAt)}</span>
                </div>
              </div>
              <div className='post__body'>
                <h1 className='post__body__title'>{details.title}</h1>
                <div className='post__body__details'>
                  {htmlToText(details.body)}
                </div>
              </div>
            </div>
          ) : (
            <Loader />
          )}
        </div>
      </div>
    </div>
  );
};

export default Details;
