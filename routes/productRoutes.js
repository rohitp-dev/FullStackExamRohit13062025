import express from 'express';
import { listProducts, addProduct } from '../controllers/ProductController.js';

const router = express.Router();

router.get('/', listProducts);
router.post('/', addProduct);

export default router;
