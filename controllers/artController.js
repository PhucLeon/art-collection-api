const { User, Art } = require("../models/User");

const artController = {
  // ADD ART
  addArt: async (req, res) => {
    try {
      const newArt = new Art(req.body);
      const savedArt = await newArt.save();
      if (req.body.user) {
        const user = User.findById(req.body.user);
        await user.updateOne({ $push: { collections: savedArt._id } });
      }
      res.status(200).json(savedArt);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // GET ALL ART
  getAllArts: async (req, res) => {
    try {
      const allArts = await Art.find().populate("user");
      res.status(200).json(allArts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // GET AN ART
  getAnArt: async (req, res) => {
    try {
      const art = await Art.findById(req.params.id).populate("user");
      res.status(200).json(art);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // UPDATE ART
  updateArt: async (req, res) => {
    try {
      const art = await Art.findById(req.params.id);
      await art.updateOne({ $set: req.body });
      res.status(200).json("Update successfully!");
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // DELETE ART
  deleteArt: async (req, res) => {
    try {
      await User.updateMany(
        { collections: req.params.id },
        { $pull: { collections: req.params.id } }
      );
      await Art.findByIdAndDelete(req.params.id);
      res.status(200).json("Delete successfully!");
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = artController;
