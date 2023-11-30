import jwt from "jsonwebtoken";
import { Server, Socket } from "socket.io";
import User from "./model/user-model";
import Document from "./model/doc-model";
import { IUser } from "./types";
const date = new Date();
const secret: string = process.env.SECRET + "";

// For creating a new doc and if already exists, then return the data
const updateData = async (id: string, token: string) => {
  const document = await Document.findOne({ docId: id });
  if (document) {
    return document;
  }
  const defaultValue = "";
  if (token) {
    const decoded = jwt.verify(token, secret) as IUser;
    const user = await User.findById(decoded?.id)
    if (user) {
      return await Document.create({ docId: id, data: defaultValue, createdAt: date, userId: user._id });
    }
  }
};

const socket = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    socket.on("create-document", async (documentId: string, token: string) => {
      const document = await updateData(documentId, token);
      socket.join(documentId);
      socket.emit("load-document", document?.data);

      socket.on("send", (delta) => {
        socket.broadcast.to(documentId).emit("receive", delta);
      });

      socket.on("save", async (data) => {
        await Document.findOneAndUpdate({ docId: documentId }, { data: data, updatedAt: new Date() });
      });
    });
  });
};

export default socket;