const router = require("express").Router();
router.post("/verify", (req, res) => {
  console.log("OTP VERIFY");
  return res.send({
    message: "succss",
  });
});
module.exports = router;
