import mongoose from "mongoose";

const Schema = mongoose.Schema; //constructor
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  role: {
    enum: ["admin", "standard"],
    default: "standard",
  },
  interests: {
    type: [String],
    required: true,
  },
  status: {
    type: {
      banned: { type: Boolean, default: false, required: true },
      bannedDate: { type: String, requred: false },
    },
    required: true,
    default: { banned: false, bannedDate: "" },
  },
  telephone: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: false,
  },
  whatsapp: {
    type: Number,
    required: false,
  },
});

// TODO: Use regex to validate/restrict boundaries for all properties

const User = mongoose.model("User", userSchema);
export default User;
