const mongoose = require("mongoose");

const userschema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: [6, "Password must be at least 6 characters long"],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isblocked: {
    type: Boolean,
    default: false,
  },
});

const usermodel = mongoose.model("userdata", userschema);
module.exports = usermodel;
