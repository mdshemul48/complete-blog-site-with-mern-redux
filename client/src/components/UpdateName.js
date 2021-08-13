import Helmet from "react-helmet";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateNameAction } from "../store/asyncMethods/profileMethods";
import { Toaster, toast } from "react-hot-toast";
import Sidebar from "./sidebar";

const UpdateName = () => {
  const [userName, setUserName] = useState("");
  const {
    user: { name, _id },
  } = useSelector((state) => state.AuthReducer);
  const dispatch = useDispatch();
  const { loading, redirect } = useSelector((state) => state.PostReducer);
  const { updateErrors } = useSelector((state) => state.updateName);
  const updateNameHandler = (event) => {
    event.preventDefault();
    dispatch(updateNameAction({ name: userName, id: _id }));
  };
  useEffect(() => {
    setUserName(name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (updateErrors.length !== 0) {
      updateErrors.forEach((error) => toast.error(error.msg));
    }
  }, [updateErrors]);

  return (
    <>
      <Helmet>
        <title>Update Name</title>
        <meta name='description' content='update the username' />
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
        <div className='row  ml-minus-15 mr-minus-15'>
          <div className='col-3 p-15'>
            <Sidebar />
          </div>
          <div className='col-9 p-15'>
            <div className='card'>
              <h3 className='card__h3'>Update Name</h3>
              <form onSubmit={updateNameHandler}>
                <div className='group'>
                  <input
                    type='text'
                    name=''
                    id=''
                    value={userName}
                    onChange={(event) => setUserName(event.target.value)}
                    className='group__control'
                    placeholder='Name...'
                  />
                </div>
                <div className='group'>
                  <input
                    type='submit'
                    value='Create post'
                    className='btn btn-default btn-block'
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

export default UpdateName;
