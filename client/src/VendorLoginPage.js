import React, { useState } from 'react'
import { useHistory, Redirect } from 'react-router-dom';

const VendorLoginPage = () => {
    const [userName, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();
    // const [email, setEmail] = useState('');
    // const [mobile, setMobile] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        fetch('http://localhost:5000/vendor/login', {
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
                localStorage.setItem('vendor', userName)
                localStorage.setItem('authenticated', true)
                if(data === 'User logged in!') history.push('/vendor');
                else history.push('/vendor/invalid-login');
            })
            .catch(error => console.error(error));

        setUsername('');
        setPassword('');

    };

    return (
        <div className='login-container'>
            <h1>Login Vendor</h1>
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
            <a href='/vendor/signup'>SignUP</a>
        </div>

    );
};

export default VendorLoginPage
