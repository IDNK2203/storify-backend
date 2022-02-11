const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      required: true,
      unique: true,
      type: String,
    },
    description: {
      required: true,
      type: String,
    },
    img: {
      required: true,
      type: String,
    },
    categories: {
      type: [String],
    },
    size: {
      type: String,
    },
    color: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("product", productSchema);
