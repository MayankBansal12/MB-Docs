const Document = require("./model/doc-model");
const date=new Date();
const updateData = async (id) => {
  const document = await Document.findOne({ docId: id });
  if (document) {
    return document;
  }
  const defaultValue = "";
  return await Document.create({ docId: id, data: defaultValue, createdAt: date });
};

module.exports = (io) => {
  io.on("connection", (socket) => {
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
};
