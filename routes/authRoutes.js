const Router = require("express").Router();
const User = require("../models/user");
const cryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

const createToken = async (userID, isAdmin) => {
  const token = await jwt.sign(
    {
      userID,
      isAdmin,
    },
    process.env.JWT_KEY,
    { expiresIn: "3d" }
  );
  return token;
};

Router.post("/register", async (req, res, next) => {
  try {
    const hpw = cryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_HASH_KEY
    ).toString();
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: hpw,
    });

    const token = await createToken(user.id, user.isAdmin);
    user.password = undefined;
    res.status(200).json({
      status: "success",
      message: "Welcome to the Server-side  auth router 🤘🏿",
      data: user,
      token,
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: "An Error Ocurred",
    });
  }
});
Router.post("/login", async (req, res, next) => {
  try {
    if (!req.body.password || !req.body.username) {
      return res.status(401).json("missing credentials");
    }
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(401).json("incorrect credentials");
    }
    const bytes = cryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_HASH_KEY
    );
    const originalText = bytes.toString(cryptoJS.enc.Utf8);
    if (originalText !== req.body.password) {
      return res.status(401).json("incorrect credentials");
    }
    user.password = undefined;
    const token = await createToken(user.id, user.isAdmin);
    res.status(200).json({
      status: "success",
      message: "You have been logged in🤘🏿",
      data: user,
      token,
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: "An Error Ocurred",
    });
  }
});

module.exports = Router;
