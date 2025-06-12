import express from 'express';
import { addCartItem, getCartItems } from '../controllers/CartController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(authMiddleware);
router.post('/', addCartItem);
router.get('/', getCartItems);

export default router;
