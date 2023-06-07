const express = require("express");
const app = express();
const PORT = 3000;
const connectDB = require("./config/db");
const userRoutes = require("./routes/user-routes");
const errorHandler = require("./middleware/error");

app.get("/", (req, res, next) => {
  try {
    throw new Error("Aldaa garlaa");
  } catch (err) {
    next(err);
  }
});

app.use(errorHandler);

connectDB();


app.use(express.json());
app.use("/api/v1/auth", userRoutes);

app.listen(PORT, (err) => {
  console.log("Express running on port " + PORT);
});
