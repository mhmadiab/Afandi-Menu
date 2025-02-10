import './PlaceOrder.css'
import { useContext } from 'react'
import {StoreContext} from '../../components/context/StoreContext'
import {useNavigate} from 'react-router-dom'

const PlaceOrder = () => {

  const {getTotalCartAmount} = useContext(StoreContext)
  
  const navigate = useNavigate()

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
          <button onClick={()=>navigate('/order')} lang='ar'>تأكيد الطلبية</button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder