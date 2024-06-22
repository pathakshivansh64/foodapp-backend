import { Router } from "express";
import { displaydata } from "../controllers/data.controllers.js";

const router=Router();

router.route('/displaydata').post(displaydata);

export default router;