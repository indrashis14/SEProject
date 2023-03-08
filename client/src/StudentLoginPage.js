import React from 'react'
import { useHistory } from 'react-router-dom';

const StudentLoginPage = () => {
    const history = useHistory();

    function handleLoginClick() {
        history.push('/student-login')
    }
    function handleSignupClick() {
        history.push('/student-signup')
    }
  return (
    <div>
      <button className='my-button2' onClick={handleLoginClick}> Login as User </button>
      <button className='my-button2' onClick={handleSignupClick}> Sign up</button>
    </div>
  )
}

export default StudentLoginPage
