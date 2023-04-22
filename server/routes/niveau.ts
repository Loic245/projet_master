import { Router } from "express";
import NiveauController from "../controllers/NiveauController";

const router = Router();

router.get('/', NiveauController.getNiveau)
router.post('/', NiveauController.createNiveau)
router.patch('/', NiveauController.updateNiveau)
router.delete('/:id', NiveauController.deleteNiveau)

export default router;