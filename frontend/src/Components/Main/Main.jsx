import {Routes, Route} from "react-router-dom"
import ProductPage from "../ProductPage/ProductPage"
import OrderPage from "../OrderPage/OrderPage"
import DetailPage from "../DetailPage/DetailPage"
import LoginPage from "../LoginPage/LoginPage"
import CartDrawer from "../CartDrawer/CartDrawer"
import OrderSuccess from "../OrderSuccess/OrderSuccess"
import ErrorPage from "../ErrorPage/ErrorPage"
import "./Main.css"

const Main = () => {


  // ----- Configuring routes for different pages

  return (
    <div className="main">
      <Routes>
        <Route path="/" element={<ProductPage />} />
        <Route path="/cart" element={<CartDrawer />} />
        <Route path="/orders" element={<OrderPage />} />
        <Route path="/product/:id" element={<DetailPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/order-succsess" element={<OrderSuccess />} />
        <Route path="/error" element={<ErrorPage />} />
      </Routes>
    </div>
  )
}

export default Main