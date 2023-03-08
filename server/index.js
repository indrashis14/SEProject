const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require('cors');
const bcrypt = require("bcrypt")

mongoose.connect('mongodb+srv://indrashis14:indrashis2001@cluster.zcs5g1j.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

//make a new user schema for the user signup details
const userSchema = new mongoose.Schema({
    userName: String,
    email: String,
    password: String,
    mobile: String
});
const vendorSchema = new mongoose.Schema({
    userName: String,
    email: String,
    password: String,
    mobile: String
})



// Hash password before saving
userSchema.pre("save", async function (next) {
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
userSchema.methods.comparePassword = async function (inputPassword) {
    try {
        return await bcrypt.compare(inputPassword, this.password)
    } catch (error) {
        throw new Error(error)
    }
}

const User = mongoose.model('User', userSchema);
const Vendor = mongoose.model('Vendor', vendorSchema);
app.use(bodyParser.urlencoded({ extended: true }));
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
    .then(() => console.log('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});



app.post('/student-login', (req, res) => {

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
            // Compare passwords using bcrypt
            bcrypt.compare(password2, user.password, function (error, result) {
                // If error, handle it
                if (error) {
                    console.error(error)
                }
                // If result is true, passwords match
                if (result) {
                    console.log("Passwords match!")
                    res.json('User logged in!')


                }
                // If result is false, passwords don't match
                else {
                    console.log("Passwords don't match!")
                    res.status(400).json('Error: password mismatch')
                }
            })
        }
        // If user is not found
        else {
            console.log("User not found!")
        }
    })


});

app.post("/vendor/signup", async (req, res) => {
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
app.post("/vendor/login", async (req, res) => {
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
app.listen(5000, () => { console.log("Server listening on port 5000") })