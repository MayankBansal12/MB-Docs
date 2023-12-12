import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import mongoose from "mongoose";
require("dotenv").config();

const PORT = process.env.PORT || 5000;
const local_url=process.env.CLIENT_URL || "";
const prod_url=process.env.CLIENT_PROD_URL || "";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: [
      local_url,
      prod_url
    ],
  },
});

// Middlewares
app.use(cors());
app.use(express.json());

// Connect to MongoDB
const db = process.env.ATLAS_URI || "";
mongoose.connect(db);
mongoose.connection.once("open", () => {
  console.log("Connected to the database!");
});

// Socket.IO integration
import socket from "./socket";
socket(io);

// Connect to routes
import docRouter from "./routes/docRouter";
import userRouter from "./routes/userRouter";

app.get("/", (req, res) => {
  res.send("Working!");
})

app.use("/doc", docRouter);
app.use("/user", userRouter);

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
