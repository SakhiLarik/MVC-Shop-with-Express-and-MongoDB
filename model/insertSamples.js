const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");
const uuid = require("uuid");
const product = require("./product");
const cart = require("./cart");
const users = require("./users");

const url = "mongodb://localhost:27017/shop";
const connect = mongoose.connect(url, (err, con) => {
  if (err) throw err;
});

const data = fs.readFileSync(path.join(__dirname, "./products.json"), "utf-8");
// console.log(JSON.parse(data));

const createUser = async function () {
  try {
    const addUser = await users.insertMany(JSON.parse(data));
    console.log(addUser);
  } catch (error) {
    console.log(error);
  }
};

createUser().catch(console.error());

// mongoose.disconnect();
