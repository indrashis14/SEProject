import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const StudentSignupForm = () => {
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch('/api/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userName,
        email,
        password,
        mobile
      })
    })
    .then(response => response.json())
    .then(data => console.log(data),
          history.push('/student/login'))
    .catch(error => console.error(error));

    setUsername('');
    setPassword('');
    setEmail('');
    setMobile('');
  };

  return (
    <div className='login-container'>
      <h1 className="login-header">Create User</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" value={userName} onChange={event => setUsername(event.target.value)} />
        </label>
        <br />
        <label>
          Email:
          <input type="email" value={email} onChange={event => setEmail(event.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={event => setPassword(event.target.value)} />
        </label>
        <br />
        <label>
          Phone:
          <input type="tel" value={mobile} onChange={event => setMobile(event.target.value)} />
        </label>
        <br />
        <button type="submit" onClick={handleSubmit}>Submit</button>
      </form>
      <br/>
            <a href='/student/login'>Log In</a>
    </div>
  );
};

export default StudentSignupForm;
