import mongoose from "mongoose";

const Schema = mongoose.Schema; //contructor
const askSchema = new Schema({
  userId: {
    type: String, //TODO: change to link
    required: true
  },
  message: {
    type: String,
    required: true
  },
  categories: {
    type: [String],
    required: true
  },
  image: {
    type: String, //TODO: change to link
    required: false,
  },
  expiry: {
    type: Number,
    required: true,
    default: 3,
  },
  status: {
    type: {
      hidden: {type: Boolean, default: false, required: true},
      hiddenDate: {type: String, required: false}
    },
    required: true,
    default: {hidden: false, hiddenDate: ""}
  }
});

// TODO: Use regex to validate/restrict boundaries for all properties

const Ask = mongoose.model('Ask', askSchema);
export default Ask;
