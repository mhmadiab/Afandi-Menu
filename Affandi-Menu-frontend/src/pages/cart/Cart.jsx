import { useContext } from 'react';
import './Cart.css';
import { StoreContext } from '../../components/context/StoreContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount, url } = useContext(StoreContext);
  const navigate = useNavigate();

  const cartTotal = getTotalCartAmount();
  const isCartEmpty = cartTotal === 0; // Check if cart is empty

  return (
    <div  className='cart'>
      {isCartEmpty ? (
        <h2 className="empty-cart-message">🛒 سلة التسوق فارغة</h2>
      ) : (
        <>
          <div id="cart-top" className="cart-items">
            <div className="cart-items-title">
              <p>Items</p>
              <p>Title</p>
              <p>Price</p>
              <p>Quantity</p>
              <p>Total</p>
              <p>Remove</p>
            </div>
            <br />
            <hr />
            {food_list.map((item, index) => {
              if (cartItems[item._id] > 0) {
                return (
                  <div key={index}>
                    <div className='cart-items-title cart-items-item'>
                      <img src={`${item.image}`} alt="" />
                      <p>{item.name}</p>
                      <p>{item.price}</p>
                      <p>{cartItems[item._id]}</p>
                      <p>{item.price * cartItems[item._id]}</p>
                      <p className='cross' onClick={() => removeFromCart(item._id)}>x</p>
                    </div>
                    <hr />
                  </div>
                );
              }
              return null;
            })}
          </div>
          <div className="cart-bottom">
            <div className="cart-total">
              <h2>Cart Total: </h2>
              <div>
                <div className="cart-total-details">
                  <p>Subtotal</p>
                  <p>{cartTotal}</p>
                </div>
                <hr />
                <div className="cart-total-details">
                  <b>Total in Lira :</b>
                  <b dir='rtl' lang='ar'>{cartTotal} ل.ل</b>
                </div>
              </div>
              <button onClick={() => navigate('/order')}>PROCEED TO CHECKOUT</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
