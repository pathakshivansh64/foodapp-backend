import { Router } from "express";
import { login, signup } from "../controllers/user.controllers.js";
import { insertOrderHistory, showOrderHistory } from "../controllers/orderhistory.controllers.js";


const router=Router();


router.route('/signup').post(signup);
router.route('/login').post(login);
router.route('/insertorder').post(insertOrderHistory)
router.route('/showOrderHistory').post(showOrderHistory)


export default router