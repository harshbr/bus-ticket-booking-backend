const mongoose = require("mongoose");

const bookingschema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  busid: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  from: {
    type: String,
    required: true,
  },
  to: { type: String, required: true },
  departure: {
    type: String,
    required: true,
  },
  arrival: {
    type: String,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  userseat: {
    type: Array,
    required: true,
  },
  status: {
    type: String,
    default: "booked",
  },
});
const bookingmodel = mongoose.model("bookingtable", bookingschema);

module.exports = bookingmodel;
