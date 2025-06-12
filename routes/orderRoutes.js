import express from 'express';
import { checkoutCart } from '../controllers/OrderController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/checkout', authMiddleware, checkoutCart);

export default router;
