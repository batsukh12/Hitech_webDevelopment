const express = require("express");
const app = express();
const PORT = 3000;
const connectDB = require("./config/db");
const userRoutes = require("./routes/user-routes");

connectDB();

app.use(express.json());
app.use("/api/v1/auth", userRoutes);

app.listen(PORT, (err) => {
  console.log("Express running on port " + PORT);
});
