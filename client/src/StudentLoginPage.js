import React from 'react'
import { Redirect, useHistory } from 'react-router-dom';

const StudentLoginPage = () => {
  
  const history = useHistory();
  const isAuthenticated = localStorage.getItem('authenticated');
  console.log(isAuthenticated)
  if (isAuthenticated === false) {
      console.log('here');
      return <Redirect to='/login' />
  }
  return (
      <div>Logged In as Student</div>
  )
}

export default StudentLoginPage
