import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import './vendorpage.css'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//import

const VendorPage = () => {
    const [vendorData, setVendorData] = useState('');
    const [selectedNavItem, setSelectedNavItem] = useState('menu');
    const history = useHistory();
    const isAuthenticated = localStorage.getItem('authenticated');
    const [orders, setOrders] = useState([]);
    const [aorders, setAorders] = useState([]);
    const [forders, setForders] = useState([]);


    console.log(isAuthenticated)

    if (isAuthenticated === false) {
        console.log('here');
        history.push("/vendor/login")
    }

      useEffect(() => {
    const vendor_id = localStorage.getItem('vendor_id');

    fetch(`/api/vendors/get/${vendor_id}/`)
      .then(response => response.json())
      .then(data => {
        console.log("vendor data:", data)
        setVendorData(data);
      })
      .catch(err => {
        console.log("error while fetching vendor data:", err)
      });
  }, []);

    

    function showMenu() {
        setSelectedNavItem('menu');
    }
    function showOrderRequests() {
        setSelectedNavItem('orderRequests');

        const vendor_id = localStorage.getItem('vendor_id');

    fetch(`/api/users/orders/new/${vendor_id}`)
      .then(response => response.json())
      .then(data => {
        console.log("order data:", data)
        setOrders(data);
      })
      .catch(err => {
        console.log("error while fetching order data:", err)
      });
    }

    function showCurrentOrders() {
        setSelectedNavItem('currentOrders');

        const vendor_id = localStorage.getItem('vendor_id');
        fetch(`/api/users/orders/accepted/${vendor_id}`)
      .then(response => response.json())
      .then(data => {
        console.log("order data:", data)
        setAorders(data);
      })
      .catch(err => {
        console.log("error while fetching order data:", err)
      });
        
    }

    function showFulfilledOrders() {
        setSelectedNavItem('fulfilledOrders');
        const vendor_id = localStorage.getItem('vendor_id');

    fetch(`/api/users/orders/fulfilled/${vendor_id}`)
      .then(response => response.json())
      .then(data => {
        console.log("order data:", data)
        setForders(data);
      })
      .catch(err => {
        console.log("error while fetching order data:", err)
      });
    }
    function changeItemStatus(event, itemId) {
        const newValue = event.target.checked;
        console.log(itemId, newValue)
        // call api to change status of this item
    }

    const [isLoading, setIsLoading] = useState(false);

  const handleAcceptOrder = async (order) => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/users/accept-order/${order._id}`, {
        method: 'PUT',
      });
      const data = await res.json();
      toast.success(`Order ${order._id} has been accepted`);
      console.log(data);

      const vendor_id = localStorage.getItem('vendor_id');
    fetch(`/api/users/orders/new/${vendor_id}`)
      .then(response => response.json())
      .then(data => {
        console.log("current orders data:", data)
        setOrders(data);
      })
      .catch(err => {
        console.log("error while fetching current orders data:", err)
      });
    } catch (err) {
      console.error(err);
      toast.error('Error accepting order');
    }
    finally {
        setIsLoading(false);
      }
  };

  const handleFulfillOrder = async (order) => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/users/fulfill-order/${order._id}`, {
        method: 'PUT',
      });
      const data = await res.json();
      toast.success(`Order ${order._id} has been fulfilled`);
      console.log(data);

      const vendor_id = localStorage.getItem('vendor_id');
    fetch(`/api/users/orders/accepted/${vendor_id}`)
      .then(response => response.json())
      .then(data => {
        console.log("current orders data:", data)
        setAorders(data);
      })
      .catch(err => {
        console.log("error while fetching accepted orders data:", err)
      });
    } catch (err) {
      console.error(err);
      toast.error('Error fulfilling order');
    }
    finally {
        setIsLoading(false);
      }
  };

    return (
        <div>
            {vendorData
                ? <div className="container">
                    <ToastContainer />
                    <h1 className="heading">Welcome {vendorData['userName']}</h1>
                    <div id="navbar">
                        <div onClick={showMenu} className={`navitem ${selectedNavItem === 'menu' ? 'selected' : ''}`}>Menu</div>
                        <div onClick={showOrderRequests} className={`navitem ${selectedNavItem === 'orderRequests' ? 'selected' : ''}`}>New Orders</div>
                        <div onClick={showCurrentOrders} className={`navitem ${selectedNavItem === 'currentOrders' ? 'selected' : ''}`}>Current Orders</div>
                        <div onClick={showFulfilledOrders} className={`navitem ${selectedNavItem === 'fulfilledOrders' ? 'selected' : ''}`}>Fulfilled Orders</div>
                    </div>
                    {selectedNavItem === 'menu' && (
                        <div id="menu">
                            {vendorData['items'].map(item => (
                                <div className="menuitem" key={item._id}>
                                    <span className="itemname">{item.itemName}</span>
                                    <span className="itemprice">Rs.{item.price}</span>
                                    {/* {`${item.image}`} */}
                                    <span><img src={`/images/${item.image}`} alt="noimage" width="350" height="200" className="itemimage" /></span>
                                    {/* <image source={{images(`./${item.image}`).default}} /> */}
                                    <label class="toggle-btn">
                                        <input onChange={event => changeItemStatus(event, item._id)} type="checkbox" />
                                        <span class="slider round"></span>
                                    </label>
                                </div>))}
                            <a className="button" href="/vendor/addItem">Add Item</a>
                        </div>
                    )}
                    {selectedNavItem === 'orderRequests' && (
                       <div>
                       <h2>Order Requests</h2>
                       {orders && orders.length > 0 ? (
                        orders.map(order => (
                            <div key={order._id} className="order-container">
                            <p><b>Order ID: </b>{order._id}</p>
                            {/* <p><b>Status: </b>{order.status}</p> */}
                            <p><b>Created On: </b>{new Date(order.createdOn).toLocaleString()}</p>
                            <p><b>Username: </b>{order.userId.userName}</p>
                            {order.products.map(product => (
                                <div key={product.productId}>
                                <p><b>Item Name: </b>{product.itemName}</p>
                                </div>
                            ))}
                             <button onClick={() => handleAcceptOrder(order)} disabled={isLoading} >Accept Order</button>
                            </div>
                        ))
                        ) : (
                        <p>No order requests found.</p>
                        )}

                     </div>
                    )}
                    {selectedNavItem === 'currentOrders' && (
                        <div>
                           <h2>Current Orders</h2>
                       {orders && aorders.length > 0 ? (
                        aorders.map(order => (
                            <div key={order._id} className="order-container">
                            <p><b>Order ID: </b>{order._id}</p>
                            {/* <p><b>Status: </b>{order.status}</p> */}
                            <p><b>Created On: </b>{new Date(order.createdOn).toLocaleString()}</p>
                            <p><b>Username: </b>{order.userId.userName}</p>
                            {order.products.map(product => (
                                <div key={product.productId}>
                                <p><b>Item Name: </b>{product.itemName}</p>
                                </div>
                            ))}
                             <button onClick={() => handleFulfillOrder(order)} disabled={isLoading} >Order Fulfilled</button>
                            </div>
                        ))
                        ) : (
                        <p>No current orders found.</p>
                        )}
                        </div>
                    )}
                    {selectedNavItem === 'fulfilledOrders' && (
                        <div>
                        <h2>Fulfilled Orders</h2>
                    {forders && forders.length > 0 ? (
                     forders.map(order => (
                         <div key={order._id} className="order-container">
                         <p><b>Order ID: </b>{order._id}</p>
                         {/* <p><b>Status: </b>{order.status}</p> */}
                         <p><b>Created On: </b>{new Date(order.createdOn).toLocaleString()}</p>
                         <p><b>Username: </b>{order.userId.userName}</p>
                         {order.products.map(product => (
                             <div key={product.productId}>
                             <p><b>Item Name: </b>{product.itemName}</p>
                             </div>
                         ))}
                          <button onClick={() => handleFulfillOrder(order)} disabled={isLoading} >Order Fulfilled</button>
                         </div>
                     ))
                     ) : (
                     <p>No current orders found.</p>
                     )}
                        </div>
                    )}
                </div>
                : <div>Loading...</div>
            }
        </div>
    );
}

export default VendorPage
