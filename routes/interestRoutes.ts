import express from "express";
import { get_all, post_one, delete_one_by_id } from "../controllers/interestController";

const router = express.Router();

router.get("/all", get_all);
router.post("/one", post_one);
router.delete("/one/:interestId", delete_one_by_id);

//export
export default router
