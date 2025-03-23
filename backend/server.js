const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
//Middleware
app.use(express.json());

//basic route
app.get("/", (req, res) => {
  res.send("Welcome to ViewSta");
});
//start server
app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
