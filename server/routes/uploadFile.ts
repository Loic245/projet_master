import { Router } from 'express';
import express  from 'express';
import UploadFileController from '../controllers/UploadFIleController';
const multer = require('multer');
const upload = multer({ dest: 'uploads/'})

const router = Router();

router.post('/:path', UploadFileController.uploadFile);
router.use('/file', express.static('uploads'));

export default router;