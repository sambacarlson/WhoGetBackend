import mongoose from "mongoose";

const Schema = mongoose.Schema; //contructor
const askSchema = new Schema(
  {
    userInfo: { /// userInfo is needed hare to reduce the number of calls required when fetching this data
      type: {
        user_id: {type: String, required: true},
        username: {type: String, required: true},
        photo: {type: String, required: false},
      },
    },
    message: {
      type: String,
      required: true,
    },
    categories: {
      type: [String],
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    expiry: {
      type: Number,
      required: true,
      default: 3,
    },
    status: {
      type: {
        hidden: { type: Boolean, default: false, required: true },
        hiddenDate: { type: String, default: '', required: false },
      },
    },
  },
  { timestamps: true }
);

// TODO: Use regex to validate/restrict boundaries for all properties

const Ask = mongoose.model("Ask", askSchema);
export default Ask;
