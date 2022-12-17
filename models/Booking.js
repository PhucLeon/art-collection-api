const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema({
  customerName: {
    type: String,
    require: true,
  },
  customerRequirement: {
    type: String,
    require: true,
  },
  customerGmail: {
    type: String,
    require: true,
  },
  customerPhone: {
    type: String,
    require: true,
  },
});

let Booking = mongoose.model("Booking", bookingSchema);
module.exports = { Booking };
