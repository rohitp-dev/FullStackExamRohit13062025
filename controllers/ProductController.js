import { getAllProducts, createProduct } from '../services/ProductService.js';
import { StatusCodes } from 'http-status-codes';

export const listProducts = async (req, res) => {
  try {
    const products = await getAllProducts(req.query);
    res.status(StatusCodes.OK).json({
      message: 'Products fetched successfully',
      status: 'success',
      data: products
    });
  } catch (err) {
    res.status(err.statusCode || 500).json({
      message: err.message,
      status: 'error',
    });
  }
};

export const addProduct = async (req, res) => {
  try {
    const product = await createProduct(req.body);
    res.status(StatusCodes.CREATED).json({
      message: 'Product created successfully',
      status: 'success',
      data: product
    });
  } catch (err) {
    res.status(err.statusCode || 500).json({
      message: err.message,
      status: 'error',
    });
  }
};
