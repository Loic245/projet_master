import { Router } from "express";
import MessageController from "../controllers/MessageController";

const router = Router();

router.get('/', MessageController.getAllMessage)

router.get('/one', MessageController.getOneMessage)

router.post('/', MessageController.newMessage)

export default router;