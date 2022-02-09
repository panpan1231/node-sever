var express = require("express");
var router = express.Router();

/* GET users listing. */
const a = [1, 2, 3, 4];
router.get("/", function (req, res, next) {
  res.send(JSON.stringify({ a: a }));
});

router.post("/", express.json(), function (req, res, next) {
  res.send(JSON.stringify(req.body));
});

module.exports = router;
