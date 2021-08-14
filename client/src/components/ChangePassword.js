import { useState, useEffect } from "react";
import Helmet from "react-helmet";
import { Toaster, toast } from "react-hot-toast";
import Sidebar from "./sidebar";
import { useDispatch, useSelector } from "react-redux";
import { updatePasswordMethods } from "../store/asyncMethods/profileMethods";

import Loader from "./Loader";
const ChangePassword = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.PostReducer);
  const { updateErrors } = useSelector((state) => state.updateName);
  const [passwordState, setPasswordState] = useState({
    currentPassword: "",
    newPassword: "",
  });
  const updatePasswordHandler = (event) => {
    event.preventDefault();
    console.log(passwordState);
    dispatch(updatePasswordMethods(passwordState));
  };

  const passwordChangeHandler = (event) => {
    setPasswordState((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  useEffect(() => {
    if (updateErrors.length !== 0) {
      updateErrors.forEach((error) => toast.error(error.msg));
    }
  }, [updateErrors]);
  return !loading ? (
    <>
      <Helmet>
        <title>Update Password</title>
        <meta name='description' content='update the password' />
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
          <div className='col-3  p-15'>
            <Sidebar />
          </div>
          <div className='col-9  p-15'>
            <div className='card'>
              <h3 className='card__h3'>Change Password</h3>
              <form onSubmit={updatePasswordHandler}>
                <div className='group'>
                  <input
                    type='password'
                    name='currentPassword'
                    className='group__control'
                    placeholder='Current password'
                    onChange={passwordChangeHandler}
                  />
                </div>
                <div className='group'>
                  <input
                    type='password'
                    name='newPassword'
                    className='group__control'
                    placeholder='New password'
                    onChange={passwordChangeHandler}
                  />
                </div>
                <div className='group'>
                  <input
                    type='submit'
                    className='btn btn-default btn-block'
                    value='Update Password'
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <Loader />
  );
};

export default ChangePassword;
