import express from 'express';
import exampleRoutes from './example/example.route';

const router = express.Router();

router.use('/examples', exampleRoutes);

export default router;
