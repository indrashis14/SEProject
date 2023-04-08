import { useEffect, useState } from "react";
import { Redirect, useHistory, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
//import { get } from "../../server/routes/api/users";
import './student.css'

const StudentLoginPage = () => {
  
  const history = useHistory();
  const userName = localStorage.getItem('student');
  const isAuthenticated = localStorage.getItem('authenticated');
  if (isAuthenticated === false) {
      history.push("/student/login")
  }
  
  

 

const [vendors, setVendors] = useState([]);

  // Fetch data from API using fetch
  useEffect(() => {
    fetch('/vendors/names')
      .then(res => res.json())
      .then(data => setVendors(data))
      //.then(toast.success('Logged in', {autoClose: 1000, limit: 1}))
      .catch(err => console.error(err));
  }, []);

  
  // Render the list of vendors
  return (
    <div className="welcome-container">
      <ToastContainer />
  <h1 className="welcome-title">Welcome {userName}</h1>
  <br/><br/>
  <h2 className="vendor-list-title">List of Vendors</h2>
  {vendors.map(vendor => (
    <p key={vendor._id}>
      <Link className="vendor-link" to={`/student/${vendor._id}/items`}>{vendor.storeName}</Link>
    </p>
  ))}
  <a className="button" href="/student/cart">View Cart</a>
</div>
  );
 

}

export default StudentLoginPage
