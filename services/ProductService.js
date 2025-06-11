import { Product } from '../models/mongo/Product.js';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';

export async function getAllProducts(query) {
  try {
    const { page = 1, limit = 10, search = '', category } = query;

    const filter = {
      name: { $regex: search, $options: 'i' },
      ...(category && { category })
    };

    const products = await Product.find(filter)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    return products;
  } catch (err) {
    throw {
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      message: err.message || ReasonPhrases.INTERNAL_SERVER_ERROR
    };
  }
}

export async function createProduct(data) {
  try {
    const product = await Product.create(data);
    return product;
  } catch (err) {
    throw {
      statusCode: StatusCodes.BAD_REQUEST,
      message: err.message
    };
  }
}
