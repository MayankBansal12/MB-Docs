import mongoose from "mongoose";

const Schema = new mongoose.Schema({
  docId: String,
  data: Object,
  createdAt: Date,
});

const Document = mongoose.model("Document", Schema);

export default Document;
