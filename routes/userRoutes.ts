import express from "express";
import {
  user_get,
  user_create_put,
  user_edit_patch,
} from "../controllers/userController";

const router = express.Router();
router.get("/", user_get);
router.put("/", user_create_put);

//routes with cutom parts should always be placed at the bottom
router.patch("/:id", user_edit_patch);

//export
export default router;
