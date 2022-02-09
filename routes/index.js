var express = require("express");
const fsPromises = require("fs").promises;
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
router.get("/error", (req, res, next) => {
  next();
});
router.get("/one", (req, res, next) => {
  fsPromises
    .readFile("./one.txt") // arbitrary file
    .then((data) => res.send(data))
    .catch((err) => next(err)); // passing error to custom middleware
});

// router.use((error, req, res, next) => {
//   console.log("Error Handling Middleware called");
//   console.log("Path: ", req.path);
//   console.error("Error: ", error);

//   if (error.type == "redirect") res.redirect("/error");
//   else if (error.type == "time-out")
//     // arbitrary condition check
//     res.status(408).send(error);
//   else res.status(500).send(error);
// });

module.exports = router;
