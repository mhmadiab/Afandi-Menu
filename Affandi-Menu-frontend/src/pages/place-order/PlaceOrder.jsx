import './PlaceOrder.css'
import { useContext } from 'react'
import {StoreContext} from '../../components/context/StoreContext'


const PlaceOrder = () => {

  const {getTotalCartAmount, cartItems, food_list} = useContext(StoreContext)

  
  
  const handleConfirmOrder = () => {
    
    const phoneNumber = '+96181034761'; 

    
    let orderDetails = '🎉 *Thank you for your order!* 🎉%0A%0A'; 
  orderDetails += '*Order Details:*%0A%0A'; 

  
  food_list.forEach((item) => {
    if (cartItems[item._id] > 0) {
      const itemName = item.name;
      const itemPrice = item.price;
      const itemQuantity = cartItems[item._id];
      const itemTotal = itemPrice * itemQuantity;

      
      orderDetails += `🍴 *${itemName}*%0A`;
      orderDetails += `   Quantity: ${itemQuantity}%0A`;
      orderDetails += `   Price per item: ${itemPrice}%0A`;
      orderDetails += `   Total: ${itemTotal}%0A%0A`;
    }
  });

  
  const totalAmount = getTotalCartAmount() + 100000;
  orderDetails += '*Summary:*%0A';
  orderDetails += `   Subtotal: $${getTotalCartAmount()}%0A`;
  orderDetails += `   Delivery Fee: ${100000}%0A`;
  orderDetails += `   *Total: ${totalAmount} ل.ل*%0A%0A`;

  // Add a thank-you message and instructions
  orderDetails += 'Thank you for choosing us! 🚀%0A';
  orderDetails += 'We will process your order shortly. If you have any questions, feel free to reply to this message.%0A%0A';
  orderDetails += 'Best regards,%0A';
  orderDetails += 'Your Restaurant Team ❤️';

    // Construct the WhatsApp URL
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${orderDetails}`;

    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');
  };

  return (
    <form className='place-order'>
      <div className='place-order-left'>
        <p className='title'>Delivey Information</p>
        <div className='multi-fields'>
          <input type="text" placeholder='الاسم' />
          <input type="text" placeholder='العائلة'/>
        </div>
        <input type="text" placeholder='رقم الهاتف' />
      </div>
      <div className="place-order-right">
      <div className="cart-total">
          <h2>Cart Total: </h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>{100000}</p>
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