import { Router } from "express";
import NotificationController from "../controllers/NotificationController";

const router = Router();

router.get('/', NotificationController.getnotification) 

export default router;