const route = require("express").Router();

const usercontroller  =require("../controller/usercontroller");

route.post("/users",usercontroller.useradd);

route.get("/users",usercontroller.userGet)

//Get Data sorted by age
route.get("/users/data",usercontroller.userNameSorted)

//User Login
route.post("/users/login",usercontroller.userLogin)

route.put("/users/:fname",usercontroller.userUpdate)

route.delete("/users/:id",usercontroller.userDelete)


module.exports =route;