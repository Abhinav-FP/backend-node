const route = require("express").Router();

const productcontroller  =require("../controller/productcontroller");

route.post("/products",productcontroller.productadd);

route.get("/products",productcontroller.productGet)

route.put("/products/:id",productcontroller.productUpdate)

route.delete("/products/:id",productcontroller.productDelete)

module.exports =route;