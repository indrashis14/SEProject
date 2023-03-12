const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

// Create Schema
const UserSchema = new Schema({
  userName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  mobile: String
});

UserSchema.pre("save", async function (next) {
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

UserSchema.methods.comparePassword = async function (inputPassword) {
  try {
      return await bcrypt.compare(inputPassword, this.password)
  } catch (error) {
      throw new Error(error)
  }
}

module.exports = User = mongoose.model('users', UserSchema);
