const Router = require("express").Router();

Router.use("/test", (req, res, next) => {
  res.status(200).json({
    status: "success",
    message: "Welcome to the Server-side  user router 🤘🏿",
  });
});

module.exports = Router;
