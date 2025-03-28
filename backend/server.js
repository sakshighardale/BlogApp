const app = require("./app"); // Import the Express app
const PORT = process.env.PORT || 5000; // Set the port to either environment variable or 5000

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// const express = require("express");
// const app = express();

// // Middleware
// app.use(express.json()); // Body parser middleware

// // Simple POST route
// app.post("/test", (req, res) => {
//   console.log("Request Body:", req.body); // Check body
//   res.json({ message: "Received your data!" });
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });
