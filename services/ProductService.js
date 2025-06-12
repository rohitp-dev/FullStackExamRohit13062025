import { Product } from '../models/mongo/Product.js';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';

export async function getAllProducts(query) {
  const { page = 1, limit = 10, search = '', category } = query;
  const filter = {
    name: { $regex: search, $options: 'i' },
    ...(category && { category })
  };

  const products = await Product.find(filter)
    .skip((page - 1) * limit)
    .limit(parseInt(limit));

  return products;
}

export async function getProductById(id) {
  try {
    const product = await Product.findById(id);
    if (!product) {
      const error = new Error('Product not found');
      error.statusCode = StatusCodes.NOT_FOUND;
      throw error;
    }
    return product;
  } catch (err) {
    throw {
      statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
      message: err.message || ReasonPhrases.INTERNAL_SERVER_ERROR
    };
  }
}

export async function createProduct(data) {
  try {
    return await Product.create(data);
  } catch (err) {
    throw {
      statusCode: StatusCodes.BAD_REQUEST,
      message: err.message
    };
  }
}

export async function updateProduct(id, data) {
  try {
    const updated = await Product.findByIdAndUpdate(id, data, { new: true });
    if (!updated) {
      const error = new Error('Product not found');
      error.statusCode = StatusCodes.NOT_FOUND;
      throw error;
    }
    return updated;
  } catch (err) {
    throw {
      statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
      message: err.message
    };
  }
}

export async function deleteProduct(id) {
  try {
    const deleted = await Product.findByIdAndDelete(id);
    if (!deleted) {
      const error = new Error('Product not found');
      error.statusCode = StatusCodes.NOT_FOUND;
      throw error;
    }
    return deleted;
  } catch (err) {
    throw {
      statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
      message: err.message
    };
  }
}
