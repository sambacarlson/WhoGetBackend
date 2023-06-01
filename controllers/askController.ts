import { error } from "console";
import Ask from "../models/askModel";
// import User from "../models/userModel";
import Express from "express";
import mongoose, { MongooseError } from "mongoose";
import { log_message } from "../utilities/envSpecificHelpers";

/** METHODS:
 * get_all // get all asks regardless
 * get_one_by_id // used to get one specific ask
 * get_many_by_categories //used to get all asks of given category list
 * get_many_unflagged //used to get all asks that are not hidden and user is not banned
 * get_many_unflagged_by_categories //used to get categorized asks that are not hidden and user is not banned
 * get_many_hidden //gets all hidden asks
 * get_many_by_user_id // used to get user's own asks
 * post_one // creates an ask
 * patch_one_by_id // used hide/show asks
 * delete_one_by_id // used by user to delete asks they no longer want on the platform
 */

// get_all
async function get_all(req: Express.Request, res: Express.Response) {
  try {
    const asks = await Ask
      .find({})
      .populate({ path: 'user', select: '-createdAt -updatedAt -interests' })
      .sort({ createdAt: -1 });
    res.status(200).json(asks);
  } catch (error: any) {
    res.status(404).json(error.message);
  }
}


// get_one_by_id
async function get_one_by_id(req: Express.Request, res: Express.Response) {
  try {
    const { askId } = req.params;
    const ask = await Ask
      .find({ _id: { $eq: askId } })
      .populate({ path: 'user', select: '-createdAt -updatedAt -interests' })
      .sort({ createdAt: -1 });
    res.status(200).json(ask);
  }
  catch (error: any) {
    res.status(404).json(error.message);
  }
}

// get_many_by_categories //used to get all asks of given category list
async function get_many_by_categories(req: Express.Request, res: Express.Response) {
  try {
    const { categories }: { categories?: string } = req.query;
    const categoryList = categories ? categories.split(",").map((item) => item.trim()) : []; //convert query string to array
    const asks = await Ask
      .find({ categories: { $in: categoryList } })
      .populate({ path: 'user', select: '-createdAt -updatedAt -interests' })
      .sort({ createdAt: -1 });
    res.status(200).json(asks);
  }
  catch (error: any) {
    res.status(404).json(error.message);
  }
}

// get_many_unflagged //used to get all asks that are not hidden and creators are no banned
async function get_many_unflagged(req: Express.Request, res: Express.Response) {
  try {
    const unfiltered = await Ask
      .find({ 'status.hidden': { $eq: false } })
      .populate({ path: 'user', select: '-createdAt -updatedAt -interests' }) // users must not be banned, nor must asks be hidden
      .sort({ createdAt: -1 });
    const asks:any = unfiltered.filter((ask: any) => ask.user.status.banned===false)
    res.status(200).json(asks);
  }
  catch (error: any) {
    res.status(404).json(error.message);
  }
}

// get_many_unflagged_by_categories //used to get categorized asks that are not hidden and user is not banned
async function get_many_unflagged_by_categories(req: Express.Request, res: Express.Response) {
  try {
    const { categories }: { categories?: string } = req.query;
    const categoryList = categories? categories.split(",").map((item) => item.trim()) : []; //convert query string to array
    const unfiltered = await Ask
     .find({ categories: { $in: categoryList },'status.hidden': { $eq: false } })
     .populate({ path: 'user', select: '-createdAt -updatedAt -interests' }) // users must not be banned, nor must asks be hidden
     .sort({ createdAt: -1 });
    const asks:any = unfiltered.filter((ask: any) => ask.user.status.banned===false)
    res.status(200).json(asks);
  }
  catch (error: any) {
    res.status(400).json(error.message);
  }
}

// get_many_hidden //used to get all hidden asks only
async function get_many_hidden(req: Express.Request, res: Express.Response) {
  try {
    const asks = await Ask
      .find({ 'status.hidden': { $eq: true } })
      .populate({ path: 'user', select: '-createdAt -updatedAt -interests' }) // users must not be banned, nor must asks be hidden
      .sort({ createdAt: -1 });
    res.status(200).json(asks);
  }
  catch (error: any) {
    res.status(404).json(error.message);
  }
}

// get_many_by_user_id // used to get user's own asks
async function get_many_by_user_id(req: Express.Request, res: Express.Response) {
  try {
    const { userId } = req.params
    const asks = await Ask
      .find({user: userId})
      .populate({ path: 'user' } )
      .sort({ createdAt: -1 });
    res.status(200).json(asks)
  } catch (error: any) {
    res.status(404).json(error.message);
  }
}

