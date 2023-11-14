import mongoose, { Schema } from "mongoose";
import { IDocument } from "../types";

const DocumentSchema: Schema = new Schema<IDocument>({
  docId: { type: String, required: true },
  data: { type: Object, required: true },
  title: { type: String, required: true, default: "New Document" },
  createdAt: { type: Date, required: true, default: Date.now },
  updatedAt: { type: Date, required: true, default: Date.now },
});

const Document = mongoose.model<IDocument>("Document", DocumentSchema);

export default Document;
