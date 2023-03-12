import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
const VendorAddItemPage = () => {
    const [itemName, setItemName] = useState('');
    const [price, setPrice] = useState('');
    //we add more options as per requirements
    const history = useHistory();
    const handleSubmit = (event) => {
        event.preventDefault();

        fetch(`http://localhost:5000/vendor/${localStorage.getItem('vendor_id')}/addItem`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                itemName,
                price
            })
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error(error));
        history.push('/vendor/');
    };

    return (
        <div className='container'>
            <h1>Add Item</h1>
            <form className="form" onSubmit={handleSubmit}>
                <label>
                    Item Name:
                    <input type="text" value={itemName} onChange={event => setItemName(event.target.value)} />
                </label>
                <br />
                <label>
                    Price:
                    <input type="number" value={price} onChange={event => setPrice(event.target.value)} />
                </label>
                <br />
                <button type="Add" onClick={handleSubmit}>Submit</button>
            </form>
            <br />
            <a href='/vendor'>Back</a>
        </div>
    );
};

export default VendorAddItemPage;
