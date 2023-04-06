const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");



const vendorSchema = new mongoose.Schema({
    userName: String,
    storeName: String,
    email: String,
    password: String,
    mobile: String
})
//vendor item schema

// vendorItemsSchema.index({ "itemName": 1, "vendor": 1 }, { "unique": true })


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
module.exports= Vendor = mongoose.model('Vendor', vendorSchema);
