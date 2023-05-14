import mongoose from "mongoose";

const Schema = mongoose.Schema; //constructor
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    uid: {
      type: String,
      required: true,
      unique: true,
    },
    interests: {
      type: [String],
      required: true,
    },
    status: {
      type: {
        banned: { type: Boolean, default: false, required: true },
        bannedDate: { type: String, default: "", required: false },
      },
    },
    telephone: {
      type: Number,
      required: false,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
      required: false,
    },
    whatsapp: {
      type: Number,
      required: false,
    },
    photo: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

// TODO: Use regex to validate/restrict boundaries for all properties

const User = mongoose.model("User", userSchema);
export default User;
