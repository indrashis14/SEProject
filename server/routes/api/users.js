const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');
const {check,validationResult }= require('express-validator');
const config=require('config');
const mongoose=require('mongoose');



// Load User model
const User = require('../../models/User');
const Cart = require("../../models/Cart");
const Order = require('../../models/Order');
mongoose.model('User', User.schema);



const VendorItems = require('../../models/VendorItem');

// @route   GET api/users/test2
// @desc    Tests users route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Users Works' }));

// @route   GET api/users/register
// @desc    Register user
// @access  Public
router.post('/register',[check('userName','Please provide name').not().isEmpty() ,
  check('email','Please input valid email id').isEmail(),
  check('password','Enter valid password').not().isEmpty(),
  check('mobile','Enter valid number').isNumeric()],
   (req, res) => {
const errors=validationResult(req);
if(!errors.isEmpty()){
return res.status(400).json({errors:errors.array()});}
const { userName, email, password, mobile } = req.body;

const user = new User({
userName,
email,
password,
mobile
});
console.log(`Received user data: ${userName}, ${email}, ${mobile}`);
res.json({ message: 'User created successfully' });

user.save()
.then(() => console.log('User added!'))
.catch(err => res.status(400).write('Error: ' + err));
});



// @route   GET api/users/login
// @desc    Login User 
// @access  Public
router.post('/login', async(req, res) => {

  const { userName, password } = req.body;
  if (!userName || !password) {
    return res.status(400).json({ "result": "invalid data" });
}
const user = await User.findOne({ userName: userName })
if (user) {
    bcrypt.compare(password, user.password, function (error, result) {
        if (error) {
            console.error(error)
        }
        if (result) {
            console.log("Passwords match!")
            res.json({ 'isLoggedIn': true, 'id': user._id })
        }
        else {
            console.log("Passwords don't match!")
            res.json({ 'isLoggedIn': false, 'id': user._id })
            res.status(400).json('Error: password mismatch')
        }
    })
}


  


});

