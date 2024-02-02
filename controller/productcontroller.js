const product = require("../models/product");

exports.productadd = async (req, res) => {
  try {
    const {
      name,
      price,
      description,
      rating,
      discount,
      brand,
      link,
      //stock,
      emi,
      model,
    } = req.body;
    const finder = await product.findOne({ model: model });
    if (finder != null) {
      throw "Model already exists";
    }
    const result = new product({
      //userId: newUserId,
      name: name,
      price: price,
      description: description,
      rating: rating,
      discount: discount,
      brand: brand,
      link: link,
      //   stock:stock,
      emi: emi,
      model: model,
    });
    const record = await result.save();
    res.json({
      data: record,
      msg: "Product added ",
      status: 200,
    });
  } catch (error) {
    res.json({
      error: error,
      status: 500,
      msg: "Product not added",
    });
  }
};

exports.productGet = async (req, res) => {
  try {
    const users = await product.find({});
    // console.log(users);
    res.json({
      data: users,
      msg: "Data Retrieved Successfully",
      status: 200,
    });
  } catch (error) {
    //console.error(error);
    res.json({ error: error, msg: "not found ", status: 500 });
  }
};

exports.productUpdate = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, model, price } = req.body;
    const newData = await product.findByIdAndUpdate(
      id,
      { name: name, model: model, price: price },
      { new: true }
    );
    //console.log("Data",newData);
    res.json({
      data: newData,
      msg: "Details Updated",
    });
  } catch (error) {
    //console.error(error);
    res.json({ error: error, msg: "not updated ", status: 500 });
  }
};

exports.productDelete = async (req, res) => {
    try {
      const id = req.params.id;
      const userDel = await product.findByIdAndDelete(id);
      //console.log("Data",userDel);
      res.json({
        data: userDel,
      });
    } catch (error) {
      //console.error(error);
      res.json({ error: error, msg: "not deleted ", status: 500 });
    }
  };