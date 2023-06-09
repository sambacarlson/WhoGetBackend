import express from "express";
import {
  get_all,
  get_one_by_id,
  get_many_by_categories,
  get_many_unflagged,
  get_many_unflagged_by_categories,
  get_many_hidden,
  get_many_by_user_id,
  post_one,
  patch_one_by_id,
  delete_one_by_id,
} from "../controllers/askController";

const router = express.Router();

router.get("/all", get_all);
router.get("/many/bycategories", get_many_by_categories);
router.get("/many/unflagged", get_many_unflagged);
router.get("/many/unflagged/bycategories", get_many_unflagged_by_categories);
router.get("/many/hidden", get_many_hidden);
router.post("/one", post_one);
router.delete("/one/:askId", delete_one_by_id);

//routes with cutom parts should always be placed at the bottom
router.get("/one/:askId", get_one_by_id);
router.get("/many/byuser/:userId", get_many_by_user_id);
router.patch("/one/:askId", patch_one_by_id);


//export
export default router;
