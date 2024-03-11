import { Router } from "express";
import { 
    RegisterUser,
    loginUsers,
    logOut,
    addUser,
    updateUser,
    deleteUser,
    getAllUsers
} from "../controllers/user.controllers.js";

import verifyJWT  from "../middleware/auth.middleware.js"
const router=Router();


router.route("/register").post(RegisterUser)
router.route("/login").post(loginUsers)
router.route("/allusers").get(getAllUsers)

//secure router
router.route("/logout").post(verifyJWT,logOut)
router.route("/adduser").post(addUser)
router.route("/update_user/:_id").put(updateUser)
router.route("/delete_user/:_id").delete(deleteUser)

export default router