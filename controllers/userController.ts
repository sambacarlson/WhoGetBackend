import mongoose from "mongoose";
import User from "../models/userModel";
import { log_message } from "../utilities/envSpecificHelpers";
import Express from "express";

/** METHODS:
 * user_all_get
 * user_one_get
 * user_create_put
 * user_edit_patch
 * user_ban_patch
 */

/** Get all users from database. takes a 'queryOptions' object as req.body if users banned or not. */
const user_get = (req: Express.Request, res: Express.Response) => {
  const { userAuthId, userDbId } = req.query;
  if (userDbId) {
    User.findById(userDbId)
      .then((result) => res.status(200).json(result))
      .catch((err) => res.status(400).json({ message: err.message }));
  } else if (userAuthId) {
    User.findOne({ uid: userAuthId })
      .then((result) => res.status(200).json(result))
      .catch((err) => res.status(400).json({ message: err.message }));
  } else {
    User.find({})
      .sort({ createdAt: -1 })
      .then((result) => res.status(200).json(result))
      .catch((err) => res.status(400).json({ message: err.message }));
  }
};

// const user_one_get = (req: Express.Request, res: Express.Response) => {
//   const { userAuthId, userDbId } = req.query;
//   // console.log(userId);
//   if (userDbId) {
//     User.findById(userDbId)
//       .then((result) => res.status(200).json(result))
//       .catch((err) => res.status(400).json({ message: err.message }));
//   } else {
//     User.findOne({ uid: userAuthId })
//       .then((result) => res.status(200).json(result))
//       .catch((err) => res.status(400).json({ message: err.message }));
//   }
// };

/** Add a User to db */
/*
const user_create_post = (req: Express.Request, res: Express.Response) => {
  const user = new User(req.body);
  user
    .save()
    .then((result) => res.status(201).json(result))
    .catch((err) => res.status(400).json({ message: err.message }));
};
*/

const user_create_put = (req: Express.Request, res: Express.Response) => {
  const filter = { uid: req.body.uid };
  const update = { ...req.body };
  const options = { new: true, upsert: true };
  User.findOneAndUpdate(filter, update, options)
    .then((result) => res.status(201).json(result))
    .catch((err) => res.status(400).json({ message: err.message }));
};

/** Edit user of given id */
const user_edit_patch = (req: Express.Request, res: Express.Response) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "ask not found" });
  }
  // const userAsks
  User.findByIdAndUpdate(id, req.body)
    .then(() => res.status(200).end())
    .catch((err) => res.status(400).json({ message: err.message }));
};

//exports
export { user_get, user_create_put, user_edit_patch };
