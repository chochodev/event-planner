import React from 'react';
import HomeLayout from 'components/layout';

const AccessDenied = () => {
  return (
    <HomeLayout>
      <div className='min-h-[60vh]'>
        <div>
          <h2>Login to access this page</h2>
          
        </div>
      </div>
    </HomeLayout>
  )
}

export default AccessDenied