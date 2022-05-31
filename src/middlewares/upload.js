import path from 'path';
import multer from 'multer';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../public/uploads/'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const filename = `${uniqueSuffix}-${file.originalname}`;
    cb(null, filename);
  },
});

const uploadMiddleware = multer({ storage });

export default uploadMiddleware;
