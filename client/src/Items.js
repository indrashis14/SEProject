import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Items.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Items() {
  const { vendorid } = useParams();
  const [items, setItems] = useState([]);
  const [selectedNavItem, setSelectedNavItem] = useState('menu');

  useEffect(() => {
    async function fetchItems() {
      const res = await fetch(`/student/${vendorid}/items`);
      const data = await res.json();
      console.log(data);
      setItems(data);
    }
    fetchItems();
  }, [vendorid]);

  function changeItemStatus(event, itemId) {
    const newValue = event.target.checked;
    console.log(itemId, newValue)
    // call api to change status of this item
}


function addToCart(productId) {
  console.log("pressed  ",productId);
  fetch(`/api/users/cart/add/${localStorage.getItem('student_id')}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      productId,
      quantity: 1 // You can change this to whatever quantity you want to add to the cart
    })
  })
  .then( toast.success('Item added to cart successfully!', {
    autoClose: 1000,
  }))
  .then(response => response.json())
  .then(data => {
    console.log(data); // You can handle the response here
    
  })
  .catch(error => {
    console.error(error);
  });
}
  return (
    <div className="menu">
      <ToastContainer />
      <h2 align="center">Items for Vendor</h2>
      {items.map(item => (
  <div className="menuitem" key={item._id}>
    <span className="itemname">{item.itemName}</span>
    <span className="itemprice">Rs.{item.price}</span>
    <span><img src={`/images/${item.image}`} alt="noimage" width="350" height="200" className="itemimage" /></span>
    <button className='add-to-cart-button' onClick={() => addToCart(item._id)}>Add to Cart</button>
  </div>
))}
    </div>
  );
}

export default Items;
