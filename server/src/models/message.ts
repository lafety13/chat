import {Schema, model} from "mongoose";

const MessageSchema = new Schema(
    {
        date: {type: Date},
        message: {type: String},
        username: {type: String}
    },
    {
        versionKey: false,
        collection: "MessageCollection"
    }
);

export const Message = model("MessageModel", MessageSchema);
