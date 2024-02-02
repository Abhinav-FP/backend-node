const mongoose = require("mongoose");

const userschema = mongoose.Schema({
  userId:Number,
  name: {type:String, required: [true, 'Please enter your Name']},
  email: {type:String, required: [true, 'Please enter your email']},
  userName: {type:String, required: [true, 'Please enter your userName']},
  number: Number,
  age: Number,
  dob: String,
  password: {type:String, required: [true, 'Please enter your Password']},
  confirmPassword: String,
  role: {type:String, default:"active"}
});

module.exports = mongoose.model("user", userschema);
