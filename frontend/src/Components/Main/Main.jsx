import {Routes, Route} from "react-router-dom"
import ProductPage from "../ProductPage/ProductPage"
import OrderPage from "../OrderPage/OrderPage"
import DetailPage from "../DetailPage/DetailPage"
import LoginPage from "../LoginPage/LoginPage"
import "./Main.css"
const Main = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<ProductPage />} />
        <Route path="/" element={<OrderPage />} />
        <Route path="/" element={<DetailPage />} />
        <Route path="/" element={<LoginPage />} />

      </Routes>
    </div>
  )
}

export default Main