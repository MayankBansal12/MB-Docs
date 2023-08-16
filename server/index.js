const { Server } = require("socket.io");
const mongoose = require("mongoose");
const Document = require("./model/doc-model");
require("dotenv").config();

mongoose.connect(process.env.ATLAS_URI);
mongoose.connection.once("open", () => {
  console.log("Connected to the database!");
});

const io = new Server(5000, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  // Creating a new doc and joining the new id
  socket.on("create-document", async (documentId) => {
    const document = await updateData(documentId);

    socket.join(documentId);
    socket.emit("load-document", document.data);
    socket.on("send", (delta) => {
      socket.broadcast.to(documentId).emit("receive", delta);
    });
    socket.on("save", async (data) => {
      await Document.findOneAndUpdate({ docId: documentId }, { data: data });
    });
  });
});

const defaultValue = "";
const updateData = async (id) => {
  const document = await Document.findOne({ docId: id });
  if (document) {
    return document;
  }

  // If the document doesn't exist, create a new one
  return Document.create({ docId: id, data: defaultValue });
};
