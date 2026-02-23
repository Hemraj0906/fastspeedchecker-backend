const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  req.on("data", () => {});
  req.on("end", () => {
    res.status(200).send("OK");
  });
});

module.exports = router;
