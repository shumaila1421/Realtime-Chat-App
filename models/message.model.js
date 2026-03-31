import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    senderid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    receiverid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    text: {
      type: String,
    },
    mediaType: {
      type: String,
      enum: ["image", "video"],
    },
    mediaurl: {
      type: String,
    },
    mediaPublicId: {
      type: String,
    },
  },
  { timestamps: true },
);

const Message = mongoose.model("Message", messageSchema);
export default Message;
