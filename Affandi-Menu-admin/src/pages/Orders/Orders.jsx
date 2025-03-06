import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { assets, url } from "../../assets/assets.js";
import "./Orders.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/order/getorders`);
      if (response.data) {
        setOrders(response.data.data);
        setFilteredOrders(response.data.data); // Initialize filtered orders
      } else {
        toast.error("Error fetching orders");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Handle search filter
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    setFilteredOrders(
      orders.filter((order) =>
        order.customer.name.toLowerCase().includes(value)
      )
    );
  };

  return (
    <div className="orders-container">
      <h3 className="orders-title">Orders Management</h3>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by customer name..."
        value={searchTerm}
        onChange={handleSearch}
        className="search-input"
      />

      {loading ? (
        <p className="loading-text">Loading orders...</p>
      ) : filteredOrders.length === 0 ? (
        <p className="no-orders">No matching orders found</p>
      ) : (
        <div className="orders-list">
          {filteredOrders.map((order, index) => (
            <div className="order-card" key={index}>
              <div className="order-header">
                <img src={assets.parcel_icon} alt="Parcel" className="order-icon" />
                <div>
                  <h4>Order #{index + 1}</h4>
                  <p><strong>Customer:</strong> {order.customer.name}</p>
                  <p><strong>Phone:</strong> {order.customer.phone}</p>
                  <p><strong>Address:</strong> {order.customer.address}</p>
                </div>
              </div>

              <div className="order-items">
                <h5>Items:</h5>
                <ul>
                  {order.orderDetails.map((item, i) => (
                    <li key={i}>
                      🍽 <strong>{item.productName}</strong> (x{item.quantity}) - {item.price} ل.ل
                    </li>
                  ))}
                </ul>
              </div>

              <div className="order-footer">
                <p><strong>Subtotal:</strong> {order.subtotal} ل.ل</p>
                <p><strong>Delivery Fee:</strong> {order.deliveryFees} ل.ل</p>
                <p><strong>Total:</strong> {order.total} ل.ل</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
