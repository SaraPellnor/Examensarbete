import { useContext } from "react"
import "./ErrorPage.css"
import { OrderContext } from "../../Context/OrderContext"

const ErrorPage = () => {
  const {errorMessage} = useContext(OrderContext)
  return (
    <div className="errorPage">
        <img src="../../../src/assets/error.jpg" alt="" />
        <div className="errorMessage">{errorMessage}</div>
    </div>
  )
}

export default ErrorPage