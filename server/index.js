const { Server } = require("socket.io");

const io = new Server(5000, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  // Creating a new doc and joining the new id
  socket.on("create-document", (documentId) => {
    const data = "";
    socket.join(documentId);
    socket.emit("load-document", data);

    socket.on("send", (delta) => {
      socket.broadcast.to(documentId).emit("receive", delta);
    });
  });
});
