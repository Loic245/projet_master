import { Router } from "express";
import MatiereController from "../controllers/MatiereController";

const route = Router()

route.get('/', MatiereController.getMatiere)
route.post('/', MatiereController.createMatiere)
route.patch('/', MatiereController.updateMatiere)
route.delete('/:id?', MatiereController.deleteMatiere)

export default route;