const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require('cors');
const bcrypt = require("bcrypt");
const {check,validationResult }= require('express-validator');
const jwt=require('jsonwebtoken');
const config=require('config');
const auth =require('../server/middleware/auth');
const passport = require('passport');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const users = require('./routes/api/users');
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);

// Use Routes
app.use('/api/users', users);

const uri = config.get('dbURL');
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected!'))
    .catch(err => console.log('Error connecting to MongoDB:', err));
    
const User = require('../server/models/User');

const vendorSchema = new mongoose.Schema({
    userName: String,
    email: String,
    password: String,
    mobile: String
})

vendorSchema.pre("save", async function (next) {
    try {
        // Generate salt
        const salt = await bcrypt.genSalt(10)
        // Hash password
        const hashedPassword = await bcrypt.hash(this.password, salt)
        // Replace plain text password with hash
        this.password = hashedPassword
        next()
    } catch (error) {
        next(error)
    }
})

// Compare inputted password with hashed one


//const User = mongoose.model('User', UserSchema);
const Vendor = mongoose.model('Vendor', vendorSchema);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());


app.post('/student-signup',[check('userName','Please provide name').not().isEmpty() ,
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
    console.log(`Received user data: ${userName}, ${password}, ${email}, ${mobile}`);
    res.json({ message: 'User created successfully' });

  user.save()
    .then(() => console.log('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});


app.get("/auth",auth,async (req,res)=>res.send('Auth Route'));

app.post("/vendor/signup",[check('userName','Please provide name').not().isEmpty() ,
                            check('email','Please input valid email id').isEmail(),
                            check('password','Enter valid password').not().isEmpty(),
                            check('mobile','Enter valid number').isNumeric()], async (req, res) => {
    const { userName, email, password, mobile } = req.body;
    if (!userName || !email || !password || !mobile) {
        return res.status(400).json({ "result": "invalid data" })
    }
    const oldUser = await Vendor.findOne({ "$or": [{ userName: userName }, { email: email }, { mobile: mobile }] })
    if (oldUser) {
        // already user exists with this username
        return res.status(400).json({ "result": "user already exists" });
    }
    const vuser = new Vendor({
        userName,
        email,
        password,
        mobile
    })
    vuser.save().then((item) => { console.log(`data saved successfully ${item}`); res.json({ "result": "success" }) }).catch(err => { console.log(err); res.status(400).json({ "result": "bad request" }) })
})
//vendor login check
app.post("/vendor/login",[check('userName','Please provide name').not().isEmpty(),
check('password','Please provide password')
], async (req, res) => {
    const { userName, password } = req.body;
    if (!userName || !password) {
        return res.status(400).json({ "result": "invalid data" });
    }
    const user = await Vendor.findOne({ userName: userName })
    if (user) {
        bcrypt.compare(password, user.password, function (error, result) {
            if (error) {
                console.error(error)
            }
            if (result) {
                console.log("Passwords match!")
                res.json('User logged in!')
            }
            else {
                console.log("Passwords don't match!")
                res.status(400).json('Error: password mismatch')
            }
        })
    }
})
//admin password check
app.post("/admin", async (req, res) => {
    const { userName, password } = req.body;
    if (!userName || !password) {
        return res.status(400).json({ "result": "invalid data" });
    }
    if (userName === 'admin' && password === 'admin') {
        // If the credentials are correct, send a success response
        res.status(200).json({ message: 'Login successful' });
      } else {
        // If the credentials are incorrect, send an error response
        res.status(401).json({ message: 'Invalid username or password' });
      }
})
app.listen(5000, () => { console.log("Server listening on port 5000") })