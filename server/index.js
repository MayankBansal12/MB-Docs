const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
  },
});

const PORT = process.env.PORT || 5000;

// Set up a route
app.get("/", (req, res) => {
  res.send("Express Server is up and running.");
});

// Connect to MongoDB
mongoose.connect(process.env.ATLAS_URI);
mongoose.connection.once("open", () => {
  console.log("Connected to the database!");
});

// Socket.IO integration
require("./socket")(io);

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
