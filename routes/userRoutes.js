const User = require("../models/user");
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const Router = require("express").Router();

Router.put("/:id", verifyTokenAndAuthorization, async (req, res, next) => {
  try {
    if (req.body.password) {
      req.body.password = cryptoJS.AES.encrypt(
        req.body.password,
        process.env.PASS_HASH_KEY
      ).toString();
    }

    const update = req.body;
    const doc = await User.findByIdAndUpdate(req.params.id, update, {
      new: true,
    });

    res.status(200).json({
      status: "success",
      message: "Welcome to the Server-side  user router 🤘🏿",
      doc,
    });
  } catch (error) {
    console.log(error);
  }
});

//DELETE
Router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(204).json("User has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER
Router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL USER
Router.get("/", verifyTokenAndAdmin, async (req, res) => {
  const query = req.query.new;
  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET User STATS
Router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
  try {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
    console.log(lastYear);
    const users = await User.aggregate([
      {
        $match: { createdAt: { $gte: lastYear } },
      },
      { $project: { month: { $month: "$createdAt" } } },
      { $group: { _id: "$month", total: { $sum: 1 } } },
    ]);
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = Router;
