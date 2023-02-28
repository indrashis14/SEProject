const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require('cors');

mongoose.connect('mongodb+srv://indrashis14:indrashis2001@cluster.zcs5g1j.mongodb.net/?retryWrites=true&w=majority',{ useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
  userName: String,
  email: String,
  password: String,
  mobile: String
});

const User = mongoose.model('User', userSchema);

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());


app.post('/student-signup', (req, res) => {
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
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

app.listen(5000, ()=>{console.log("Server listening on port 5000")})