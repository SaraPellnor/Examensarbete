import {Routes, Route} from "react-router-dom"
import ProductPage from "../ProductPage/ProductPage"
import OrderPage from "../OrderPage/OrderPage"
import DetailPage from "../DetailPage/DetailPage"
import LoginPage from "../LoginPage/LoginPage"
import "./Main.css"
import CartDrawer from "../CartDrawer/CartDrawer"
const Main = () => {
  return (
    <div className="main">
      <Routes>
        <Route path="/" element={<ProductPage />} />
        <Route path="/cart" element={<CartDrawer />} />
        <Route path="/orders" element={<OrderPage />} />
        <Route path="/product/:id" element={<DetailPage />} />
        <Route path="/login" element={<LoginPage />} />

      </Routes>
    </div>
  )
}

export default Main