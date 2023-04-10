import React, { useState } from 'react'
import { useHistory, Redirect } from 'react-router-dom';

const AdminInvalidLoginPage = () => {
    const [userName, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();
    // const [email, setEmail] = useState('');
    // const [mobile, setMobile] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        fetch('/admin/login', {
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
                localStorage.setItem('admin', userName)
                localStorage.setItem('authenticated', true)
                if(data["message"] === 'Login successful') history.push('/admin-dashboard');
                else history.push('/invalid-admin');
            })
            .catch(error => console.error(error));

        setUsername('');
        setPassword('');

    };

    return (
        <div className='login-container'>
            <h1>Admin Login</h1>
            <h4>Invalid Login!</h4>
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
        </div>

    );
};

export default AdminInvalidLoginPage
