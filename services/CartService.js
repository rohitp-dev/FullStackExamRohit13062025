import { Cart } from '../models/mongo/Cart.js';
import { Product } from '../models/mongo/Product.js';
import { StatusCodes } from 'http-status-codes';

export async function addToCart(userId, productId, quantity = 1) {
  const product = await Product.findById(productId);
  if (!product) {
    const error = new Error('Product not found');
    error.statusCode = StatusCodes.NOT_FOUND;
    throw error;
  }

  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = await Cart.create({ userId, items: [{ productId, quantity }] });
  } else {
    const existingItem = cart.items.find(item => item.productId.equals(productId));
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }
    await cart.save();
  }

  return cart;
}

export async function getCart(userId) {
  const cart = await Cart.findOne({ userId }).populate('items.productId');
  return cart || { items: [] };
}

export async function clearCart(userId) {
  await Cart.findOneAndDelete({ userId });
}

export async function deleteCartById(userId, itemId) {
  const cart = await Cart.findOne({ userId });
  if (!cart) {
    const error = new Error('Cart not found');
    error.statusCode = StatusCodes.NOT_FOUND;
    throw error;
  }

  const itemIndex = cart.items.findIndex(item => item._id.equals(itemId));
  if (itemIndex === -1) {
    const error = new Error('Item not found in cart');
    error.statusCode = StatusCodes.NOT_FOUND;
    throw error;
  }

  cart.items.splice(itemIndex, 1);
  await cart.save();

  return cart;
}