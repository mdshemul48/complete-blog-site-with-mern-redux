import React from "react";
import Sidebar from "./sidebar";
const UpdateName = () => {
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-3'>
          <Sidebar />
        </div>
        <div className='col-9'>
          <h3 className='card__h3'>Update Name</h3>
          <form>
            <div className='group'>
              <input
                type='text'
                name=''
                id=''
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
  );
};

export default UpdateName;
