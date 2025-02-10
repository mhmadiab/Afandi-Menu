import './Navbar.css'
import {assets} from '../../assets/assets/frontend_assets/assets'
import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { StoreContext } from '../context/StoreContext'
const Navbar = () => {

  const [menu , setMenu] = useState("home")

  const {getTotalCartAmount} = useContext(StoreContext)

  return (
    <div className='navbar'>
        <Link to="/"><img className='navbar-logo' src={assets.logoAffandi} alt="logo" /></Link>
        <ul className="navbar-menu">
          <Link to="/" className={menu === "home" ? "active" : ""} onClick={()=>setMenu("home")}>Home</Link>
          <a href="#explore-menu" className={menu === "menu" ? "active" : ""} onClick={()=>setMenu("menu")}>Menu</a>
          <a href='#footer' className={menu === "contact us" ? "active" : ""} onClick={()=>setMenu("contact us")}>Contact Us</a>
        </ul>
        <div className="navbar-right">
          <img src={assets.search_icon} alt="" />
          <div className="navbar-search-icon">
            <Link to="/cart"><img src={assets.basket_icon} alt="" className='basket-icon' /></Link>
            <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
          </div>
        </div>
    </div>
  )
}

export default Navbar