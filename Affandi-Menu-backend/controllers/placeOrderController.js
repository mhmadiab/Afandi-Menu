import Order from '../Models/orderModel.js';

// Save a new order (Customer places an order)
export const placeOrder = async (req, res) => {
  try {
    const { customer, orderDetails, subtotal, deliveryFees, total } = req.body;

    if (!customer || !orderDetails || !subtotal || !deliveryFees || !total) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newOrder = new Order({
      customer,
      orderDetails,
      subtotal,
      deliveryFees,
      total
    });

    await newOrder.save();
    res.status(201).json({ message: 'Order placed successfully', order: newOrder });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

// Fetch all orders (Admin Panel)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }); // Newest orders first
    res.status(200).json({data : orders});
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};
