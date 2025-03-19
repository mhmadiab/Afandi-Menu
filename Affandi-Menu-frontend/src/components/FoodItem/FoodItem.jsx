import { useContext } from 'react'
import { assets } from '../../assets/assets/frontend_assets/assets'
import './FoodItem.css'
import { StoreContext } from '../context/StoreContext'

// eslint-disable-next-line react/prop-types
const FoodItem = ({id, name, price, description, image}) => {

    
    const {cartItems , addToCart, removeFromCart, url} = useContext(StoreContext)

  return (
    <div className='food-item'>
        <div className="food-item-image-container">
            <img src={`${image}`} alt="" className='food-item-image' />
            {
                !cartItems[id] ? <img src={assets.add_icon_white} alt="" className='add' onClick={() => addToCart(id)} />
                : <div className='food-item-counter'>
                    <img src={assets.remove_icon_red} onClick={()=> removeFromCart(id)} alt="" />
                    <p>{cartItems[id]}</p>
                    <img src={assets.add_icon_green} onClick={()=> addToCart(id)} alt="" />
                </div>
            }
        </div>
        <div className="food-item-info" dir='rtl' lang='ar'>
            <div className="food-item-name-rating">
                <p>{name}</p>
                {/* <img src={assets.rating_starts} alt="" /> */}
            </div>
            <p className='food-item-desc'>{description}</p>
            <p className='food-item-price'>{price }ل.ل</p>
            {/* <p className='food-item-size'>{size}</p> */}
        </div>
    </div>
  )
}

export default FoodItem