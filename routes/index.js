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

const cb0 = function (req, res, next) {
  console.log('CB0')
  next()
}

const cb1 = function (req, res, next) {
  console.log('CB1')
  next()
}

const cb2 = function (req, res) {
  res.send('Hello from C!')
}

router.get('/example/c', [cb0, cb1, cb2])

router.get('/example/d', [cb0, cb1], (req, res, next) => {
  console.log('the response will be sent by the next function ...')
  next()
}, (req, res) => {
  res.download(`${__dirname}/report-12345.txt`)
})

const requestTime = function (req, res, next) {
  req.requestTime = Date.now()
  next()
}

router.use(requestTime)

router.get('/time', (req, res) => {
  let responseText = 'Hello World!<br>'
  responseText += `<small>Requested at: ${req.requestTime}</small>`
  res.send(responseText)
})
router.get('/user/:id', (req, res, next) => {
  // if the user ID is 0, skip to the next route
  if (req.params.id === '0') next('route')
  // otherwise pass the control to the next middleware function in this stack
  else next()
}, (req, res, next) => {
  // send a regular response
  res.send('regular')
})

// handler for the /user/:id path, which sends a special response
router.get('/user/:id', (req, res, next) => {
  res.send('special')
})

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
