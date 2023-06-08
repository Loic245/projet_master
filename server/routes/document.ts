import { Router } from "express";
import DocumentController from "../controllers/DocumentController";

const router = Router();

router.get('/', DocumentController.getAllDocument);

router.post('/', DocumentController.saveDocument);


export default router;