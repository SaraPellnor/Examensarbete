/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from "react";
import { OrderContext } from "../../Context/OrderContext";
import { UserContext } from "../../Context/UserContext";
import ReturnBtn from "../ReturnBtn/ReturnBtn";

import "./OrderSuccess.css";

const OrderSuccess = () => {


  // ----- Destructuring necessary functions and data from context

  const { cart, createOrder } = useContext(OrderContext);
  const { loggedinUser } = useContext(UserContext);


  // ----- Creating an order when the component mounts and cart is not empty

  useEffect(() => {
    if (
      cart.length !== 0 &&
      loggedinUser !== undefined &&
      loggedinUser !== "User is not logged in"
    ) {
      createOrder();
    }
  }, [cart]);

  return (
    <div className="orderSuccess">
      <h2>Tack för din order!</h2>
      <ReturnBtn />
    </div>
  );
};

export default OrderSuccess;
