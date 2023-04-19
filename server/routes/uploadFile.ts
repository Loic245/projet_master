import { Router } from 'express';
import UploadFileController from '../controllers/UploadFIleController';
const multer = require('multer');
const upload = multer({ dest: 'uploads/'})

const router = Router();

router.post('/:path', UploadFileController.uploadFile);

export default router;