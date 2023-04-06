import { useEffect, useState } from "react";
import { Redirect, useHistory, Link } from 'react-router-dom';
//import { get } from "../../server/routes/api/users";

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
      .catch(err => console.error(err));
  }, []);

  
  // Render the list of vendors
  return (
    <div>
      <h1 align="center">Welcome {userName}</h1>
      <br/><br/>
      <h2 align="center">List of Vendors</h2>
      {vendors.map(vendor => (
        <p key={vendor._id}>
          <Link to={`/student/${vendor._id}/items`}>{vendor.storeName}</Link>
        </p>
      ))}
      
    </div>
  );
 

}

export default StudentLoginPage
