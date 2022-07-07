const mongoose = require("mongoose");
const url = "mongodb://localhost:27017/shop";
const connect = mongoose.connect(url, (err, connected) => {
  if (err) throw err;
  // console.log(`Connected to MongoDB ${connected.name} database : `);
  // console.log("Database at : "+connected._connectionString);
});

module.exports = { connect };
