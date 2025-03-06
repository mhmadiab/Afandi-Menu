import express from 'express';
import { placeOrder, getAllOrders } from '../controllers/placeOrderController.js';

const orderRouter = express.Router();

// Endpoint to place an order (Customer)
orderRouter.post('/placeorder', placeOrder);

// Endpoint to get all orders (Admin)
orderRouter.get('/getorders', getAllOrders);

export default orderRouter;