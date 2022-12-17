// FOR LIBRARY IMPORT
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");


const PORT = process.env.PORT;
// FOR ROUTER IMPORT
const userRoute = require("./routes/user");
const artRoute = require("./routes/art");
const bookingRoute = require("./routes/booking");
const authRoute = require("./routes/auth");

// SET UP
dotenv.config();
const app = express();

// Connected to MongoDB
mongoose.connect(process.env.MONGODB_URL, () => {
  console.log("Connected to MongoDB!");
});

app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 5000,
  })
);

// app.get("/", function (req, res) {
//   res.cookie("refreshToken", "xxxx", {
//     httpOnly: true,
//     secure: true,
//     path: "/",
//     sameSite: "strict",
    
//   });

//   res.send("Hello!!");
// });

app.use("/v1/user", userRoute);
app.use("/v1/art", artRoute);
app.use("/v1/booking", bookingRoute);
app.use("/v1/auth", authRoute);


app.listen(PORT || 8000, () => {
  console.log("Server is running...");
});
