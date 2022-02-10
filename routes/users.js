var express = require("express");
var router = express.Router();
var UserModel = require("../models/user/user.model");

/* GET users listing. */
router.get("/", async (req, res, next) => {
  console.log("req:", req.query);
  const documents = await UserModel.find({ username: req.query.username });
  res.send(documents);
});

router.post("/", express.json(), async (req, res, next) => {
  const { username, email } = req.body;
  const user = new UserModel({ username, email });
  try {
    const data = await user.save();
    if (data) {
      res.send(data);
    }
  } catch (e) {
    next(e);
  }
});

router.patch("/:id", express.json(), async (req, res, next) => {
  try {
    console.log("req.params.id", req.params.id);
    const options = {
      new: true,
      runValidators: true,
    };
    const document = await UserModel.findByIdAndUpdate(
      req.params.id,
      { username: req.body.username },
      options
    );
    res.send(document);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", express.json(), async (req, res, next) => {
  try {
    const document = await UserModel.findByIdAndRemove(req.params.id);
    res.send(document);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
