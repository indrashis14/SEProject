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
    history.push('/vendor/login');
  }

  return (
    <div>
      <button className="my-button" onClick={handleStudentClick}> Student </button>
      <button className="my-button" onClick={handleAdminClick}> Admin </button>
      <button className="my-button" onClick={handleVendorClick}> Vendor </button>
    </div>
  );
}

export default LoginPage;
