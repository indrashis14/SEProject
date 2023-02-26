import React from 'react';
import { useHistory } from 'react-router-dom';

function LoginPage() {
  const history = useHistory();

  function handleUserClick() {
    // redirect to user login page
    history.push('/user-login');
  }

  function handleStudentClick() {
    // redirect to student login page
    history.push('/student-login');
  }

  function handleVendorClick() {
    // redirect to vendor login page
    history.push('/vendor-login');
  }

  return (
    <div>
      <button onClick={handleUserClick}> User </button>
      <button onClick={handleStudentClick}> Student </button>
      <button onClick={handleVendorClick}> Vendor </button>
    </div>
  );
}

export default LoginPage;
