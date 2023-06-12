import { Router } from "express";
import NoteController from "../controllers/NoteController";

const router = Router();

router.post('/', NoteController.saveNote)

router.get('/', NoteController.getAllNote)

export default router;