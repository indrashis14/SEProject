
 import React, { useState, useEffect } from 'react';
 import { Redirect, useHistory } from 'react-router-dom';

//import React from "react";
// const response = await fetch(`/api/users/cart/get/${localStorage.getItem('student_id')}`



    // const history = useHistory();
    // const isAuthenticated = localStorage.getItem('authenticated');
    // console.log(isAuthenticated)
    // if (isAuthenticated === false) {
    //     //console.log('here');
    //     return <Redirect to='/login' />
    // }
   
    
// A component to render each item in the cart
const CartItem = ({ item, onDelete, onAdd }) => {
  return (
    <div className="cart-item">
      <h4>{item.name}</h4>
      <p>{item.price}</p>
      <button onClick={() => onDelete(item.id)}>Delete</button>
      <button onClick={() => onAdd(item.id)}>Add</button>
    </div>
  );
};

// A component to render the cart view
const StudentCart = () => {
 const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`/api/users/cart/get/${localStorage.getItem('student_id')}`)
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h1>Cart of User {localStorage.getItem('student')} </h1>
      <ul>
        {products.map(product => (
          <li key={product.productId}>
            {product.itemName}  Price: {product.price}  Quantity: {product.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
}


export default StudentCart;

// const StudentCart = () => {
//   const history = useHistory();
//   const isAuthenticated = localStorage.getItem('authenticated');
//   console.log(isAuthenticated)
//   if (isAuthenticated === false) {
//       //console.log('here');
//       return <Redirect to='/login' />
//   }

//   const [cartProducts, setCartProducts] = useState([]);

//   useEffect(() => {
//     fetch('/api/cart')
//       .then(res => res.json())
//       .then(data => {
//         setCartProducts(data);
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
//         setCartProducts([...cartProducts, data]);
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
//           {cartProducts.map(item => (
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