import mongoose from "mongoose";
import User from "../models/userModel";
import Express from "express";

/** METHODS:
 * get_all
 * get_one_by_id
 * get_many_flagged
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
    res.status(400).json(error);
  }
}

// get_one_by_id
async function get_one_by_id(req: Express.Request, res: Express.Response) {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    res.status(200).json(user);
  } catch (error: any) {
    res.status(400).json(error);
  }
}

// get_many_flagged
async function get_many_flagged(req: Express.Request, res: Express.Response) {
  try {
    const user = await User.find({ 'stutus.banned': { $eq: true } });
    res.status(200).json(user);
  } catch (error: any) {
    res.status(400).json(error);
  }
}

// get_many_unflagged
async function get_many_unflagged(req: Express.Request, res: Express.Response) {
  try {
    const user = await User.find({'stutus.banned': { $eq: false } });
    res.status(200).json(user);
  } catch (error: any) {
    res.status(400).json(error);
  }
}

// post_one
async function post_one(req:Express.Request, res: Express.Response) {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (error: any) {
    res.status(400).json(error);
  }
}

// patch_one_by_id
async function patch_one_by_id(req: Express.Request, res: Express.Response) {
  try {
    const { userId } = req.params;
    const user = await User.findByIdAndUpdate(userId, req.body, { new: true });
    res.status(200).json(user);
  } catch (error: any) {
    res.status(400).json(error);
  }
}

export {
  get_all,
  get_one_by_id,
  get_many_flagged,
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