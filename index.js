const express = require("express");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");

const app = express();
const PORT = 3000;

connectDB();
// user routes
app.use(express.json());
app.use("/api/v1", require("./routes/v1"));
app.use(errorHandler);

app.listen(PORT, (err) => {
  console.log("Express running on port " + PORT);
});
