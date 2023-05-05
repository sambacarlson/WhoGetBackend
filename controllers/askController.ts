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

/** Get all asks from database. takes a 'queryOptions' object as req.body specifying caterogries to choose from. */
const ask_all_get = (req: Express.Request, res: Express.Response) => {
  const queryOptions: { categories?: [string], showHidden?: boolean, onlyHidden?: boolean } = req.body;
  /** hide Hidden defaults to true */
  /// Only hidden
  if (queryOptions.onlyHidden) {
    Ask.find({ "status.hidden": { $eq: true } }).sort({createdAt: -1})
      .then(result => res.status(200).json(result))
      .catch(err => res.status(400).json({ message: err.message }));
  }
  /// All asks regardless
  else if (queryOptions.showHidden === true) {
    Ask.find({}).sort({createdAt: -1})
      .then(result => res.status(200).json(result))
      .catch(err => res.status(400).json({ message: err.message }));
  }
  /// Categorized unhidden
  else if (queryOptions.categories !== undefined) {
    Ask.find({ $and: [{ categories: { $in: queryOptions.categories } }, { "status.hidden": { $eq: false } }] }).sort({createdAt: -1})
      .then(result => res.status(200).json(result))
      .catch(err => res.status(400).json({ message: err.message }));
  }
  /// All unhidden
  else {
    Ask.find({ "status.hidden": { $eq: false } }).sort({createdAt: -1})
      .then(result => res.status(200).json(result))
      .catch(err => res.status(400).json({ message: err.message }));
  }

}

/** Add and execise to the database. ensure all required attributes are available with their right types */
const ask_create_post = (req: Express.Request, res: Express.Response) => {
  const ask = new Ask(req.body);
  ask.save()
    .then(result => res.status(201).json(result))
    .catch(err => res.status(400).json({ message: err.message }));
}

/** Edit an existing ask on the database with entry */
const ask_edit_patch = (req: Express.Request, res: Express.Response) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'ask not found'});
  }
  Ask.findByIdAndUpdate(id, req.body)
    .then(() => res.status(201).end())
    .catch(err => res.status(400).json({ message: err.message }));
}

/** Deletes the ask with id provided to the req params */
const ask_delete = (req: Express.Request, res: Express.Response) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'ask not found'});
  }
  Ask.findByIdAndDelete(id)
    .then(() => res.status(200).end())
    .catch(err => res.status(400).json({ message: err.message }));
}
/** Hide the ask with given id */
const ask_hide_patch = (req: Express.Request, res: Express.Response) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'ask not found'});
  }
  Ask.findByIdAndUpdate(id, req.body)
    .then(() => res.status(200).end())
    .catch(err => res.status(400).json({ message: err.message }));
}

// Export all methods
export { ask_all_get, ask_create_post, ask_edit_patch, ask_delete, ask_hide_patch };
