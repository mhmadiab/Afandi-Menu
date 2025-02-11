import './PlaceOrder.css'
import { useContext , useState } from 'react'
import {StoreContext} from '../../components/context/StoreContext'


const PlaceOrder = () => {

  const {getTotalCartAmount, cartItems, food_list} = useContext(StoreContext)

  


    
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");

  const handleConfirmOrder = () => {
    const phoneNumber = "+96181034761";

    let orderDetails = "🎉 *شكرًا لطلبك!* 🎉%0A%0A";
    orderDetails += "*تفاصيل الطلب:*%0A%0A";

    // إضافة تفاصيل الزبون
    orderDetails += `👤 *اسم الزبون:* ${customerName || "غير معروف"}%0A`;
    orderDetails += `📞 *رقم الهاتف:* ${customerPhone || "غير معروف"}%0A`;
    orderDetails += `📍 *العنوان:* ${customerAddress || "غير معروف"}%0A%0A`;

    // إضافة تفاصيل الطلب
    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        const itemName = item.name;
        const itemPrice = item.price;
        const itemQuantity = cartItems[item._id];
        const itemTotal = itemPrice * itemQuantity;

        orderDetails += `🍴 *${itemName}*%0A`;
        orderDetails += `   🔹 الكمية: ${itemQuantity}%0A`;
        orderDetails += `   💰 السعر لكل وحدة: ${itemPrice} ل.ل%0A`;
        orderDetails += `   🏷️ الإجمالي: ${itemTotal} ل.ل%0A%0A`;
      }
    });

    // إضافة المجموع الكلي
    const subtotal = getTotalCartAmount();
    const deliveryFee = subtotal === 0 ? 0 : 100000;
    const totalAmount = subtotal + deliveryFee;

    orderDetails += "*ملخص الطلب:*%0A";
    orderDetails += `   📌 *المجموع الفرعي:* ${subtotal} ل.ل%0A`;
    orderDetails += `   🚚 *رسوم التوصيل:* ${deliveryFee} ل.ل%0A`;
    orderDetails += `   🏷️ *المجموع الكلي:* ${totalAmount} ل.ل%0A%0A`;

    // رسالة شكر
    orderDetails += "🙏 *شكرًا لاختياركم خدماتنا!* 🚀%0A";
    orderDetails += "📩 سيتم تجهيز طلبك قريبًا، إذا كان لديك أي استفسار لا تتردد في التواصل معنا.%0A%0A";
    orderDetails += "مع تحياتنا 💖,%0A";
    orderDetails += "فريق مطعم أفندي 🍽️";

    // إنشاء رابط الواتساب
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${orderDetails}`;

    // فتح واتساب في نافذة جديدة
    window.open(whatsappUrl, "_blank");
  };

  return (
    <form className='place-order'>
      <div className='place-order-left'>
        <p className='title'>Delivey Information</p>
        <div className='multi-fields'>
          <input type="text" 
                placeholder='اسم صاحب الطلبية'
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)} />
        </div>
        <input type="text" 
              placeholder='رقم الهاتف'
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)} />
        <input type="text" placeholder='العنوان' 
               value={customerAddress}
               onChange={(e) => setCustomerAddress(e.target.value)} />
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
              <p dir='rtl' lang='ar'>ل.ل {getTotalCartAmount() === 0 ? 0 : 100000}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total in Lira :</b>
              <b dir='rtl' lang='ar'>{getTotalCartAmount()+100000}ل.ل</b>
            </div>
          </div>
          <div dir='rtl'>
          <button lang='ar' type='button' onClick={handleConfirmOrder}>تأكيد الطلبية</button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder