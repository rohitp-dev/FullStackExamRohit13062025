import { OrderItem } from '../models/sql/OrderItem.js';
import { Product } from '../models/mongo/Product.js';
import { Cart } from '../models/mongo/Cart.js';
import { Order } from '../models/sql/Orders.js';

export async function checkout(userId) {
  const cart = await Cart.findOne({ userId });

  if (!cart || cart.items.length === 0) {
    const error = new Error('Cart is empty');
    error.statusCode = 400;
    throw error;
  }

  let total = 0;
  const orderItems = [];

  for (const item of cart.items) {
    const product = await Product.findById(item.productId);
    if (!product) continue;

    const subtotal = product.price * item.quantity;
    total += subtotal;

    orderItems.push({
      productId: item.productId.toString(),
      quantity: item.quantity,
      price: product.price
    });
  }

  const order = await Order.create({ userId, total });

  for (const item of orderItems) {
    await OrderItem.create({
      orderId: order.id,
      ...item
    });
  }

  await Cart.findOneAndDelete({ userId });

  return { order, items: orderItems };
}
 