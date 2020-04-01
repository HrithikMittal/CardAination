var express = require("express");
var dotenv = require("dotenv").config();
var morgan = require("morgan");
var mongoose = require("mongoose");
var app = express();
var port = process.env.PORT;

var postRoutes = require("./routes/post");

mongoose
  .connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  .then(() => {
    console.log("Database is connected successfully");
  })
  .catch(err => {
    console.log("Error is ", err.message);
  });

app.use(morgan("dev"));
app.use("/", postRoutes);

app.listen(port, () => {
  console.log("Server is listening on PORT:", port);
});
