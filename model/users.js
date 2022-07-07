const uuid = require("uuid");
const mongoose = require("mongoose");
const usersSchema = mongoose.Schema(
  {
    u_id: {
      type: String,
      required: true,
      default: uuid.v4,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    user_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  { collection: "users" }
);

module.exports = mongoose.model("users", usersSchema);
