import { Router } from "express";
import NoteController from "../controllers/NoteController";

const router = Router();

router.post('/', NoteController.saveNote)

router.get('/', NoteController.getAllNote)

router.post('/filter', NoteController.filterNote)

router.post('/one/:id', NoteController.getOneNote)

export default router;