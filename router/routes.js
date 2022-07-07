const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cart = require("../model/cart");
const product = require("../model/product");
const users = require("../model/users");
const uuid = require("uuid");
var user = "";
var pass = "";

const router = express.Router();

const jsonParser = bodyParser.json();
const urlEncoded = bodyParser.urlencoded({ extended: false });

router.use("/public", express.static(path.join(__dirname, "../public")));

router.get("/cart", async (req, res) => {
  const getCart = await cart.find();
  if (getCart.length > 0) res.json(getCart);
  else res.send("<h1>Cart is empty</h1>");
});

router.get("/cart/:id", async (req, res) => {
  const id = req.params.id;
  const getCart = await cart.findById({ _id: id });
  res.json(getCart);
});

router.get("/addtocart", urlEncoded, async (req, res) => {
  let p_name = req.query.p_name;
  let p_id = req.query.p_id;
  let price = req.query.price;
  let username = req.query.user;
  let findInCart = await cart.findOne({
    u_name: username,
    product: {
      p_id: p_id,
      p_name: p_name,
      p_price: price,
    },
  });
  if (findInCart == null) {
    let createCart = await cart.create({
      u_name: username,
      product: {
        p_id: p_id,
        p_name: p_name,
        p_price: price,
      },
    });
    res.send("added");
  } else {
    res.send("already exist");
  }
});

// router.delete("/cart/", async (req, res) => {
//   const query = req.query;
//   // const u_id = query.u_id;
//   // const p_id = query.p_id;
//   const deleteCount = query.delete;
//   if (deleteCount != 1) {
//     let deletedManyQuery = await cart.find({
//       u_id: String(query.u_id),
//       product: { p_id: String(query.p_id )},
//     });
//     res.json(deletedManyQuery);
//   } else {
//     let deletedSingleQuery = await cart.deleteOne({
//       u_id: u_id,
//       product: { p_id: p_id },
//     });
//     res.json({deletedOne:{query}});
//   }
// });

router.delete("/cart/:id", async (req, res) => {
  const id = req.params.id;
  const deleteCart = await cart.deleteOne({ _id: id });
  res.json(deleteCart.deletedCount);
});

router.get("/users/", async (req, res) => {
  const getUsers = await users.find();
  res.json(getUsers);
});

router.get("/users/:id", async (req, res) => {
  const id = req.params.id;
  const getUser = await users.findById({ _id: id });
  res.json(getUser);
});

router.delete("/users/:id", async (req, res) => {
  const id = req.params.id;
  const deleteUser = await users.deleteOne({ _id: id });
  res.json(deleteUser);
});

router.get("/product/", async (req, res) => {
  const getProducts = await product.find();
  res.json(getProducts);
});

router.get("/product/:id", async (req, res) => {
  const id = req.params.id;
  const getProducts = await product.findById({ _id: id });
  res.json(getProducts);
});

// router.delete("/product/:id",async(req,res)=>{
//   const id = req.params.id;
//   const deleteProducts = await product.deleteOne({_id:id});
//   res.json(deleteProducts);
// });

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../view", "index.html"));
});

router.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "../view", "login.html"));
});

router.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "../view", "register.html"));
});

router.post("/login", urlEncoded, async (req, res) => {
  const u_name = req.body.u_name;
  const password = req.body.password;
  const findUser = await users.find({ u_name: u_name, password: password });
  if (findUser.length != 1) {
    user = "";
    pass = "";
    res.redirect("/shop/login");
  } else {
    user = u_name;
    pass = password;
    res.redirect("/shop");
  }
});

router.post("/register", urlEncoded, async (req, res) => {
  const u_name = req.body.u_name;
  const password = req.body.password;
  const name = req.body.name;
  const email = req.body.email;
  const findUser = await users.find({ u_name: u_name, password: password });
  if (findUser.length != 1) {
    user = u_name;
    pass = password;
    const createUser = await users.create({
      u_id: uuid.v4(),
      name: name,
      password: password,
      user_name: u_name,
      email: email,
    });
    res.redirect("/shop");
  } else {
    user = u_name;
    pass = password;
    res.redirect("/shop");
  }
});

router.get("/loginCheck", (req, res) => {
  const userName = user;
  const Password = pass;
  res.json({ username: userName, password: Password });
});

router.get("/logout", (req, res) => {
  user = "";
  pass = "";
  const userName = user;
  const Password = pass;
  res.redirect("/shop");
  res.json({ username: userName, password: Password });
});

router.use((req, res) => {
  res.send("<h1 style='color:tomato;'>404 Page not found </h1>");
});
module.exports = { router };
