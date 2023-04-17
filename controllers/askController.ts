import Ask from "../models/askModel";

/** METHODS:
 * ask_all_get
 * ask_create_post
 * ask_edit_patch
 * ask_delete
 * ask_hide_patch
 */

/** Get all asks from database */
const ask_all_get = (req, res) => {
  Ask.find()
    .then(result => res.status(200).json(result))
    .catch(err => res.status(400).json({message: err.message}));
}

/** Add and execise to the database. ensure all required attributes are available with their right types */
const ask_create_post = (req, res) => {
  const ask = new Ask(req.body);
  ask.save()
    .then(result => res.status(201).json(result))
    .catch(err => res.status(400).json({message: err.message}));
}

/** Edit an existing ask on the database with entry */
const ask_edit_patch = (req, res) => {
  const id = req.params.id;
  Ask.findByIdAndUpdate(id, req.body)
  .then(() => res.status(201).end())
  .catch(err => res.status(400).json({message: err.message}));
}

/** Deletes the ask with id provided to the req params */
const ask_delete = (req, res) => {
  const id = req.params.id;
  Ask.findByIdAndDelete(id)
    .then(() => res.status(200).end())
    .catch(err => res.status(400).json({message: err.message}));
}
/** Hide the ask with given id */
const ask_hide_patch = (req, res) => {
  const id = req.params.id;
  Ask.findByIdAndUpdate(id, req.body)
    .then(() => res.status(200).end())
    .catch(err => res.status(400).json({message: err.message}));
}

// Export all methods
export {ask_all_get, ask_create_post, ask_edit_patch, ask_delete, ask_hide_patch};
