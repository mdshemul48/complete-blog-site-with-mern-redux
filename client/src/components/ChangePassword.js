import { useState } from "react";
import Helmet from "react-helmet";
import Sidebar from "./sidebar";
import { useDispatch, useSelector } from "react-redux";
import { updatePasswordMethods } from "../store/asyncMethods/profileMethods";

const ChangePassword = () => {
  const dispatch = useDispatch();
  const [passwordState, setPasswordState] = useState({
    currentPassword: "",
    newPassword: "",
  });
  const updatePasswordHandler = (event) => {
    event.preventDefault();
    dispatch(updatePasswordMethods(passwordState));
  };
  return (
    <>
      <Helmet>
        <title>Update Password</title>
        <meta name='description' content='update the password' />
      </Helmet>
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
                    name=''
                    id=''
                    className='group__control'
                    placeholder='Current password'
                  />
                </div>
                <div className='group'>
                  <input
                    type='password'
                    name=''
                    id=''
                    className='group__control'
                    placeholder='New password'
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
  );
};

export default ChangePassword;
