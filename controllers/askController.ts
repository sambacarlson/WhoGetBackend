import Ask from "../models/askModel";
import Express from "express";

/** METHODS:
 * ask_all_get
 * ask_create_post
 * ask_edit_patch
 * ask_delete
 * ask_hide_patch
 */

/** Get all asks from database. takes a 'queryCategories' object as req.params specifying caterogries to choose from. */
const ask_all_get = (req: Express.Request, res: Express.Response) => {
  const queryCategories:{categories: [string]} = req.body
  if(queryCategories.categories===undefined || queryCategories.categories.length < 1) {
    Ask.find()
      .then(result => res.status(200).json(result))
      .catch(err => res.status(400).json({message: err.message}));
  }
  else {
    Ask.find({categories: {$in: queryCategories.categories}})
    .then(result => res.status(200).json(result))
    .catch(err => res.status(400).json({message: err.message}));
  }
}

/** Add and execise to the database. ensure all required attributes are available with their right types */
const ask_create_post = (req: Express.Request, res: Express.Response) => {
  const ask = new Ask(req.body);
  ask.save()
    .then(result => res.status(201).json(result))
    .catch(err => res.status(400).json({message: err.message}));
}

/** Edit an existing ask on the database with entry */
const ask_edit_patch = (req: Express.Request, res: Express.Response) => {
  const id = req.params.id;
  Ask.findByIdAndUpdate(id, req.body)
  .then(() => res.status(201).end())
  .catch(err => res.status(400).json({message: err.message}));
}

/** Deletes the ask with id provided to the req params */
const ask_delete = (req: Express.Request, res: Express.Response) => {
  const id = req.params.id;
  Ask.findByIdAndDelete(id)
    .then(() => res.status(200).end())
    .catch(err => res.status(400).json({message: err.message}));
}
/** Hide the ask with given id */
const ask_hide_patch = (req: Express.Request, res: Express.Response) => {
  const id = req.params.id;
  Ask.findByIdAndUpdate(id, req.body)
    .then(() => res.status(200).end())
    .catch(err => res.status(400).json({message: err.message}));
}

// Export all methods
export {ask_all_get, ask_create_post, ask_edit_patch, ask_delete, ask_hide_patch};
