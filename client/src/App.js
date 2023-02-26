import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import UserLoginPage from './UserLoginPage';
import StudentLoginPage from './StudentLoginPage';
import VendorLoginPage from './VendorLoginPage';
import LoginPage from './LoginPage';

function App() {
  return (
    <Router>
      <LoginPage/>
      <Route exact path="/user-login" component={UserLoginPage} />
      <Route exact path="/student-login" component={StudentLoginPage} />
      <Route exact path="/vendor-login" component={VendorLoginPage} />
    </Router>
  );
}

export default App;