// post_one // creates an ask
async function post_one(req: Express.Request, res: Express.Response) {
  try {
    const newAsk = req.body
    const createdAsk = await Ask.create(newAsk);
    res.status(201).json(createdAsk);
  } catch (error: any) {
    res.status(400).json(error.message);
  }
}

// patch_one_by_id // used hide/show asks
async function patch_one_by_id(req: Express.Request, res: Express.Response) {
  try {
    const { askId } = req.params;
    const update = req.body;
    const ask = await Ask.findByIdAndUpdate(askId, { $set: update }, { new: true }); // mew=true says return the new object intead of the default old.
    res.status(200).json(ask);
  } catch(error:any) {
    res.status(400).json(error.message)
  }
}

// delete_one_by_id // used by user to delete asks they no longer want on the platform
async function delete_one_by_id(req: Express.Request, res: Express.Response) {
  try {
    const { askId } = req.params;
    const deleted = await Ask.findByIdAndDelete(askId);
    res.status(200).json(deleted);
  } catch (error: any) {
    res.status(400).json(error.message);
  }
}

export {
  get_all,
  get_one_by_id,
  get_many_by_categories,
  get_many_unflagged,
  get_many_unflagged_by_categories,
  get_many_hidden,
  get_many_by_user_id,
  post_one,
  patch_one_by_id,
  delete_one_by_id
}


////////// OLD ////////////
/*
const ask_all_get = (req: Express.Request, res: Express.Response) => {
  const queryOptions: {
    categories?: [string];
    showHidden?: boolean;
    onlyHidden?: boolean;
  } = req.body;
  const {
    categories,
    showHidden,
  }: { categories?: string; showHidden?: boolean } = req.query;
  const categoryList = categories
    ? categories.split(",").map((item) => item.trim())
    : [];
  // const categoryList = categories ? categories : '[]';
  // JSON.parse(categoryList);
  // console.log(categoryList);
  /// categorize asks: if done, show hidden is automatically set to false.
  if (categoryList.length > 0) {
    // console.log('categorized');
    Ask.find({
      $and: [
        { categories: { $in: categoryList } },
        { "status.hidden": { $eq: false } },
      ],
    })
      .sort({ createdAt: -1 })
      .then((result) => res.status(200).json(result))
      .catch((err) => res.status(400).json({ message: err.message }));
  }
  /// show all
  else if (showHidden) {
    // console.log('showHIdden set to true')
    Ask.find({})
      .sort({ createdAt: -1 })
      .then((result) => res.status(200).json(result))
      .catch((err) => res.status(400).json({ message: err.message }));
  }
  /// All unhidden for admin
  else {
    // console.log('all running')
    Ask.find({ "status.hidden": { $eq: false } })
      .sort({ createdAt: -1 })
      .then((result) => res.status(200).json(result))
      .catch((err) => res.status(400).json({ message: err.message }));
  }
};

//* Add and execise to the database. ensure all required attributes are available with their right types 
const ask_create_post = (req: Express.Request, res: Express.Response) => {
  const ask = new Ask(req.body);
  ask
    .save()
    .then((result) => res.status(201).json(result))
    .catch((err) => res.status(400).json({ message: err.message }));
};

//* Edit an existing ask on the database with entry 
const ask_edit_patch = (req: Express.Request, res: Express.Response) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "ask not found" });
  }
  Ask.findByIdAndUpdate(id, req.body)
    .then(() => res.status(201).end())
    .catch((err) => res.status(400).json({ message: err.message }));
};

//* Deletes the ask with id provided to the req params 
const ask_delete = (req: Express.Request, res: Express.Response) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "ask not found" });
  }
  Ask.findByIdAndDelete(id)
    .then(() => res.status(200).end())
    .catch((err) => res.status(400).json({ message: err.message }));
};
//* Hide the ask with given id 
const ask_hide_patch = (req: Express.Request, res: Express.Response) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "ask not found" });
  }
  Ask.findByIdAndUpdate(id, req.body)
    .then(() => res.status(200).end())
    .catch((err) => res.status(400).json({ message: err.message }));
};

// Export all methods
export {
  ask_all_get,
  ask_create_post,
  ask_edit_patch,
  ask_delete,
  ask_hide_patch,
};

*/
