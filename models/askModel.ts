import mongoose from "mongoose";

const Schema = mongoose.Schema; //contructor
const askSchema = new Schema(
  {
    // userInfo: { /// userInfo is needed hare to reduce the number of calls required when fetching this data
    //   type: {
    //     user_id: {type: String, required: true},
    //     username: {type: String, required: true},
    //     photo: {type: String, required: false},
    //   },
    // },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    message: {
      type: String,
      required: true,
    },
    categories: {
      type: [String],
      required: true,
    },
    images: {
      type: [String],
      required: false,
    },
    expiry: {
      type: Number,
      enum: [1, 2, 3, 4, 5, 6, 7],
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

const Ask = mongoose.model("Ask", askSchema);
export default Ask;
