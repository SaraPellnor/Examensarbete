/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from "react";
import { FaRegTrashCan } from "react-icons/fa6";

import "./OrderPage.css";
import { OrderContext } from "../../Context/OrderContext";
import { ProductContext } from "../../Context/ProductContext";
import { UserContext } from "../../Context/UserContext";
import ReturnBtn from "../ReturnBtn/ReturnBtn";

const OrderPage = () => {
  const { orders, shippedFunction, orderRemove, getOrders } =
    useContext(OrderContext);
  const { products } = useContext(ProductContext);
  const { loggedinUser } = useContext(UserContext);
  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className="orderPage">
      {orders.length > 0 ? (
        <div className="orderPageDiv">
          {orders.map((order) => (
            <div key={order._id}>
              <div className="order">
                <div className="orderInfo">
                  {loggedinUser.ia_admin && (
                    <p>Customer: {loggedinUser.username}</p>
                  )}
                  <p>Orderdatum: {order.date}</p>
                  <p
                    style={{ color: order.shipped ? "green" : "red" }}
                    onClick={() =>
                      loggedinUser.is_admin && shippedFunction(order)
                    }
                  >
                    {order.shipped ? "Skickad" : "Ej skickad"}
                  </p>
                </div>
                {order.product_ID.map((id) => {
                  const product = products.find((item) => item._id == id);
                  return product ? (
                    <div key={product._id} className="product">
                      <img
                        src={`../../../src/assets/${product.product_image}`}
                        alt={product.product_image}
                      />
                      <div className="productInfo">
                        <p>{product.product_title}</p>
                        <div className="productPrice">
                          <p>{product.product_price},00 SEK</p>
                          <div className="quantity">1</div>
                        </div>
                      </div>
                    </div>
                  ) : null;
                })}
                <div className="orderInfo">
                  <p>{order.total_price},00 SEK</p>
                  {loggedinUser.is_admin && (
                    <button
                      className="orderRemove"
                      onClick={() => orderRemove(order._id)}
                    >
                      <FaRegTrashCan style={{ cursor: "pointer" }} /> Arkivera
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}

          <div className="OrderPageDivBottom"></div>
        </div>
      ) : (
        <div className="OrderPageEmpty">
          <p>Du har inga odrar</p>

        </div>
      )}
      <div className="orderPageBottom">
       < ReturnBtn />
      </div>
    </div>
  );
};

export default OrderPage;
