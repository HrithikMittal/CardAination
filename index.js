var express = require("express");
var dotenv = require("dotenv").config();
var morgan = require("morgan");
var app = express();
var port = process.env.PORT;

var postRoutes = require("./routes/post");

app.use(morgan("dev"));
app.use("/", postRoutes);

app.listen(port, () => {
  console.log("Server is listening on PORT:", port);
});
