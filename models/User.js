const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    gmail: {
      type: String,
      require: true,
    },
    admin: {
      type: Boolean,
      default: false,
    },
    collections: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Art",
      },
    ],
  },
  { timestamps: true }
);

const artSchema = new mongoose.Schema({
  image: {
    type: String,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});


let User = mongoose.model("User", userSchema);
let Art = mongoose.model("Art", artSchema);
module.exports = { User, Art };
