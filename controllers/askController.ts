import Ask from "../models/askModel";
import Express from "express";
import mongoose from "mongoose";

/** METHODS:
 * ask_all_get
 * ask_create_post
 * ask_edit_patch
 * ask_delete
 * ask_hide_patch
 */

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

/** Add and execise to the database. ensure all required attributes are available with their right types */
const ask_create_post = (req: Express.Request, res: Express.Response) => {
  const ask = new Ask(req.body);
  ask
    .save()
    .then((result) => res.status(201).json(result))
    .catch((err) => res.status(400).json({ message: err.message }));
};

/** Edit an existing ask on the database with entry */
const ask_edit_patch = (req: Express.Request, res: Express.Response) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "ask not found" });
  }
  Ask.findByIdAndUpdate(id, req.body)
    .then(() => res.status(201).end())
    .catch((err) => res.status(400).json({ message: err.message }));
};

/** Deletes the ask with id provided to the req params */
const ask_delete = (req: Express.Request, res: Express.Response) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "ask not found" });
  }
  Ask.findByIdAndDelete(id)
    .then(() => res.status(200).end())
    .catch((err) => res.status(400).json({ message: err.message }));
};
/** Hide the ask with given id */
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
