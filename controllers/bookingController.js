const { Booking } = require("../models/Booking");

const bookingController = {
  // ADD BOOKING
  addBooking: async (req, res) => {
    try {
      const newBooking = new Booking(req.body);
      const savedBooking = await newBooking.save();

      res.status(200).json(savedBooking);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // GET ALL BOOKING
  getAllBooking: async (req, res) => {
    try {
      const allBooking = await Booking.find();
      res.status(200).json(allBooking);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // GET AN BOOKING
  getAnBooking: async (req, res) => {
    try {
      const booking = await Booking.findById(req.params.id);
      res.status(200).json(booking);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // UPDATE BOOKING
  updateBooking: async (req, res) => {
    try {
      const booking = await Booking.findById(req.params.id);
      await booking.updateOne({ $set: req.body });
      res.status(200).json("Update successfully!");
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // DELETE BOOKING
  deleteBooking: async (req, res) => {
    try {
      await Booking.findByIdAndDelete(req.params.id);
      res.status(200).json("Delete successfully!");
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = bookingController;
