import React from "react";
import Helmet from "react-helmet";
import Sidebar from "./sidebar";

const ChangePassword = () => {
  return (
    <>
      <Helmet>
        <title>Update Name</title>
        <meta name='description' content='update the username' />
      </Helmet>
      <div className='container mt-100'>
        <div className='row'>
          <div className='col-3'>
            <Sidebar />
          </div>
          <div className='col-9'></div>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
