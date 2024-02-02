/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from "react";
import { OrderContext } from "../../Context/OrderContext";
import { UserContext } from "../../Context/UserContext";
import ReturnBtn from "../../Components/ReturnBtn/ReturnBtn";

import "./OrderSuccess.css";

const OrderSuccess = () => {


  // ----- Destructuring necessary functions and data from context

  const { cart, getStripeOrder } = useContext(OrderContext);
  const { loggedinUser } = useContext(UserContext);


  // ----- Creating an order when the component mounts and cart is not empty

  useEffect(() => {
    if (
      cart.length !== 0 &&
      loggedinUser !== undefined &&
      loggedinUser !== "User is not logged in" &&
      loggedinUser !== false

    ) {
      getStripeOrder();
    }
  }, [loggedinUser]);

  return (
    <div className="orderSuccess">
      <h2>Tack för din order!</h2>
      <ReturnBtn />
    </div>
  );
};

export default OrderSuccess;
