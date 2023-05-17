import { Router } from "express";
import LoginController from "../controllers/loginController";

const router = Router();

router.post('/', LoginController.login)
router.post('/decode', LoginController.decodeToken)

export default router;