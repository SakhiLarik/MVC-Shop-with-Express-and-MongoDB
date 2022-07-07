const uuid = require("uuid");
const mongoose = require("mongoose");
const productSchema = mongoose.Schema(
  {
    p_id: {
      type: String,
      required: true,
      default: uuid.v4,
    },
    p_name: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    purchaseCounts: {
      type: Number,
      default:0
    },
  },
  { collection: "product" }
);

module.exports = mongoose.model("product", productSchema);
