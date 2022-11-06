import express from "express";
import controller from  "../controller/user";
import extractJWT from "../middleware/extractJWT";

const router = express.Router();

router.get("/valiadte", extractJWT, controller.validateToken)
router.get("/register", controller.register)
router.get("/login", controller.login)
router.get("/getall", controller.getAllusers)

export = router;