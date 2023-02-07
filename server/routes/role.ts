import { Router } from "express";
import RoleController from "../controllers/roleController";

const router = Router();

router.get("/", RoleController.getAllRole);
router.post("/",RoleController.createRole);
router.patch("/",RoleController.updateRole);
router.delete("/",RoleController.deleteRole);

export default router;