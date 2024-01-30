import { useContext } from "react"
import "./ErrorPage.css"
import { OrderContext } from "../../Context/OrderContext"

const ErrorPage = () => {

  // ----- Accessing the errorMessage from the OrderContext

  const { errorMessage } = useContext(OrderContext)
console.log(errorMessage);

  // ----- Render the error page

  return (
    <div className="errorPage">
      <img src="../../../src/assets/error.jpg" alt="" />
      
      <div className="errorMessage">{toString(errorMessage)}</div>
    </div>
  )
}

export default ErrorPage;
