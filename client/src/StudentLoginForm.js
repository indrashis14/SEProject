import React, { useState } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import './Login.css';

const StudentLoginForm = () => {
    const [userName, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();
    // const [email, setEmail] = useState('');
    // const [mobile, setMobile] = useState('');
  
    const handleSubmit = (event) => {
      event.preventDefault();
  
      fetch('/api/users/login', {
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
      .then(data => {
                console.log(data)
                console.log('result: ', data['result'])
                if (data['isLoggedIn']) {
                    localStorage.setItem('student_id', data['id'])
                    localStorage.setItem('student', userName)
                    localStorage.setItem('authenticated', true)
                    history.push('/student');
                }
                else {
                    localStorage.removeItem('student')
                    localStorage.removeItem('student_id')
                    localStorage.setItem('authenticated', false)
                    history.push('/student/invalid-login')
                };
                
            })
      .catch(error => { console.error(error); history.push('/student/login/') });
  
     setUsername('');
     setPassword('');
      
    };
  
    return (
      <div className='login-container'>
        <h1 className="login-header">Login</h1>
        <form className="login-form" onSubmit={handleSubmit}>
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
        <br/>
            <a href='/student/signup'>Sign Up</a>
      </div>
    );
  };
  
  
  
export default StudentLoginForm;
