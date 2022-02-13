const Order = require("../models/order");
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
  verifyToken,
} = require("./verifyToken");

const router = require("express").Router();

// create
router.post("/", verifyToken, async (req, res) => {
  const newOrder = new Order(req.body);
  try {
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(204).json("Order has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update Order
router.put("/:id", verifyTokenAndAuthorization, async (req, res, next) => {
  try {
    const update = req.body;
    const doc = await Order.findByIdAndUpdate(req.params.id, update, {
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
//GET a single Order
router.get("/find/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const Order = await Order.findOne({ userId: req.params.id });
    res.status(200).json(Order);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get all Orders  & filter
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    let Orders = await Order.find();
    res.status(200).json(Orders);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/income", verifyTokenAndAdmin, async (req, res) => {
  try {
    // task get totals sum of order per months for the last two months
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(date.setMonth(lastMonth.getMonth() - 1));
    let Orders = await Order.aggregate([
      { $match: { createdAt: { $gt: previousMonth } } },
      { $project: { month: { $month: "$createdAt" }, sales: "$amount" } },
      { $group: { _id: "$month", total: { $sum: "$sales" } } },
    ]);
    res.status(200).json(Orders);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
