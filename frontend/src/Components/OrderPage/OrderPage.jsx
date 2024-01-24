/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { OrderContext } from "../../Context/OrderContext";
import { ProductContext } from "../../Context/ProductContext";
import { UserContext } from "../../Context/UserContext";
import ReturnBtn from "../ReturnBtn/ReturnBtn";

import "./OrderPage.css";


const OrderPage = () => {


  // ----- Destructuring necessary functions and data from context

  const { orders, shippedFunction, orderRemove, getOrders } = useContext(OrderContext);
  const { products } = useContext(ProductContext);
  const { loggedinUser } = useContext(UserContext);


  // ----- Fetching user orders on component mount

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className="orderPage">
      {typeof orders !== "string" ? (
        <div className="orderPageDiv">


          {/* Mapping through user orders */}

          {orders.map((order) => (
            <div key={order._id}>
              <div className="order">
                <div className="orderInfo">


                  {/* Displaying customer information for admin */}

                  {loggedinUser.ia_admin && (
                    <p>Customer: {loggedinUser.username}</p>
                  )}
                  <p>Orderdatum: {order.date}</p>


                  {/* Displaying order status and enabling shipment update for admin */}

                  <p
                    style={{ color: order.shipped ? "green" : "red" }}
                    onClick={() => loggedinUser.is_admin && shippedFunction(order)}
                  >
                    {order.shipped ? "Skickad" : "Ej skickad"}
                  </p>
                </div>


                {/* Mapping through products in the order */}

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


                  {/* Displaying total price and providing archive button for admin */}

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


        // ----- Displaying a message if the user has no orders

        <div className="OrderPageEmpty">
          <p>{orders}</p>
        </div>
      )}


      {/* Return button at the bottom of the page */}
      
      <div className="orderPageBottom">
        <ReturnBtn />
      </div>
    </div>
  );
};

export default OrderPage;
