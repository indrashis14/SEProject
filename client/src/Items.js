import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Items() {
  const { vendorid } = useParams();
  const [items, setItems] = useState([]);
  const [selectedNavItem, setSelectedNavItem] = useState('menu');

  useEffect(() => {
    async function fetchItems() {
      const res = await fetch(`/student/${vendorid}/items`);
      const data = await res.json();
      setItems(data);
    }
    fetchItems();
  }, [vendorid]);

  function changeItemStatus(event, itemId) {
    const newValue = event.target.checked;
    console.log(itemId, newValue)
    // call api to change status of this item
}

  return (
    <div>
      <h2 align="center">Items for Vendor</h2>
      {items.map(item => (
                                <div className="menuitem" key={item._id}>
                                    <span className="itemname">{item.itemName}</span>
                                    <span className="itemprice">Rs.{item.price}</span>
                                    {/* {`${item.image}`} */}
                                    <span><img src={`./images/${item.image}`} alt="noimage" width="350" height="200" className="itemimage" /></span>
                                    {/* <image source={{images(`./${item.image}`).default}} /> */}
                                    <label class="toggle-btn">
                                        <input onChange={event => changeItemStatus(event, item._id)} type="checkbox" />
                                        <span class="slider round"></span>
                                    </label>
                                </div>))}
    </div>
  );
}

export default Items;
