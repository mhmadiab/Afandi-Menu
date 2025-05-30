import './PlaceOrder.css';
import { useContext, useState } from 'react';
import { StoreContext } from '../../components/context/StoreContext';
import axios from 'axios';

const PlaceOrder = () => {
  const { getTotalCartAmount, cartItems, food_list, url } = useContext(StoreContext);

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [orderType, setOrderType] = useState("Delivery");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleConfirmOrder = async () => {
    if (!customerName || !customerPhone || (orderType === "Delivery" && !customerAddress)) {
      alert("يرجى ملء جميع الحقول المطلوبة!");
      return;
    }

    const orderDetails = food_list
      .filter(item => cartItems[item._id] > 0)
      .map(item => ({
        productName: item.name,
        quantity: cartItems[item._id],
        price: item.price,
      }));

    if (orderDetails.length === 0) {
      alert("السلة فارغة!");
      return;
    }

    const subtotal = getTotalCartAmount();
    const deliveryFee = orderType === "Delivery" ? (subtotal === 0 ? 0 : 100000) : 0;
    const totalAmount = subtotal + deliveryFee;

    const orderData = {
      customer: {
        name: customerName,
        phone: customerPhone,
        address: orderType === "Delivery" ? customerAddress : "Pick-up",
      },
      orderDetails,
      subtotal,
      deliveryFees: deliveryFee,
      total: totalAmount,
      orderType
    };

    try {
      setLoading(true);
      setError(null);

      const response = await axios.post(`${url}/api/order/placeorder`, orderData);

      if (response.status === 201) {
        sendWhatsAppMessage(customerName, customerPhone, orderData.customer.address, orderDetails, subtotal, deliveryFee, totalAmount, orderType);
        setCustomerName("");
        setCustomerPhone("");
        setCustomerAddress("");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      setError("فشل في إرسال الطلب، حاول مرة أخرى!");
    } finally {
      setLoading(false);
    }
  };

  const sendWhatsAppMessage = (name, phone, address, orderItems, subtotal, deliveryFee, totalAmount, type) => {
    const phoneNumber = "+96171301068";

    let orderDetails = "🎉 *شكرًا لطلبك!* 🎉%0A%0A";
    orderDetails += "*تفاصيل الطلب:*%0A%0A";
    orderDetails += `👤 *اسم الزبون:* ${name || "غير معروف"}%0A`;
    orderDetails += `📞 *رقم الهاتف:* ${phone || "غير معروف"}%0A`;
    orderDetails += `🛍️ *نوع الطلب:* ${type}%0A`;
    if (type === "Delivery") orderDetails += `📍 *العنوان:* ${address || "غير معروف"}%0A`;
    orderDetails += `%0A`;

    orderItems.forEach((item) => {
      orderDetails += `🍴 *${item.productName}*%0A`;
      orderDetails += `   🔹 الكمية: ${item.quantity}%0A`;
      orderDetails += `   💰 السعر لكل وحدة: ${item.price} ل.ل%0A`;
      orderDetails += `   🏷️ الإجمالي: ${item.price * item.quantity} ل.ل%0A%0A`;
    });

    orderDetails += "*ملخص الطلب:*%0A";
    orderDetails += `   📌 *المجموع الفرعي:* ${subtotal} ل.ل%0A`;
    if (type === "Delivery") orderDetails += `   🚚 *رسوم التوصيل:* ${deliveryFee} ل.ل%0A`;
    orderDetails += `   🏷️ *المجموع الكلي:* ${totalAmount} ل.ل%0A%0A`;
    orderDetails += "🙏 *شكرًا لاختياركم خدماتنا!* 🚀%0A";
    orderDetails += "📩 سيتم تجهيز طلبك قريبًا.%0A%0A";
    orderDetails += "مع تحياتنا 💖,%0A";
    orderDetails += "فريق مطعم أفندي 🍽️";

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${orderDetails}`;
    window.location.href = whatsappUrl
  };

  return (
    <form className='place-order'>
      <div className='place-order-left'>
        <p className='title'>معلومات الطلب</p>

        <div className='multi-fields'>
          <input type="text" placeholder='اسم صاحب الطلبية' value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
        </div>

        <input type="text" placeholder='رقم الهاتف' value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} />

        <div className="order-type">
  <input 
    type="radio" 
    id="delivery" 
    value="Delivery" 
    checked={orderType === "Delivery"} 
    onChange={(e) => setOrderType(e.target.value)} 
  />
  <label htmlFor="delivery">🚚 توصيل</label>

  <input 
    type="radio" 
    id="pickup" 
    value="Pick-up" 
    checked={orderType === "Pick-up"} 
    onChange={(e) => setOrderType(e.target.value)} 
  />
  <label htmlFor="pickup">🍽️ استلام من المطعم</label>
</div>


        {orderType === "Delivery" && (
          <input type="text" placeholder='العنوان' value={customerAddress} onChange={(e) => setCustomerAddress(e.target.value)} />
        )}
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total: </h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p dir='rtl' lang='ar'>ل.ل {getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p dir='rtl' lang='ar'>ل.ل {orderType === "Delivery" ? (getTotalCartAmount() === 0 ? 0 : 100000) : 0}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total in Lira :</b>
              <b dir='rtl' lang='ar'>{getTotalCartAmount() + (orderType === "Delivery" ? (getTotalCartAmount() === 0 ? 0 : 100000) : 0)} ل.ل</b>
            </div>
          </div>
          <div dir='rtl'>
            <button type='button' onClick={handleConfirmOrder} disabled={loading}>
              {loading ? "جاري إرسال الطلب..." : "تأكيد الطلبية"}
            </button>
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
