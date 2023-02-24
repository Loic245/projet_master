import { Router } from "express";
import UserController from "../controllers/userController";
import { jsonParser } from "../utils";

const router = Router();

router.get("/", UserController.getAllUser);
router.post("/", UserController.createUser);
router.post("/admin", jsonParser, UserController.createAdmin)
router.post("/prof", jsonParser, UserController.createProf)
router.post("/student", jsonParser, UserController.createStudent)
router.patch("/", UserController.updateUser);
router.delete("/", UserController.deleteUser);

export default router;