router.get("/cart/get/:student_id/", async (req, res) => {
    const userId = req.params.student_id; 

  try {
    let cart = await Cart.findOne({ userId }).populate('products.productId').populate('vendorId'); // find the cart for the user

    if (cart) {
      //cart exists for user
      return res.status(200).send({cartId: cart._id, products: cart.products, vendorName: cart.vendorId.storeName}); // send back the cart
    } else {
      //no cart for user, send error message
      return res.status(404).send("Cart not found");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong"); // handle errors
  }
});

router.post("/cart/add/:student_id/", async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.params.student_id;

    const product = await VendorItems.findById(productId);
    const vendorId = product.vendor;
    // Check if the cart already exists for the user
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // If the cart doesn't exist, create a new one
      cart = new Cart({
        userId,
        vendorId,
        products: [],
      });}
      // console.log("cart wala  " ,cart.vendorId.toString());
    //   console.log(vendorId.toString())
     else if (cart.vendorId.toString() != vendorId.toString()) {
      // If the cart exists but has items from a different vendor, clear the cart
      cart.products = [];
      cart.vendorId = vendorId;
    }

    // Check if the product already exists in the cart
    const existingProductIndex = cart.products.findIndex(
      (product) => product._id.toString() === productId
    );

    if (existingProductIndex !== -1) {
      // If the product already exists, update its quantity
      cart.products[existingProductIndex].quantity += parseInt(quantity);
    } else {
      // If the product doesn't exist, add it to the cart
      const product = await VendorItems.findById(productId);
      cart.products.push({
        _id: product._id,
        itemName: product.itemName,
        price: product.price,
        quantity,
      });
    }

    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

router.delete("/cart/clear/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const updatedCart = await Cart.findOneAndUpdate(
      { userId: userId },
      { products: [] },
      { new: true }
    );

    if (!updatedCart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json({ message: "Cart cleared successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});


router.put("/cart/increment/:cartId/:productId", (req, res) => {
  const cartId = req.params.cartId;
  const productId = req.params.productId;
  Cart.findById(cartId, async (err, cart) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      console.log(productId);
      const product = await cart.products.find((p) => p._id.toString() == productId);
      if (product) {
        product.quantity++;
        cart.save((err, updatedCart) => {
          if (err) {
            console.error(err);
            res.status(500).json({ error: "Internal server error" });
          } else {
            res.json(updatedCart.products);
          }
        });
      } else {
        res.status(404).json({ error: "Product not found in cart" });
      }
    }
  });
});


router.put("/cart/decrement/:cartId/:productId/", async (req, res) => {
  try {
    const { cartId, productId } = req.params;
    const cart = await Cart.findById(cartId);

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const product = cart.products.find(
      (product) => product._id.toString() === productId
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    let quantity = product.quantity;
    if (quantity > 1) {
      quantity -= 1;
      product.quantity = quantity;
      cart.modifiedOn = new Date();

      const updatedCart = await cart.save();
      return res.json(updatedCart.products);
    } else {
      cart.products = cart.products.filter(
        (product) => product._id.toString() !== productId
      );
      cart.modifiedOn = new Date();

      const updatedCart = await cart.save();
      return res.json(updatedCart.products);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});





// router.post("/cart/add/:student_id/", async (req, res) => {
//   const { product_id, quantity, name, price } = req.body; // get the product details from the request body
//   //const userId = req.user._id; // get the user id from the request object (assuming you have some authentication middleware)
//   const userId = req.params.student_id;
//   console.log(product_id);

  
//   try {
//     let cart = await Cart.findOne({ userId }); // find the cart for the user

//     if (cart) {
//       //cart exists for user
//       let productId=mongoose.types.ObjectId(product_id);
//       let itemIndex = cart.products.findIndex((p) => p.productId == productId); // find the index of the product in the cart

//       if (itemIndex > -1) {
//         //product exists in the cart, update the quantity
//         let productItem = cart.products[itemIndex];
//         productItem.quantity = quantity;
//         cart.products[itemIndex] = productItem;
//       } else {
//         //product does not exists in cart, add new item
//         cart.products.push({ productId, quantity, name, price });
//       }
//       cart = await cart.save(); // save the updated cart
//       return res.status(201).send(cart); // send back the updated cart
//     } else {
      
//       //no cart for user, create new cart
//       let productId=mongoose.types.ObjectId(product_id);
//       const newCart = await Cart.create({
//         userId,
//         products: [{ productId, quantity, name, price }],
//       }); // create a new cart with the product

//       return res.status(201).send(newCart); // send back the new cart
//     }
//   } catch (err) {
//     console.log(err);
//     res.status(500).send("Something went wrong"); // handle errors
//   }
// });



router.delete("/cart/:student_id/:productId", async (req, res) => {
  const productId = req.params.productId; // get the product id from the request params
  const userId = req.user._id; // get the user id from the request object (assuming you have some authentication middleware)

  try {
    let cart = await Cart.findOne({ userId }); // find the cart for the user

    if (cart) {
      //cart exists for user
      let itemIndex = cart.products.findIndex((p) => p.productId == productId); // find the index of the product in the cart

      if (itemIndex > -1) {
        //product exists in the cart, remove it
        cart.products.splice(itemIndex, 1); // use splice to remove one element at itemIndex
        cart = await cart.save(); // save the updated cart
        return res.status(200).send(cart); // send back the updated cart
      } else {
        //product does not exist in cart, send error message
        return res.status(404).send("Product not found in cart");
      }
    } else {
      //no cart for user, send error message
      return res.status(404).send("Cart not found");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong"); // handle errors
  }
});

router.put("/orders/create/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const cart = await Cart.findOne({userId}).populate("products.productId");
    const order = new Order({
      userId: cart.userId,
      vendorId: cart.vendorId,
      products: cart.products.map(product => ({
        itemId: product._id,
        itemName: product.itemName,
        price: product.price,
        quantity: product.quantity
      })),
      status: "new"
    });
    await order.save();
    await Cart.updateOne({_id: cart._id}, {$set: {products: []}}); // Clear cart
    res.status(200).json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Unable to create order." });
  }
});


router.get('/orders/new/:vendorId', async (req, res) => {
  try {
    const orders = await Order.find({ vendorId: req.params.vendorId, status: 'new' }).populate('userId').populate('products.productId');
    res.json(orders);
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err);
  }
});








module.exports = router;
