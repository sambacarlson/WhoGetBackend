import User from "../models/userModel";
import { log_message } from "../utilities/envSpecificHelpers";

/** METHODS:
 * user_all_get
 * user_create_post
 * user_edit_patch
 * user_ban_patch
 */

/** Get all Categories from db */
const user_all_get = (req, res) => {
  User.find()
    .then(result => res.status(200).json(result))
    .catch(err => res.status(400).json({message: err.message}))
}

/** Add a User to db */
const user_create_post = (req, res) => {
  const user = new User(req.body)
  user.save()
    .then(result => res.status(201).json(result))
    .catch(err => res.status(400).json({message: err.message}));
}

/** Edit user of given id */
const user_edit_patch = (req, res) => {
  const id = req.params.id;
  User.findByIdAndUpdate(id, req.body)
    .then(() => res.status(200).end())
    .catch(err => res.status(400).json({message: err.message}));
}


//exports 
export  {user_all_get, user_create_post, user_edit_patch};
