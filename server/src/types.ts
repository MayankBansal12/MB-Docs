import { Document } from "mongoose";

export interface DocumentType extends Document {
    docId: string;
    data: Record<string, any>;
    createdAt: Date;
}
