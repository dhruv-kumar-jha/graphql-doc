import React from 'react';

const NotFound = (props) => {

  return (
    <div className="component--page-not-found">
      <div style={{ maxWidth: 360, margin: '0 auto' }}>
        <h1>This page does not exist or you don't have permissions to access it.</h1>
      </div>
    </div>
  )

}

export default NotFound;
