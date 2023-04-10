const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const {check,validationResult }= require('express-validator');
const multer = require('multer');


const User = require('../../models/User');
const Cart = require("../../models/Cart");
const Order = require('../../models/Order');
const VendorItems = require('../../models/VendorItem');
const Vendor = require('../../models/Vendor');





const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './'+'../client/public/images/');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.jpg');
    },
  });
  var upload = multer({ storage: storage })
// @route   GET api/vendors/test
// @desc    Tests users route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Vendor Works' }));

router.post("/signup",[check('userName','Please provide name').not().isEmpty() ,
                            check('storeName','Enter store name').not().isEmpty(),
                            check('email','Please input valid email id').isEmail(),
                            check('password','Enter valid password').not().isEmpty(),
                            check('mobile','Enter valid number').isNumeric()], async (req, res) => {
    const { userName, storeName, email, password, mobile } = req.body;
    if (!userName || !storeName || !email || !password || !mobile) {
        return res.status(400).json({ "result": "invalid data" })
    }
    const oldUser = await Vendor.findOne({ "$or": [{ userName: userName }, { storeName: storeName}, { email: email }, { mobile: mobile }] })
    if (oldUser) {
        // already user exists with this username
        return res.status(400).json({ "result": "user already exists" });
    }
    const vuser = new Vendor({
        userName,
        storeName,
        email,
        password,
        mobile
    })
    vuser.save().then((item) => { console.log(`data saved successfully ${item}`); res.json({ "result": "success" }) }).catch(err => { console.log(err); res.status(400).json({ "result": "bad request" }) })
})


//vendor login check
router.post("/login",async (req, res) => {
    const { userName, password } = req.body;
    if (!userName || !password) {
        return res.status(400).json({ "result": "invalid data" });
    }
    const user = await Vendor.findOne({ userName: userName })
    if (user) {
        bcrypt.compare(password, user.password, function (error, result) {
          if (error) {
            console.error(error);
            return res.status(500).json({ "result": "server error" });
          }
          if (result) {
            console.log("Passwords match!");
            res.json({ 'isLoggedIn': true, 'id': user._id });
          } else {
            console.log("Passwords don't match!");
            res.status(400).json({ 'isLoggedIn': false,'id': user._id ,"result": "password mismatch" });
          }
        });
      } else {
        res.status(400).json({  "result": "user not found" });
      }
})

//this is for vendorside login
router.get("/get/:vendor_id/", async (req, res) => {
    try {
        console.log('here')
        const vendor_id = req.params.vendor_id
        const vendor = await Vendor.findOne({ _id: vendor_id })
        if (vendor) {
            const response = { ...vendor._doc }
            const vendorItems = await VendorItems.find({ vendor: vendor })
            delete response['password'];
            response['items'] = vendorItems;
            return res.json(response);
        }
        else {
            throw new Error("Vendor not found")
        }
    }
    catch (err) {
        console.log("error: ", err)
        return res.json({ result: err }).status(400)
    }
})

//this is for studentside cart
router.get('/get-items/:vendorid/', async (req, res) => {
    const items = await VendorItems.find({ vendor: req.params.vendorid }).populate(
      'vendor'
    );
    res.json(items);
  });

router.get('/names', async (req, res) => {
    try {
      const vendors = await Vendor.find({}, 'storeName').exec(); // retrieve all vendors and select only the storeName field
      res.json(vendors); // respond with a JSON array of all vendors
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });

router.post("/addItem/:vendor_id/",upload.single('imageData'), async (req, res) => {
    try {
        const vendor_id = req.params.vendor_id
        const vendor = await Vendor.findOne({ _id: vendor_id })
        if (vendor) {
            const { itemName, isAvailable, inStock, price } = req.body;
            console.log(req.body);
                        if (!itemName || !price) {
                throw new Error("Insufficient Data!")
            }
            const new_item = new VendorItems({
                itemName,
                inStock: true,
                isAvailable: true,
                price,
                image: req.file.filename,
                vendor
            })
            console.log(req.file);
        const path = req.file.path.split('/').slice(1).join('/');
        console.log(path);
            const response = await new_item.save()
            return res.json({ result: "success", new_item})
        }
        else {
            throw new Error("Vendor not found")
        }
    }
    catch (err) {
        console.log("error: ", err)
        return res.status(400).json({ result: err })
    }})
module.exports = router;
