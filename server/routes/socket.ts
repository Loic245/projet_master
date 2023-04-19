import { Router } from "express";
import SocketController from "../controllers/socketController";

const router = Router();

router.post('/', SocketController.saveCommunique)

export default router;