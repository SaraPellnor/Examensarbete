import { useContext } from "react"
import "./ErrorPage.css"
import { OrderContext } from "../../Context/OrderContext"

const ErrorPage = () => {

  // ----- Accessing the errorMessage from the OrderContext

  const { errorMessage } = useContext(OrderContext)


  // ----- Render the error page

  return (
    <div className="errorPage">
      <img src="../../../src/assets/error.jpg" alt="" />
      
      <div className="errorMessage">{errorMessage}</div>
    </div>
  )
}

export default ErrorPage;
