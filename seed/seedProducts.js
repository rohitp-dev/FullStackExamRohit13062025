import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Product } from '../models/mongo/Product.js';

dotenv.config();

const demoProducts = [
  { name: 'Cotton T-Shirt', price: 499, category: 'men', description: 'Soft cotton tee', stock: 50, image: 'https://picsum.photos/200/300?1' },
  { name: 'Denim Jeans', price: 999, category: 'men', description: 'Blue slim-fit jeans', stock: 30, image: 'https://picsum.photos/200/300?2' },
  { name: 'Hoodie', price: 899, category: 'unisex', description: 'Comfortable hoodie', stock: 20, image: 'https://picsum.photos/200/300?3' },
  { name: 'Sneakers', price: 1299, category: 'shoes', description: 'Stylish sneakers', stock: 15, image: 'https://picsum.photos/200/300?4' },
  { name: 'Summer Dress', price: 799, category: 'women', description: 'Light summer dress', stock: 25, image: 'https://picsum.photos/200/300?5' },
  { name: 'Formal Shirt', price: 699, category: 'men', description: 'Office wear shirt', stock: 40, image: 'https://picsum.photos/200/300?6' },
  { name: 'Track Pants', price: 599, category: 'sportswear', description: 'Stretchy joggers', stock: 35, image: 'https://picsum.photos/200/300?7' },
  { name: 'Cap', price: 299, category: 'accessories', description: 'Cotton baseball cap', stock: 60, image: 'https://picsum.photos/200/300?8' },
  { name: 'Backpack', price: 1099, category: 'bags', description: 'Spacious travel backpack', stock: 10, image: 'https://picsum.photos/200/300?9' },
  { name: 'Flip Flops', price: 199, category: 'shoes', description: 'Casual beachwear', stock: 70, image: 'https://picsum.photos/200/300?10' }
];

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const existingCount = await Product.countDocuments();

    if (existingCount === 0) {
      await Product.insertMany(demoProducts);
      console.log('Demo products added to the database');
    } else {
      console.log('ℹProducts collection already has data, skipping insert.');
    }

    process.exit(0);
  } catch (err) {
    console.error('Error seeding products:', err);
    process.exit(1);
  }
};

seedProducts();
