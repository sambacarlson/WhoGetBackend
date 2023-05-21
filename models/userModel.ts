import mongoose from "mongoose";


const Schema = mongoose.Schema; //constructor
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    oAuthId: {
      type: String,
      required: true,
      unique: true,
    },
    oAuthProvider: {
      type: String,
      enum: ["google", "facebook"],
      required: true,
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


const User = mongoose.model("User", userSchema);
export default User;
