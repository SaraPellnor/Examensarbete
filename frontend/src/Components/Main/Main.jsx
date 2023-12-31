import {Routes, Route} from "react-router-dom"
import ProductPage from "../ProductPage/ProductPage"
import OrderPage from "../OrderPage/OrderPage"
import DetailPage from "../DetailPage/DetailPage"
import LoginPage from "../LoginPage/LoginPage"
import "./Main.css"
const Main = () => {
  return (
    <div className="main">
      <Routes>
        <Route path="/" element={<ProductPage />} />
        <Route path="/orders" element={<OrderPage />} />
        <Route path="/details" element={<DetailPage />} />
        <Route path="/login" element={<LoginPage />} />

      </Routes>
    </div>
  )
}

export default Main