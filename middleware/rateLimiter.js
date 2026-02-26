const rateLimit = require("express-rate-limit");

// Simple rate limiter without custom options that might cause validation issues
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 1000, // Allow many requests per minute for speed testing
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: "Too many requests. Please slow down.",
  },
});

module.exports = limiter;
