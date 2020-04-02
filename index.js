var express = require("express");
var dotenv = require("dotenv");
var morgan = require("morgan");
var mongoose = require("mongoose");
var bodyparser = require("body-parser");
var expressValidator = require("express-validator");
var cookieParser = require("cookie-parser");
var cors = require("cors");
var app = express();
dotenv.config();
var port = process.env.PORT;

var postRoutes = require("./routes/post");
var authRoutes = require("./routes/auth");
var userRoutes = require("./routes/user");
var data = require("./home.json");

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

app.use(bodyparser.json());
// app.use(bodyparser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(cors());

app.get("/", (req, res) => {
  res.send(data);
});

app.use("/post", postRoutes);
app.use("/", authRoutes);
app.use("/", userRoutes);

app.use(function(err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ message: "You are not authorized" });
  }
});

app.listen(port, () => {
  console.log("Server is listening on PORT:", port);
});
