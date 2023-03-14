
// import React, { useState, useEffect } from 'react';
// import { Redirect, useHistory } from 'react-router-dom';

// const StudentCart = () => {
//   const history = useHistory();
//   const isAuthenticated = localStorage.getItem('authenticated');
//   console.log(isAuthenticated)
//   if (isAuthenticated === false) {
//       //console.log('here');
//       return <Redirect to='/login' />
//   }

//   const [cartItems, setCartItems] = useState([]);

//   useEffect(() => {
//     fetch('/api/cart')
//       .then(res => res.json())
//       .then(data => {
//         setCartItems(data);
//       })
//       .catch(err => console.log(err));
//   }, []);

//   const handleAddToCart = (item) => {
//     fetch('/api/cart', {
//       method: 'POST',
//       body: JSON.stringify(item),
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     })
//       .then(res => res.json())
//       .then(data => {
//         setCartItems([...cartItems, data]);
//       })
//       .catch(err => console.log(err));
//     }
//   return (
//       <div>
//         {/* Logged In as Student */}
//       <h2>Cart</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>Item Name</th>
//             <th>Price</th>
//             <th>Quantity</th>
//           </tr>
//         </thead>
//         <tbody>
//           {cartItems.map(item => (
//             <tr key={item._id}>
//               <td>{item.name}</td>
//               <td>${item.price}</td>
//               <td>{item.quantity}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   )
// }

// export default StudentCart