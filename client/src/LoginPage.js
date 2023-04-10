import React from 'react';
import { useHistory } from 'react-router-dom';

function LoginPage() {
  const history = useHistory();

  function handleStudentClick() {
    history.push('/student/login');
  }

  function handleAdminClick() {
    history.push('/admin');
  }

  function handleVendorClick() {
    history.push('/vendor/login');
  }

  return (
    <div className="login-page">
      <h1>SmartCampus Pro Max</h1>
      <p>Please select your account type to sign in:</p>
      <div className="login-buttons">
        <button className="my-button" onClick={handleStudentClick}> Student </button>
        <button className="my-button" onClick={handleAdminClick}> Admin </button>
        <button className="my-button" onClick={handleVendorClick}> Vendor </button>
      </div>
    </div>
  );
}

export default LoginPage;
