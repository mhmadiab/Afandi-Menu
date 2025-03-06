import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  customer: {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true }
  },
  orderDetails: [
    {
      productName: { type: String, required: true },
      quantity: { type: Number, required: true, min: 1 },
      price: { type: Number, required: true, min: 0 }
    }
  ],
  subtotal: { type: Number, required: true },
  deliveryFees: { type: Number, required: true },
  total: { type: Number, required: true }
}, { timestamps: true });

const Order = mongoose.model('Order', OrderSchema);

export default Order;
