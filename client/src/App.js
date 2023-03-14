import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AdminLoginPage from './AdminLoginPage';
import StudentLoginPage from './StudentLoginPage';
import StudentLoginForm from './StudentLoginForm';
import VendorLoginPage from './VendorLoginPage';
import LoginPage from './LoginPage';
import StudentSignupForm from './StudentSignupForm'
import VendorSignupPage from './VendorSignupPage';
import VendorPage from './VendorPage'
import VendorInvalidLoginPage from './VendorInvalidLoginPage'
import VendorAddItemPage from './VendorAddItemPage'
import AdminInvalidLoginPage from './AdminInvalidLoginPage';
import AdminDashboard from './AdminDashboard'
import StudentCart from './StudentCart'
import StudentInvalidLoginPage from   './StudentInvalidLoginPage'

function App() {
    return (
        <Router>
            <Route exact path="/" component={props => <LoginPage {...props} />} />
            <Route exact path="/admin" component={props => <AdminLoginPage {...props} />} />
            <Route exact path="/invalid-admin" component={props => <AdminInvalidLoginPage {...props} />} />
            <Route exact path="/admin-dashboard" component={props => <AdminDashboard {...props} />} />
            <Route exact path="/student" component={props => <StudentLoginPage   {...props} />} />
            <Route exact path="/vendor" component={props => <VendorPage {...props} />} />
            <Route exact path="/vendor/signup" component={props => <VendorSignupPage {...props} />} />
            <Route exact path="/vendor/login" component={props => <VendorLoginPage {...props} />} />
            <Route exact path="/vendor/invalid-login" component={props => <VendorInvalidLoginPage {...props} />} />
            <Route exact path="/vendor/addItem" component={props => <VendorAddItemPage {...props} />} />
            <Route exact path="/student/signup" component={props => <StudentSignupForm {...props} />} />
            <Route exact path="/student/login" component={props => <StudentLoginForm {...props} />} />
            <Route exact path="/student/cart" component={props => <StudentCart {...props} />} />
            <Route exact path="/student/invalid-login" component={props => <StudentInvalidLoginPage {...props} />} />


        </Router>
    );
}

export default App;
