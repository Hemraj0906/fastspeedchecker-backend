// const rateLimit = require("express-rate-limit");

// module.exports = rateLimit({
//   windowMs: 60 * 1000,
//   max: 200,
//   standardHeaders: true,
//   legacyHeaders: false,
// });

const rateLimit = require("express-rate-limit");

// Use official IPv6-safe key generator
const { ipKeyGenerator } = rateLimit;

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 150,
  standardHeaders: true,
  legacyHeaders: false,

  // ✅ Official safe IP generator (IPv4 + IPv6 safe)
  keyGenerator: (req, res) => ipKeyGenerator(req),

  message: {
    error: "Too many requests. Please slow down.",
  },
});

module.exports = limiter;