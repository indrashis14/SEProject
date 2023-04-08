 import React, { useState, useEffect } from 'react';
 import { ToastContainer, toast } from 'react-toastify';
 import './StudentCart.css'

// A component to render the cart view
const StudentCart = () => {
  const [products, setProducts] = useState([]);
  const [cartId, setCartId] = useState('');
 useEffect(() => {
  fetch(`/api/users/cart/get/${localStorage.getItem('student_id')}`)
    .then(response => response.json())
    .then(data => {
      setProducts(data.products);
      setCartId(data.cartId);
      localStorage.setItem('cart_id', data.cartId);
      localStorage.setItem('vendorName',data.vendorName);
    })
    .catch(error => console.error(error));
}, []);


  const handleClearCart = () => {
    fetch(`/api/users/cart/clear/${localStorage.getItem('student_id')}`, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(data => setProducts([]))
      .catch(error => console.error(error));
  };

  const handleIncrement = (cartId, productId) => {
    fetch(`/api/users/cart/increment/${cartId}/${productId}`, {
      method: 'PUT'
    })
      .then(response => response.json())
      .then( toast.success('Quantity updated', {autoClose: 1000, limit: 1}))
      .then(data => setProducts(data))
      .catch(error => console.error(error));
  };

  const handleDecrement = (cartId, productId) => {
    fetch(`/api/users/cart/decrement/${cartId}/${productId}`, {
      method: 'PUT'
    })
      .then(response => response.json())
      .then( toast.success('Quantity updated', {autoClose: 1000, limit: 1}))
      .then(data => setProducts(data))
      .catch(error => console.error(error));
  };

  return (
    
    <div className="cart-container">
      <ToastContainer />
    <h1>Cart of User {localStorage.getItem('student')}  </h1>
    <h2> Vendor Name: {localStorage.getItem('vendorName')}</h2>
    <table>
      <thead>
        <tr>
          <th>Item</th>
          <th>Price</th>
          <th>Quantity</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {products.map(product => (
          <tr key={product._id}>
            <td>{product.itemName}</td>
            <td>{product.price}</td>
            <td>{product.quantity}</td>
            <td>
              <button onClick={() => handleIncrement(localStorage.getItem('cart_id').toString(), product._id)}>+ </button>
            </td>
            <td>
              <button onClick={() => handleDecrement(localStorage.getItem('cart_id').toString(), product._id)}> -</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    <div className="cart-total">
    Total: {products.reduce((sum, product) => sum + (product.price * product.quantity), 0)}
  </div>
    <button onClick={handleClearCart}>Clear Cart</button>
  </div>
  );
}


export default StudentCart;