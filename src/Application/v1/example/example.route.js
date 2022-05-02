import express from 'express';
import { getAllExample, createExample } from './example.controller';

const router = express.Router();

router.get('/', getAllExample);
router.post('/', createExample);

export default router;
