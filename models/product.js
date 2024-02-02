const mongoose = require("mongoose");

const productschema = mongoose.Schema({
  //userId:Number,
  name:String,
  price: Number,
  description:String,
  rating: Number,
  discount: Number,
  brand: String,
  link: String,
  stock: {type:String, default:"In-Stock"},
  emi: Number,
  model: String,
});

module.exports = mongoose.model("product", productschema);
