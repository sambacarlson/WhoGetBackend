import mongoose from "mongoose";
import User from "../models/userModel";
import Express from "express";
import { log_message } from "../utilities/envSpecificHelpers";

/** METHODS:
 * get_all
 * get_one_by_id
 * get_many_banned
 * get_many_unflagged
 * post_one
 * patch_one_by_id
 */


// get_all
async function get_all(req: Express.Request, res: Express.Response) {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error: any) {
    res.status(400).json(error.message);
  }
}

// get_one_by_id
async function get_one_by_id(req: Express.Request, res: Express.Response) {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    res.status(200).json(user);
  } catch (error: any) {
    res.status(400).json(error.message);
  }
}

// get_many_banned
async function get_many_banned(req: Express.Request, res: Express.Response) {
  try {
    const user = await User.find({ 'status.banned': { $eq: true } });
    res.status(200).json(user);
  } catch (error: any) {
    res.status(400).json(error.message);
  }
}

// get_many_unflagged
async function get_many_unflagged(req: Express.Request, res: Express.Response) {
  try {
    const user = await User.find({'status.banned': { $eq: false } });
    res.status(200).json(user);
  } catch (error: any) {
    res.status(400).json(error.message);
  }
}

// post_one. it will update user if already exists
// async function post_one(req:Express.Request, res: Express.Response) {
//   try {
//     const user = new User(req.body);
//     await user.save();
//     res.status(201).json(user);
//   } catch (error: any) {
//     res.status(400).json(error);
//   }
// }

async function post_one(req: Express.Request, res: Express.Response) {
  try {
    const newUserData = req.body;
    // Find the user by oAuthId
    let existingUser = await User.findOne({ oAuthId: newUserData.oAuthId });
    if (existingUser) {
      // If user already exists, update their information
      existingUser = await User.findOneAndUpdate({ oAuthId: newUserData.oAuthId }, newUserData);
      res.status(200).json(existingUser);
    } else {
      // If user doesn't exist, create a new user
      const createdUser = await User.create(newUserData);
      res.status(201).json(createdUser);
    }
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}

// patch_one_by_id
async function patch_one_by_id(req: Express.Request, res: Express.Response) {
  try {
    const { userId } = req.params;
    const user = await User.findByIdAndUpdate(userId, req.body, { new: true }); //new=true returns updated user.
    res.status(200).json(user);
  } catch (error: any) {
    res.status(400).json(error.message);
  }
}

export {
  get_all,
  get_one_by_id,
  get_many_banned,
  get_many_unflagged,
  post_one,
  patch_one_by_id
}


/////////// OLD ////////////
/** ///Get all users from database. takes a 'queryOptions' object as req.body if users banned or not. 
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

const user_create_put = (req: Express.Request, res: Express.Response) => {
  const filter = { uid: req.body.uid };
  const update = { ...req.body };
  const options = { new: true, upsert: true };
  User.findOneAndUpdate(filter, update, options)
    .then((result) => res.status(201).json(result))
    .catch((err) => res.status(400).json({ message: err.message }));
};

///** Edit user of given id 
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
*///