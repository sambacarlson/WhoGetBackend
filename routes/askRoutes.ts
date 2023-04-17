import express from "express";
import { ask_all_get, ask_create_post, ask_delete, ask_edit_patch } from "../controllers/askController";

const router = express.Router();

router.get('/', ask_all_get );
router.post('/', ask_create_post);

//routes with cutom parts should always be placed at the bottom
router.delete('/:id', ask_delete);
router.patch('/:id', ask_edit_patch);

//export
export default router;
