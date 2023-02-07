import { Router } from "express";
import UserController from "../controllers/userController";

const router = Router();

router.get("/", UserController.getAllUser);
router.post("/", UserController.createUser);
router.patch("/", UserController.updateUser);
router.delete("/", UserController.deleteUser);

export default router;