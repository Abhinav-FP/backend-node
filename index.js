const express = require("express");
const app = express();
require('dotenv').config()
const mongoose = require('mongoose');
var bodyParser = require('body-parser')
var cors = require('cors')
const dotenv = require("dotenv");

dotenv.config();
app.use(cors());
app.use(express.json({ limit: "10mb" }));
//app.use(cors)
var session = require('express-session')
// const app = require('express')()
const URL =process.env.DATABASE_URL
//console.log("URL",URL)
const port = 8000;

mongoose
    .connect(URL)
    .then(console.log("Database Connected!"))
    .catch((err) => console.log(err));

const userurl =require("./routes/user")
app.use("/user",userurl);
const producturl =require("./routes/product")
app.use("/product",producturl);


// app.get("/", (req, res) => {
//   //console.log("Hello");
//   try {
//     res.json({
//       data: {
//         result: "Hello date",
//       },
//       msg: "success",
//       status: true,
//     });
//   } catch (error) {
//     console.log("error", error);
//     res.json({
//       error: error,
//       msg: "Not Show msg",
//       status: false,
//     });
//   }
// });
// app.post('/submit', (req, res) => {
//     res.send('POST request to the homepage')
//   })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
