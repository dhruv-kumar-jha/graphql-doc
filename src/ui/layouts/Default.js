import React from 'react';
import Header from '../../components/Header';

const DefaultLayout = (props) => (
  <div>
    <Header />
    <div className="app-body">
      { props.children }
    </div>
  </div>
)

export default DefaultLayout;
