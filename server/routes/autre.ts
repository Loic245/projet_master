import { Router } from "express";
import AutreController from "../controllers/AutreController";

const router = Router();

router.get('/', AutreController.getData)

router.post('/', AutreController.saveData)

router.post('/annee', AutreController.saveAnnee)

router.get('/annee', AutreController.getAnnee)

router.patch('/annee', AutreController.updateAnnee)

router.get('/:matricule', AutreController.getMatiereParProf)

router.get('/liste/:niveau', AutreController.getListNoteEtudiant)

export default router;