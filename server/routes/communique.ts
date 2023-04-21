import { Router } from "express";
import CommuniqueController from "../controllers/CommuniqueController";

const router = Router();

router.get('/', CommuniqueController.getAllCommunique)
router.get('/getOne/:id', CommuniqueController.getOneCommunique)

export default router;