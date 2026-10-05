const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();
const cors = require("cors")
const User = require("./models/User");

const app = express();

app.use(cors({
    origin :"http://127.0.0.1:3000"
}))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve your HTML/CSS/JS files
app.use(express.static(path.join(__dirname, "public")));

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// Receive login form data
app.post("/login", async (req, res) => {
  try {
    const { user, password } = req.body;
    // Save to MongoDB
    const newUser = await User.create({
      user,
      password
    });

    res.status(201).json({
      message: "Data stored successfully",
      id: newUser._id,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});