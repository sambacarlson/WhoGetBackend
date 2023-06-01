import mongoose from "mongoose";

const Schema = mongoose.Schema;
const interestSchema = new Schema (
  {
    group: {
      type: String,
      required: true,
      default: "others",
    },
    name: {
      type: String,
      required: true,
      unique: true,
    }
  }
);

const Interest = mongoose.model("Interest", interestSchema);
export default Interest
