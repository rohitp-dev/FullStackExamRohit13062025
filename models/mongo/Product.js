import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, index: true },
    price: Number,
    description: String,
    category: { type: String, index: true },
    stock: Number,
    imageUrl: String,
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);
