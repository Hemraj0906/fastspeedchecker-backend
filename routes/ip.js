// const express = require("express");
// const router = express.Router();

// router.get("/", (req, res) => {
//   const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress || null;

//   res.json({ ip });
// });

// module.exports = router;



const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    // Step 1: Get real client IP
    let ip =
      req.headers["cf-connecting-ip"] || // Cloudflare
      req.headers["x-forwarded-for"]?.split(",")[0].trim() ||
      req.ip ||
      req.socket.remoteAddress ||
      null;

    // Remove IPv6 prefix
    if (ip && ip.startsWith("::ffff:")) {
      ip = ip.replace("::ffff:", "");
    }

    // If localhost, return basic response
    if (!ip || ip === "127.0.0.1" || ip === "::1") {
      return res.json({
        ip: "127.0.0.1",
        city: "Localhost",
        region: "Local",
        country: "Local",
        isp: "Local Network",
      });
    }

    // Step 2: Call IP API
    const response = await fetch(`https://ipapi.co/${ip}/json/`);
    const data = await response.json();
    console.log("data----->ip------------>",data)

    // Step 3: Return structured response
    res.json({
      ip: data.ip,
      city: data.city,
      region: data.region,
      country: data.country_name,
      latitude: data.latitude,
      longitude: data.longitude,
      timezone: data.timezone,
      isp: data.org ? data.org.replace(/^AS\d+\s+/, "") : "Unknown ISP",
    });
  } catch (error) {
    console.error("IP lookup failed:", error);

    res.status(500).json({
      error: "Unable to fetch IP information",
    });
  }
});

module.exports = router;

