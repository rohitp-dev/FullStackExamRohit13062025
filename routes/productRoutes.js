import express from 'express';
import {
  listProducts,
  getProduct,
  addProduct,
  updateProductController,
  deleteProductController
} from '../controllers/ProductController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', listProducts);
router.get('/:id', getProduct);

router.post('/', authMiddleware, addProduct);
router.put('/:id', authMiddleware, updateProductController);
router.delete('/:id', authMiddleware, deleteProductController);

export default router;
