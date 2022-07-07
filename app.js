const express = require("express");
const router = require("./router/routes");
const path = require("path");
const app = express();
const port = 3000;
const host = "localhost";
const connectDB = require("./model/connectDB");

app.use("/public", express.static(path.join(__dirname, "./public")));

app.use("/shop", router.router);

app.use((req, res) => {
  res.send("<h1 style='color:tomato;'>404 Page not found </h1>");
});

app.listen(port, host, () => {
  console.log(`App is listening at http://${host}:${port}`);
});
