import { addToCart, getCart } from '../services/CartService.js';
import { StatusCodes } from 'http-status-codes';

export const addCartItem = async (req, res) => {
  try {
    const cart = await addToCart(req.user.userId, req.body.productId, req.body.quantity);
    res.status(StatusCodes.OK).json({
      message: 'Item added to cart',
      status: 'success',
      data: cart
    });
  } catch (err) {
    res.status(err.statusCode || 500).json({
      message: err.message,
      status: 'error'
    });
  }
};

export const getCartItems = async (req, res) => {
  try {
    const cart = await getCart(req.user.userId);
    res.status(StatusCodes.OK).json({
      message: 'Cart fetched',
      status: 'success',
      data: cart
    });
  } catch (err) {
    res.status(err.statusCode || 500).json({
      message: err.message,
      status: 'error'
    });
  }
};
