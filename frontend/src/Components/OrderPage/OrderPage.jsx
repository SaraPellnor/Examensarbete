import { useContext } from "react";
import { Link } from "react-router-dom";
import { FaRegTrashCan } from "react-icons/fa6";
import { MdArrowBackIos } from "react-icons/md";

import "./OrderPage.css";
import { OrderContext } from "../../Context/OrderContext";
import { useEffect } from "react";
import { ProductContext } from "../../Context/ProductContext";
import { UserContext } from "../../Context/UserContext";

const CartDrawer = () => {
  const { orders, shippedFunction, orderRemove } = useContext(OrderContext);
  const { loggedinUser } = useContext(UserContext);
  const { products } = useContext(ProductContext);
  console.log(orders);
  console.log(loggedinUser);
  useEffect(() => {}, []);

  return (
    <div className="orderPage">
      {orders.length > 0 ? (
        <div className="orderPageDiv">
          {orders.map((order) => (
            <div key={order._id}>
              <div className="order">
                <div className="orderInfo">
                  <p>Orderdatum: {order.date}</p>
                  <p
                    style={{ color: order.shipped ? "green" : "red" }}
                    onClick={() => shippedFunction(order)}
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
                  <button
                    className="orderRemove"
                    onClick={() => orderRemove(order._id)}
                  >
                    <FaRegTrashCan style={{ cursor: "pointer" }} /> Arkivera
                  </button>
                </div>
              </div>
            </div>
          ))}

          <div className="cartDrawerDivBottom"></div>
        </div>
      ) : (
        <div className="cartEmpty">
          <p>Du har inga odrar</p>
        </div>
      )}
      <div className="orderPageBottom">
        <Link to={"/"}>
          <button className="returnBtn">
            <MdArrowBackIos /> Fortsätt handla
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CartDrawer;
