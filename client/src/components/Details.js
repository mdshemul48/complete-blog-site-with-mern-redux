import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postDetails } from "../store/asyncMethods/PostMethods";

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
        <div className='col-8'></div>
      </div>
    </div>
  );
};

export default Details;
