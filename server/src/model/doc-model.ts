import mongoose, { Schema } from "mongoose";
import { DocumentType } from "../types";

const DocumentSchema: Schema = new Schema<DocumentType>({
  docId: { type: String, required: true },
  data: { type: Object, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
});

const Document = mongoose.model<DocumentType>("Document", DocumentSchema);

export default Document;
