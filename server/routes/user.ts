import { Router } from "express";
import UserController from "../controllers/userController";

const router = Router();

// utilisateur
router.get("/", UserController.getAllUser);
router.post("/", UserController.createUser);
router.patch("/", UserController.updateUser);
router.delete("/", UserController.deleteUser);

// administrateur
router.get("/admin", UserController.getAllAdmin);
router.post("/admin", UserController.createAdmin);
router.patch("/admin", UserController.updateAdmin);
router.delete("/admin/:id", UserController.deleteAdmin);
router.post("/admin/search", UserController.searchAdmin);

// Professeur
router.get("/prof", UserController.getAllProf);
router.post("/prof", UserController.createProf);
router.patch("/prof", UserController.updateProf);
router.delete("/prof/:id", UserController.deleteProf); 
router.post("/prof/search", UserController.searchProf);

// Etudiant
router.get("/student", UserController.getAllStudent);
router.post("/student", UserController.createStudent);
router.patch("/student", UserController.updateStudent);
router.delete("/student/:id", UserController.deleteStudent);
router.post("/student/search", UserController.searchStudent);

export default router;