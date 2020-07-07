// Import http package
const http = require("http");

// Import app.js
const app = require("./app");

// Connect to PORT in env if present or else connect to Localhost:3000
const port = process.env.PORT || 3000;

// Create Server
const server = http.createServer(app);

// Listen on the port
server.listen(port);
