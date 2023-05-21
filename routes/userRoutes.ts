import express from "express";
import {
 get_all,
 get_one_by_id,
 get_many_flagged,
 get_many_unflagged,
 post_one,
 patch_one_by_id
} from "../controllers/userController";

const router = express.Router();

router.get("/all", get_all);
router.get("/many/flagged", get_many_flagged);
router.get("/many/unflagged", get_many_unflagged);
router.post("/one", post_one);

//routes with cutom parts should always be placed at the bottom
router.get("/one/:id", get_one_by_id);
router.patch("/one/:userId", patch_one_by_id);

//export
export default router;
