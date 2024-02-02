const user = require("../models/user");

exports.useradd = async (req, res) => {
  try {
    const {
      name,
      email,
      userName,
      number,
      age,
      dob,
      password,
      confirmPassword,
    } = req.body;
    const lastuserid = await user.findOne({}, "userId").sort({ userId: -1 });
    //console.log("Last User id", lastuserid);
    const newUserId = lastuserid ? lastuserid.userId + 1 : 1;
    //console.log("newUserIdd", newUserId);
    if (password != confirmPassword) {
      throw "Passwords do not match";
    }
    const finder = await user.findOne({ userName: userName });
    //console.log(finder);
    if (finder != null) {
      throw "Username already exists";
    }

    const result = new user({
      userId: newUserId,
      name: name,
      email: email,
      userName: userName,
      number: number,
      age: age,
      dob: dob,
      password: password,
      confirmPassword: confirmPassword,
    });
    const record = await result.save();
    res.json({
      data: record,
      msg: "data added ",
      status: 200,
    });
  } catch (error) {
    res.json({
      error: error,
      status: 500,
      msg: "User not added",
    });
  }
};

exports.userGet = async (req, res) => {
  try {
    const users = await user.find({});
    // console.log(users);
    res.json({
      data: users,
      msg: "data get ",
      status: 200,
    });
  } catch (error) {
    //console.error(error);
    res.json({ error: error, msg: "not found ", status: 500 });
  }
};

exports.userUpdate = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, lname, age } = req.body;
    const newData = await user.findByIdAndUpdate(
      id,
      { name: name, lname: lname, age: age },
      { new: true }
    );
    //console.log("Data",newData);
    res.json({
      data: newData,
    });
  } catch (error) {
    //console.error(error);
    res.json({ error: error, msg: "not updated ", status: 500 });
  }
};

exports.userDelete = async (req, res) => {
  try {
    const id = req.params.id;
    const userDel = await user.findByIdAndDelete(id);
    //console.log("Data",userDel);
    res.json({
      data: userDel,
    });
  } catch (error) {
    //console.error(error);
    res.json({ error: error, msg: "not deleted ", status: 500 });
  }
};

exports.userNameSorted = async (req, res) => {
  try {
    const sortData = await user.aggregate([
      {
        $sort: { age: 1 },
      },
      {
        $project: {
          name: 1,
          //"lname":1,
          age: 1,
        },
      },
      {
        $limit: 2,
      },
      // {
      //   $count: "Saara Data"
      // }
    ]);
    res.json({
      data: sortData,
    });
  } catch (error) {
    //console.error(error);
    res.json({ error: error, msg: "Query Failed ", status: 500 });
  }
};

exports.userLogin = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    const finder = await user.findOne({
      userName: userName,
      email: email,
      password: password,
    });
    // console.log(finder);
    if (finder == null) {
      throw "Invalid Details";
    }
    // const users = await user.find({});
    // const result = users.find((item) => item.name === name);
    // if (typeof result === "undefined") {
    //   throw "Invalid First Name";
    // }
    // if (result.password != password) {
    //   throw "Invalid Password";
    // }
    res.json({
      msg: "Login Successful",
      status: 200,
    });
  } catch (error) {
    res.json({ error: error, msg: "Login Failed ", status: 404 });
  }
};
