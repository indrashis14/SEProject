import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import './vendorpage.css'

//import

const VendorPage = () => {
    const [vendorData, setVendorData] = useState('');
    const [selectedNavItem, setSelectedNavItem] = useState('menu');
    const history = useHistory();
    const isAuthenticated = localStorage.getItem('authenticated');
    const [orders, setOrders] = useState([]);

    console.log(isAuthenticated)

    if (isAuthenticated === false) {
        console.log('here');
        history.push("/vendor/login")
    }

      useEffect(() => {
    const vendor_id = localStorage.getItem('vendor_id');

    fetch(`http://localhost:5000/vendor/${vendor_id}/`)
      .then(response => response.json())
      .then(data => {
        console.log("vendor data:", data)
        setVendorData(data);
      })
      .catch(err => {
        console.log("error while fetching vendor data:", err)
      });

    fetch(`api/users/orders/new/${vendor_id}`)
      .then(response => response.json())
      .then(data => {
        console.log("order data:", data)
        setOrders(data);
      })
      .catch(err => {
        console.log("error while fetching order data:", err)
      });
  }, []);

    function showMenu() {
        setSelectedNavItem('menu');
    }
    function showOrderRequests() {
        setSelectedNavItem('orderRequests');
    }

    function showCurrentOrders() {
        setSelectedNavItem('currentOrders');
    }

    function showFulfilledOrders() {
        setSelectedNavItem('fulfilledOrders');
    }
    function changeItemStatus(event, itemId) {
        const newValue = event.target.checked;
        console.log(itemId, newValue)
        // call api to change status of this item
    }
    return (
        <div>
            {vendorData
                ? <div className="container">
                    <h1 className="heading">Welcome {vendorData['userName']}</h1>
                    <div id="navbar">
                        <div onClick={showMenu} className={`navitem ${selectedNavItem === 'menu' ? 'selected' : ''}`}>Menu</div>
                        <div onClick={showOrderRequests} className={`navitem ${selectedNavItem === 'orderRequests' ? 'selected' : ''}`}>Order Requests</div>
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
                            <button>Accept Order</button>
                            </div>
                        ))
                        ) : (
                        <p>No order requests found.</p>
                        )}

                     </div>
                    )}
                    {selectedNavItem === 'currentOrders' && (
                        <div>
                            Show Current Orders here
                        </div>
                    )}
                    {selectedNavItem === 'fulfilledOrders' && (
                        <div>
                            Show Fulfilled Orders here
                        </div>
                    )}
                </div>
                : <div>Loading...</div>
            }
        </div>
    );
}

export default VendorPage
