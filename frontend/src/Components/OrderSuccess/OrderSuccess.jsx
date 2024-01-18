/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from "react";
import { OrderContext } from "../../Context/OrderContext";
import "./OrderSuccess.css";
import { UserContext } from "../../Context/UserContext";

const OrderSuccess = () => {
  const { cart, createOrder } = useContext(OrderContext);
  const { loggedinUser } = useContext(UserContext);

  useEffect(() => {
    if (
      cart.length !== 0 &&
      loggedinUser !== undefined &&
      loggedinUser !== "User is not logged in"
    ) {
      createOrder();
    }
  }, [cart, loggedinUser]);
  return (
    <div className="orderSuccess">
      <h2>Tack för din order!</h2>
    </div>
  );
};

export default OrderSuccess;
