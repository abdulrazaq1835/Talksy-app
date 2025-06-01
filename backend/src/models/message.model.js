import mongoose from "mongoose";
import User from "./user.model.js";

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.ObjectId,
      ref: User,
      required: true,
    },
    reciverId: {
      type: mongoose.Schema.ObjectId,
      ref: User,
      required: true,
    },

    text: {
      type: String,
    },
    image: {
      type: String,
    },
  },

  { timestamps: true }
);


const Message= mongoose.model("Message",messageSchema)


export default Message