const express = require("express");
const router = express.Router();

// router.get("/", (req, res) => {
//   res.setHeader("Content-Type", "application/octet-stream");
//     res.setHeader("Cache-Control", "no-store");
//     res.setHeader("Connection", "keep-alive");

//   const totalSize = 200 * 1024 * 1024; // 200MB virtual stream
//   const chunkSize = 1024 * 1024; // 1MB chunk

//   let sent = 0;
//   const chunk = Buffer.alloc(chunkSize);

//   function send() {
//     while (sent < totalSize) {
//       if (!res.write(chunk)) {
//         res.once("drain", send);
//         return;
//       }
//       sent += chunkSize;
//     }
//     res.end();
//   }

//   send();
// });

router.get("/", (req, res) => {
  res.setHeader("Content-Type", "application/octet-stream");
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("Connection", "keep-alive");

  const chunk = Buffer.alloc(1024 * 1024); // 1MB
  let active = true;

  req.on("close", () => {
    active = false;
  });

  function send() {
    while (active) {
      if (!res.write(chunk)) {
        res.once("drain", send);
        return;
      }
    }
    res.end();
  }

  send();
});

module.exports = router;
