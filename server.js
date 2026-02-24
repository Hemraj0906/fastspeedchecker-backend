// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const http = require("http");

// const security = require("./middleware/security");
// const rateLimiter = require("./middleware/rateLimiter");

// const download = require("./routes/download");
// const upload = require("./routes/upload");
// const ping = require("./routes/ping");
// const ip = require("./routes/ip");

// const app = express();
// const PORT = process.env.PORT || 8080;

// security(app);

// app.use(
//   cors({
//     origin: "*",
//   })
// );

// app.use(rateLimiter);

// app.use("/download", download);
// app.use("/upload", upload);
// app.use("/ping", ping);
// app.use("/ip", ip);

// const server = http.createServer(app);

// server.keepAliveTimeout = 65000;
// server.headersTimeout = 66000;

// server.listen(PORT, () => {
//   console.log(`🚀 Running on port ${PORT}`);
// });

  
// Render ke liye below above local ke liye

// ================================
// Load environment variables
// ================================
require("dotenv").config();


// ================================
// Import dependencies
// ================================
const express = require("express");
const cors = require("cors");
const http = require("http");


// ================================
// Import custom middleware
// ================================
const security = require("./middleware/security");
const rateLimiter = require("./middleware/rateLimiter");


// ================================
// Import routes
// ================================
const download = require("./routes/download");
const upload = require("./routes/upload");
const ping = require("./routes/ping");
const ip = require("./routes/ip");


// ================================
// Create Express App
// ================================
const app = express();


// ==========================================
// 🔥 ADDED: Trust Proxy (IMPORTANT for Render / Production)
// ==========================================
// Render / VPS / Cloud use reverse proxy
// Without this, real client IP detect nahi hota

//app.set("trust proxy", 1);
app.set("trust proxy", true);



// ================================
// PORT (Render automatically provides PORT)
// ================================
const PORT = process.env.PORT || 8080;



// ================================
// Apply Security Middleware
// ================================
security(app);



// ================================
// Enable CORS
// ================================
// Production me specific domain use karna better hai
// Abhi testing ke liye "*" allow hai
app.use(
  cors({
    origin: "*",
  })
);



// ================================
// Apply Rate Limiter
// ================================
app.use(rateLimiter);



// ================================
// Routes
// ================================
app.use("/download", download);
app.use("/upload", upload);
app.use("/ping", ping);
app.use("/ip", ip);



// ================================
// Create HTTP Server (Better control)
// ================================
const server = http.createServer(app);



// ==========================================
// 🔥 ADDED: Increase KeepAlive Timeout
// (Important for large speed test streams)
// ==========================================
server.keepAliveTimeout = 65000;
server.headersTimeout = 66000;



// ==========================================
// 🔥 MODIFIED: Listen on 0.0.0.0 for Production
// ==========================================
server.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Running on port ${PORT}`);
});