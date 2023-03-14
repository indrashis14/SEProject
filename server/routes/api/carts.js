const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');

router.get('/', async (req, res) => {
  try {
    const userId = req.user._id; // get the current user's ID from the request
    const cartItems = await Cart.find({ userId }).populate('itemId');
    res.json(cartItems);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const userId = req.user._id; // get the current user's ID from the request
    const itemId = req.body.itemId;
    const quantity = req.body.quantity;

    // Check if the item already exists in the user's cart
    let cartItem = await Cart.findOne({ userId, itemId });

    if (cartItem) {
      // If item exists, update the quantity
      cartItem.quantity += quantity;
      cartItem = await cartItem.save();
    } else {
      // If item doesn't exist, create a new cart item
      cartItem = new Cart({
        userId,
        itemId,
        quantity
      });
      cartItem = await cartItem.save();
    }

    res.json(cartItem);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const cartItem = await Cart.findById(req.params.id);

    if (!cartItem) {
      return res.status(404).json({ error: 'Cart item not found' });
    }

    await cartItem.remove();

    res.json({ message: 'Cart item removed' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;