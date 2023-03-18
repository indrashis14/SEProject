import { useEffect,useState } from "react";
import { Redirect, useHistory } from 'react-router-dom';
//import { get } from "../../server/routes/api/users";

const StudentLoginPage = () => {
  
  const history = useHistory();
  const isAuthenticated = localStorage.getItem('authenticated');
  console.log(isAuthenticated)
  if (isAuthenticated === false) {
      //console.log('here');
      history.push("/student/login")
  }




const [vendors, setVendors] = useState([]);

  // Fetch data from API using fetch
  useEffect(() => {
    // Use fetch to get data from API
    fetch("/vendors/names")
      .then((res) => {
        // Check if the response is ok
        if (res.ok) {
          // Convert the response to JSON
          return res.json();
        } else {
          // Throw an error if the response is not ok
          throw new Error(res.status);
        }
      })
      .then((data) => {
        // Set the state with the data
        setVendors(data);
      })
      .catch((err) => {
        // Handle any errors
        console.error(err);
      });
  }, []); // Empty dependency array means only run once

  // Render the list of vendors
  return (
    <div>
      <h1>Welcome Student</h1>
      <br></br><br></br>
      <h2>List of Vendors</h2>
      <ul>
        {vendors.map((vendor) => (
          <li key={vendor}>{vendor}</li>
        ))}
      </ul>
      <a className="button" href="/student/cart">View Cart</a>
    </div>
  );
 

}

export default StudentLoginPage
