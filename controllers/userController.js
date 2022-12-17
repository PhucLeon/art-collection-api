const { User, Art } = require("../models/User");

const userController = {
  // ADD USER
  addUser: async (req, res) => {
    try {
      const newUser = new User(req.body);
      const savedUser = await newUser.save();
      res.status(200).json(savedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // GET ALL USERS
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // GET AN USER
  getAnUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.id).populate("collections");
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // UPDATE USER
  updateUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      await user.updateOne({ $set: req.body });
      res.status(200).json("Update successfully!");
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // DELETE USER
  deleteUser: async (req, res) => {
    try {
      await Art.updateMany({ user: req.params.id }, { user: null });
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("Delete Successfully!");
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = userController;
