import { Router } from "express";
import MessageController from "../controllers/MessageController";

const router = Router();

router.get('/:matricule', MessageController.getAllMessage)

router.post('/one', MessageController.getOneMessage)

router.post('/', MessageController.newMessage)

export default router;