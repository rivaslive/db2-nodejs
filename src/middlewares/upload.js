import multer from 'multer';
import getConfig from '@config';

const { publicPath } = getConfig();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, publicPath);
  },
  filename(req, file, cb) {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const filename = `${uniqueSuffix}-${file.originalname}`;
    cb(null, filename);
  },
});

const uploadMiddleware = multer({ storage });

export default uploadMiddleware;
