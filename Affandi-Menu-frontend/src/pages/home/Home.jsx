import './Home.css'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import { useContext, useState, useEffect} from 'react'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import { StoreContext } from '../../components/context/StoreContext'
import { Link } from 'react-router-dom'

const Home = () => {
  const [category , setCategory] = useState("All")

  const {getTotalCartAmount, getTotalCart} = useContext(StoreContext)

  const [showCartDiv, setShowCartDiv] = useState(false);

  // Get the total number of items in the cart
  const totalCartItems = getTotalCart();

  // Handle scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY || window.pageYOffset;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Show the div if the user scrolls up and is not near the footer
      if (scrollPosition < documentHeight - windowHeight - 100) {
        setShowCartDiv(true);
      } else {
        setShowCartDiv(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div>
        <Header />
        <ExploreMenu category={category} setCategory={setCategory}/>
        <FoodDisplay category={category}/>
        {totalCartItems > 0 && (
        <div className={`cart-bottom-div ${showCartDiv ? 'fade-in' : 'fade-out'}`}>
          <p>Total Cart Amount: ل.ل{getTotalCartAmount()}</p>
          <Link to="/cart">
            <button style={{
              backgroundColor: 'green',
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}>
              Proceed to Cart
            </button>
          </Link>
        </div>
      )}
    </div>
  )
}

export default Home