const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const postRoutes = require("./routes/postRoutes");

dotenv.config();

const app = express();

// Middleware
app.use(cors());

// This middleware is responsible for parsing incoming JSON requests.
app.use(express.json()); // Make sure this comes before routes

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// Routes
app.use("/api", postRoutes);

// Default Route
app.get("/", (req, res) => {
  res.send("Welcome to the Blog API!");
});

module.exports = app;
