import React, { useState } from 'react';

// const StudentSignupForm = () => {
//   const [userName, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [email, setEmail] = useState('');
//   const [mobile, setMobile] = useState('');
// }

  const StudentLoginForm = () => {
    const [userName, setUsername] = useState('');
    const [password, setPassword] = useState('');
    // const [email, setEmail] = useState('');
    // const [mobile, setMobile] = useState('');
  
    const handleSubmit = (event) => {
      event.preventDefault();
  
      fetch('/student-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userName,       
          password
        })
      })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));
  
     setUsername('');
     setPassword('');
      
    };
  
    return (
      <div>
        <h2>Login User</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Username:
            <input type="text" value={userName} onChange={event => setUsername(event.target.value)} />
          </label>
          <br />        
          <label>
            Password:
            <input type="password" value={password} onChange={event => setPassword(event.target.value)} />
          </label>
          <br />
          <button type="submit" onClick={handleSubmit}>Submit</button>
        </form>
      </div>
    );
  };
  
  
  
export default StudentLoginForm;
