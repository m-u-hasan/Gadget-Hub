const mongoose = require('mongoose');

// Define the Product Schema
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a product name'],
      trim: true,
    },
    brand: {
      type: String,
      required: [true, 'Please add a brand'],
    },
    category: {
      type: String,
      required: [true, 'Please add a category'],
      enum: ['Mobile', 'Laptop', 'Accessories'], // Based on SRS categories
    },
    price: {
      type: Number,
      required: [true, 'Please add a price'],
      default: 0,
    },
    stock: {
      type: Number,
      required: [true, 'Please add stock quantity'],
      default: 0,
    },
    specs: {
      ram: { type: String },
      storage: { type: String },
      processor: { type: String },
      battery: { type: String },
    },
    rating: {
      type: Number,
      default: 0,
    },
    images: [
      {
        type: String, // Stores image URLs
      },
    ],
    description: {
      type: String,
      required: [true, 'Please add a description'],
    },
  },
  {
    timestamps: true, // Automatically creates 'createdAt' and 'updatedAt'
  }
);

module.exports = mongoose.model('Product', productSchema);
