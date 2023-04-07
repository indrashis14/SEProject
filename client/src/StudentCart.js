 import React, { useState, useEffect } from 'react';

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
      .then(data => setProducts(data))
      .catch(error => console.error(error));
  };

  const handleDecrement = (cartId, productId) => {
    fetch(`/api/users/cart/decrement/${cartId}/${productId}`, {
      method: 'PUT'
    })
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h1>Cart of User {localStorage.getItem('student')} </h1>
      <ul>
        {products.map(product => (
          <li key={product._id}>
            {product.itemName}  Price: {product.price}  Quantity: {product.quantity}    
            
            <button onClick={() => handleIncrement(localStorage.getItem('cart_id').toString(), product._id)}>+ </button>
                     
            <button onClick={() => handleDecrement(localStorage.getItem('cart_id').toString(), product._id)}> -</button>
          </li>
        ))}
      </ul>
      <button onClick={handleClearCart}>Clear Cart</button>
    </div>
  );
}


export default StudentCart;