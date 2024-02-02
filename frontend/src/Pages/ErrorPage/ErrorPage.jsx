import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { OrderContext } from "../../Context/OrderContext";
import { UserContext } from "../../Context/UserContext";
import { ProductContext } from "../../Context/ProductContext";

import "./ErrorPage.css";

const ErrorPage = () => {
  // ----- Accessing the errorMessage from the Context
const navigateTo = useNavigate()
  const { orderErrorMessage } = useContext(OrderContext);
  const { userErrorMessage } = useContext(UserContext);
  const { productErrorMessage } = useContext(ProductContext);

  // ----- Render the error page
const hej = "hej"
if (hej=="Hej") return console.log("funkar");
  return (
    <div className="errorPage">
      <img src="../../../src/assets/error.jpg" alt="" />
      {orderErrorMessage && (
        <p className="errorMessage">Order Error: {orderErrorMessage}</p>
      )}
      {userErrorMessage && (
        <p className="errorMessage">User Error: {userErrorMessage}</p>
      )}
      {productErrorMessage && (
        <p className="errorMessage">Product Error: {productErrorMessage}</p>
      )}
      <button onClick={() =>  navigateTo("/")}>Tillbaka</button>
    </div>
  );
};

export default ErrorPage;
