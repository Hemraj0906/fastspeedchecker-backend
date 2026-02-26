const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.setHeader("Content-Type", "application/octet-stream");
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("Connection", "keep-alive");

  // Limit to 50MB max (prevents infinite streaming)
  const MAX_SIZE = 50 * 1024 * 1024;
  const chunkSize = 1024 * 1024; // 1MB chunks
  const chunk = Buffer.alloc(chunkSize);

  let sent = 0;
  let active = true;

  // Clean up on client disconnect
  req.on("close", () => {
    active = false;
  });

  function send() {
    while (active && sent < MAX_SIZE) {
      if (!res.write(chunk)) {
        res.once("drain", send);
        return;
      }
      sent += chunkSize;
    }
    res.end();
  }

  send();
});

module.exports = router;
