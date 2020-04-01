var express = require("express");
var dotenv = require("dotenv").config();
var app = express();
var port = process.env.PORT;

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Commuincation" });
});

app.listen(port, () => {
  console.log("Server is listening on PORT:", port);
});
