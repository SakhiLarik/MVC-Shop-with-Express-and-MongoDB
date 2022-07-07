const mongoose = require("mongoose");
const cartSchema = mongoose.Schema(
  {
    u_name: {
      type: String,
      default: "Anonymous",
    },
    product: {
      p_id: {
        type: String,
        required: true,
      },
      p_name: {
        type: String,
        required: true,
      },
      p_price: {
        type: String,
        required: true,
      },
    },
  },
  { collection: "cart" }
);

module.exports = mongoose.model("cart", cartSchema);
