import React from 'react';
import { useHistory } from 'react-router-dom';

function LoginPage() {
  const history = useHistory();

  function handleStudentClick() {
    history.push('/student');
  }

  function handleAdminClick() {
    history.push('/admin');
  }

  function handleVendorClick() {
    history.push('/vendor');
  }

  return (
    <div>
      <button onClick={handleStudentClick}> Student </button>
      <button onClick={handleAdminClick}> Admin </button>
      <button onClick={handleVendorClick}> Vendor </button>
    </div>
  );
}

export default LoginPage;
