var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var Database = require("./database");
Database.connect()
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var cors = require('cors');
var helmet = require('helmet');

var app = express();
// app.use((error, req, res, next) => {
//   console.log("Error Handling Middleware called");
//   console.log("Path: ", req.path);
//   next(); // (optional) invoking next middleware
// });
app.use(cors());
app.use(helmet());
app.use(logger("dev"));
app.use((req, res, next) => {
  console.log("Check Token,  Path: ", req.path);
  next(); // calling next middleware function or handler
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

app.use((error, req, res, next) => {
  res.status(500).json({ message: error.message || error });
});
module.exports = app;
