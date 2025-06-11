import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: Number,
    description: String,
    category: String,
    stock: Number,
    imageUrl: String,
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);
