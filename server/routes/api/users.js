const express = require('express');
const router = express.Router();
//const gravatar = require('gravatar');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');
const {check,validationResult }= require('express-validator');
const config=require('config');



// Load User model
const User = require('../../models/User');

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

  
  

//   User.findOne({ email: req.body.email }).then(user => {
//     if (user) {
      
//       return res.status(400).json('Email already exists');
//     } else {
//       const newUser = new User({
//         userName: req.body.name,
//         email: req.body.email,
//         password: req.body.password,
//         mobile:req.body.mobile
//       });

//       bcrypt.genSalt(10, (err, salt) => {
//         bcrypt.hash(newUser.password, salt, (err, hash) => {
//           if (err) throw err;
//           newUser.password = hash;
//           newUser
//             .save()
//             .then(user => res.json(user))
//             .catch(err => console.log(err));
//         });
//       });
//     }
//   });
// });

// @route   GET api/users/login
// @desc    Login User / Returning JWT Token
// @access  Public
router.post('/login',[check('userName','Please provide name').not().isEmpty(),
  check('password','Please provide password')
  ], (req, res) => {

const errors=validationResult(req);
if(!errors.isEmpty()){
return res.status(400).json({errors:errors.array()});
}
const userName2 = req.body.userName;
const password2 = req.body.password;

//let user = new User();

// Find user by email
User.findOne({ userName: userName2 }, function (error, user) {
// If error, handle it
if (error) {
console.error(error)
}
// If user is found
if (user) {
  //console.log('user found via api');
// Compare passwords using bcrypt
bcrypt.compare(password2, user.password, function (error, result) {
// If error, handle it
if (error) {
console.error(error)
}
// If result is true, passwords match
if (result) {
console.log("Passwords match!");
//res.json('User logged in!');
const payload={
user:{
  id:user.id
}
}

jwt.sign(payload,config.get('jwtsecret'),{expiresIn:360000},(err,token)=>{
if(err) throw err;
res.json({token});
})


}
// If result is false, passwords don't match
else {
console.log("Passwords don't match!");
return res.status(400).write('Error: password mismatch');
}
})


}
// If user is not found
else {
console.log("User not found!")
}
})


});
  

//   const userName2 = req.body.userName;
//   const password2 = req.body.password;

//   // Find user by userName
//   User.findOne({ userName2 }).then(user => {
//     // Check for user
//     if (!user) {
      
//       return res.status(404).json('User not found');
//     }

//     // Check Password
//     bcrypt.compare(password2, user.password).then(isMatch => {
//       if (isMatch) {
//         // User Matched
//         const payload = { id: user.id, name: user.userName }; // Create JWT Payload

//         // Sign Token
//         jwt.sign(
//           payload,
//           keys.secretOrKey,
//           { expiresIn: 3600 },
//           (err, token) => {
//             res.json({
//               success: true,
//               token: 'Bearer ' + token
//             });
//           }
//         );
//       } else {
       
//         return res.status(400).json('Password incorrect');
//       }
//     }).catch(err => res.status(400).json('Error: ' + err));
//   });
// });

// @route   GET api/users/current
// @desc    Return current user
// @access  Private
router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);

module.exports = router;
