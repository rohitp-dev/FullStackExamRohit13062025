import express from "express";
import {
  addCartItem,
  deleteAllCartItems,
  deleteCartItemById,
  getCartItems,
} from "../controllers/CartController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);
router.post("/", addCartItem);
router.get("/", getCartItems);
router.delete("/:id", deleteCartItemById);
router.delete("/", deleteAllCartItems);

export default router;