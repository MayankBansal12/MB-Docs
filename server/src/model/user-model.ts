import mongoose, { Schema, Types } from "mongoose";
import { UserType } from "../types";

const UserSchema: Schema = new Schema<UserType>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    passwd: { type: String, required: true },
    docs: [{
        docId: { type: Schema.Types.ObjectId, required: true }
    }]
})