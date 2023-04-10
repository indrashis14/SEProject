import React, { useState } from 'react';
import './VendorAddItem.css';
import { useHistory } from 'react-router-dom';
function VendorAddItemPage() {
  const [itemName, setName] = useState('');
  const [price, setPrice] = useState('');
  const [imageData, setImageData] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const history = useHistory();

  const handleFileInputChange = (event) => {
    const selectedFile = event.target.files[0];
    setImageData(selectedFile);
    setImagePreview(URL.createObjectURL(selectedFile));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('itemName', itemName);
    formData.append('price', price);
    formData.append('imageData', imageData);
    try {
      const response = await fetch(`http://localhost:5000/vendor/${localStorage.getItem('vendor_id')}/addItem`, {
        method: 'POST',
        body: formData
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = await response.json();
      console.log(data);
      
      history.push('/vendor');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
    
    <form onSubmit={handleSubmit}>
      <div id="name-input">
      <h1 className='additem'>Add Item</h1>
      <label htmlFor="name-input">
        Name:
        <input type="text" value={itemName} onChange={(event) => setName(event.target.value)} />
      </label>
      <br/>
      <label htmlFor="price-input">
        Price:
        <input id="price-input" type="text" value={price} onChange={(event) => setPrice(event.target.value)} />
      </label>
      <br/>
      <label htmlFor="image-input">
        Image:
        <input id="image-input" type="file" name='imageData' accept="image/*" onChange={handleFileInputChange} />
        {imagePreview && <img className="image-preview" src={imagePreview} alt="Image preview" />}
      </label>
      <br/>
      <button type="submit">Submit</button>
      </div>
    </form>
    </div>
  );
}

export default VendorAddItemPage;
