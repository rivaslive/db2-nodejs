import express from 'express';
import uploadMiddleware from '@middlewares/upload';

import { uploadAsset, getImage } from './upload.controller';

const router = express.Router();

router.post('/upload', uploadMiddleware.single('file'), uploadAsset);
router.get('/:fileName', getImage);

export default router;
