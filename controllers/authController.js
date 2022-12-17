const { User } = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


let refreshTokens = [];

const authController = {
  // REGISTER
  registerUser: async (req, res) => {
    try {
      // HASH PASSWORD
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.password, salt);
      // CREATE NEW ACCOUNT
      const newUser = await new User({
        username: req.body.username,
        gmail: req.body.gmail,
        password: hashed,
        collections: [],
      });

      // SAVE TO DB
      const user = await newUser.save();
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // GENERATE ACCESS TOKEN
  generateAccessToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        admin: user.admin,
      },
      process.env.JWT_ACCESS_KEY,
      {
        expiresIn: "2d",
      }
    );
  },

  // GENERATE REFRESH TOKEN
  generateRefreshToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        admin: user.admin,
      },
      process.env.JWT_REFRESH_KEY,
      { expiresIn: "365d" }
    );
  },

  loginUser: async (req, res) => {
    try {
      const user = await User.findOne({ username: req.body.username }).populate(
        "collections"
      );
      if (!user) {
        return res.status(404).json("Wrong username!");
      }

      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (!validPassword) {
        return res.status(404).json("Wrong password!");
      }

      if (user && validPassword) {
        const accessToken = authController.generateAccessToken(user);
        const refreshToken = authController.generateRefreshToken(user);
        // TESTING GENERATE TOKEN IS SUCCESS
        console.log(refreshToken); // Get Success

        refreshTokens.push(refreshToken);

        //STORE REFRESH TOKEN IN COOKIE
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: false,
          path: "/",
          sameSite:"strict",
        });

        // GET COOKIE
        // const testCookie = req.cookies.refreshToken;

        // console.log(testCookie);

        const { password, ...others } = user._doc;
        res.status(200).json({ ...others, accessToken, refreshToken });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  requestRefreshToken: async (req, res) => {
    // Take refresh token from user
    const refreshToken = req.cookies.refreshToken;
    console.log("xxxxx: "+ refreshToken);


    if (!refreshToken) return res.status(401).json("You're not authenticatedddddd!");
    if (!refreshTokens.includes(refreshToken)) {
      return res.status(403).json("Refresh token is not valid!");
    }

    jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
      if (err) {
        console.log(err);
      }

      refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
      // Create new accessToken, refreshToken
      const newAccessToken = authController.generateAccessToken(user);
      const newRefreshToken = authController.generateRefreshToken(user);
      refreshTokens.push(newRefreshToken);

      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite:"strict",
      });
      res.status(200).json({ accessToken: newAccessToken });
    });
  },

  userLogout: async (req, res) => {
    res.clearCookie("refreshToken");
    refreshTokens = refreshTokens.filter(
      (token) => token !== req.cookies.refreshToken
    );
    res.status(200).json("Logged out!");
  },
};

module.exports = authController;
