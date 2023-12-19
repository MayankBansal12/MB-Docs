import { Document, Types } from "mongoose";

export type DocType = {
    docId: Types.ObjectId
}

export interface DocumentType extends Document {
    docId: String,
    title: String,
    data: Record<string, any>,
    createdAt: Date,
    updatedAt: Date,
    userId: Types.ObjectId
}

export interface UserType extends Document {
    name: String,
    email: String,
    passwd: String,
    docs: DocType[]
}

export type IChat = {
    role: String,
    content: String
}