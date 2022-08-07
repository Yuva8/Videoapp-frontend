import React from 'react';
import { Navigate  } from 'react-router-dom';

const signOut = (props) => {
  if (localStorage.getItem('userTokenTime')) {
    localStorage.removeItem('userTokenTime');
  }
  return <Navigate  to="/signIn" />;
}

export default signOut;