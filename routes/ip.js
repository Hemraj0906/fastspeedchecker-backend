const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress || null;

  res.json({ ip });
});

module.exports = router;
