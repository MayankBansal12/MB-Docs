const { Server } = require("socket.io");

const io = new Server(5000, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  socket.on("send", (delta) => {
    socket.broadcast.emit("receive",delta);
  });
  console.log("Connected to socket.io!");
});
