import { checkout } from '../services/OrderService.js';
import { StatusCodes } from 'http-status-codes';

export const checkoutCart = async (req, res) => {
  try {
    const data = await checkout(req.user.userId);
    res.status(StatusCodes.CREATED).json({
      message: 'Order placed successfully',
      status: 'success',
      data
    });
  } catch (err) {
    res.status(err.statusCode || 500).json({
      message: err.message,
      status: 'error'
    });
  }
};
