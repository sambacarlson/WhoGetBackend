import express from "express";
import { user_all_get, user_create_post, user_edit_patch } from "../controllers/userController";

const router = express.Router();

router.get('/', user_all_get);
router.post('/', user_create_post);

//routes with cutom parts should always be placed at the bottom
router.patch('/:id', user_edit_patch);

//export
export default router;
