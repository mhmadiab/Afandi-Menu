import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar/Navbar"
import Home from "./pages/home/Home.jsx"
import Cart from "./pages/cart/Cart"
import PlaceOrder from "./pages/place-order/PlaceOrder"
import Footer from "./components/Footer/Footer.jsx"
import ScrollToTop from "./components/ScrollTop/ScrollTop.jsx"

const App = () => {
  
  return (
    <>
    <div className="app">
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={<PlaceOrder />} />
      </Routes>
    </div>
    <Footer />
    </>
  )
}

export default App
