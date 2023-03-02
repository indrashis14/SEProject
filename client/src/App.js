import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AdminLoginPage from './AdminLoginPage';
import StudentLoginPage from './StudentLoginPage';
import StudentLoginForm from './StudentLoginForm';
import VendorLoginPage from './VendorLoginPage';
import LoginPage from './LoginPage';
import StudentSignupForm from './StudentSignupForm'

function App() {
  return (
    <Router>
      <Route exact path="/" component={props => <LoginPage {...props} />} />
      <Route exact path="/admin" component={props => <AdminLoginPage {...props} />}/>
      <Route exact path="/student" component={props => <StudentLoginPage   {...props} />}/>
      <Route exact path="/vendor" component={props => <VendorLoginPage {...props} />} />
      <Route exact path="/student-signup" component={props => <StudentSignupForm {...props} />}/>
      <Route exact path="/student-login" component={props => <StudentLoginForm {...props} />}/>
    </Router>
  );
}

export default App;
