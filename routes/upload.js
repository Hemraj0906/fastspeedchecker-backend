const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  // Drain the request body properly to avoid hanging connections
  let bytes = 0;

  req.on("data", (chunk) => {
    bytes += chunk.length;
  });

  req.on("end", () => {
    // Send response immediately after receiving data
    res.status(200).json({
      received: bytes,
      timestamp: Date.now(),
    });
  });

  req.on("error", () => {
    res.status(200).json({ received: 0 });
  });
});

module.exports = router;
