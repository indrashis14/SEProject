const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require('cors');
const bcrypt = require("bcrypt");
const {check,validationResult }= require('express-validator');
const config=require('config');
const multer = require('multer');
require("dotenv").config();

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

app.set("view engine","ejs");
app.use(cors());
app.use((req, res, next) => {
    res.setHeader('Strict-Transport-Security', 'max-age=15768000');
    next();
  });

const users = require('./routes/api/users');
const vendorRoute = require('./routes/api/vendors');
const adminRoute = require('./routes/api/admin');


// Use Routes
app.use('/api/users', users);
app.use('/api/vendors', vendorRoute);
app.use('/admin', adminRoute);

const uri = config.get('dbURL');
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected!'))
    .catch(err => console.log('Error connecting to MongoDB:', err));
    

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



app.listen(process.env.PORT || 5000, () => { console.log("Connected") });