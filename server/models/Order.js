const mongoose = require('mongoose');

// Define the Order Schema
const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Links the order to a specific User
      required: true,
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product', // Links the item to a specific Product
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          default: 1,
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    status: {
      type: String,
      required: true,
      enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
      default: 'Pending',
    },
    shippingAddress: {
      type: String,
      required: [true, 'Please add a shipping address'],
    },
  },
  {
    timestamps: true, // Automatically creates 'createdAt' (Order Date)
  }
);

module.exports = mongoose.model('Order', orderSchema);
