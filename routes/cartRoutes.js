const Cart = require("../models/cart");
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
  verifyToken,
} = require("./verifyToken");

const router = require("express").Router();

// create
router.post("/", verifyToken, async (req, res) => {
  const newCart = new Cart(req.body);
  try {
    const savedCart = await newCart.save();
    res.status(200).json(savedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(204).json("Cart has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update Cart
router.put("/:id", verifyTokenAndAuthorization, async (req, res, next) => {
  try {
    const update = req.body;
    const doc = await Cart.findByIdAndUpdate(req.params.id, update, {
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
//GET a single Cart
router.get("/find/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.id });
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get all Carts  & filter
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    let carts = await Cart.find();
    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
