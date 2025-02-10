import { assets } from '../../assets/assets/frontend_assets/assets'
import './Footer.css'



const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <img src={assets.logoAfandiPNG} alt="" className='footer-logo'/>
                <i>Nothing beats our delecious crepe and juice.</i>
            </div>
            <div className="footer-content-right">
                <h2>AFANDI</h2>
                <ul>
                    <li><a href="#explore-menu">Home</a></li>
                    <li>Contact us</li>
                    <li>Delivery</li>
                </ul>
            </div>
            <div className="footer-content-center">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>+961-71301068</li>
                    <li>Nabatieh, Ebba - Main Street</li>
                    <li>
                        <h3>@Afandi.juice</h3>
                    </li>
                </ul>
            </div>
        </div>
        <hr />
        <p className="footer-copyright">
            &copy; 2023 Affandi. All rights reserved.
        </p>
        <h6>designed by: @mhmadiab</h6>
    </div>
  )
}

export default Footer