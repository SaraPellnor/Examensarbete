import { useContext } from "react";
import { Link } from "react-router-dom";
import { FaRegTrashCan } from "react-icons/fa6";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";

import "./CartDrawer.css";
import { OrderContext } from "../../Context/OrderContext";
import { useEffect } from "react";

const CartDrawer = () => {
  const { cart, setCart, setCartNum, getCheckout, totalPriceFunction, totalPrice } = useContext(OrderContext);


  const removeAll = () => {
    localStorage.removeItem("cart");
    setCartNum(0);
    setCart([]);

    console.log("removed all");
  };

  const removeOne = (productId) => {
    const updatedCart = cart
      .map((item) => {
        if (item._id === productId) {
          const updatedQuantity = Math.max(item.quantity - 1, 0);
          return { ...item, quantity: updatedQuantity };
        }
        return item;
      })
      // keeps only the product with quantity bigger than 0.
      .filter((item) => item.quantity > 0);

    setCart(updatedCart);
    setCartNum(updatedCart.length);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  useEffect(() => {
    totalPriceFunction();
  }, [setCart]);

  return (
    <div className="cartDrawer">
      {cart.length > 0 ? (
        <div className="cartDrawerDiv">
          <div className="cartDrawerDivTop">
            <button onClick={() => removeAll()}>
              <FaRegTrashCan /> Rensa Kundkorg
            </button>
          </div>
          <div className="productsInCarList">
            {cart.map((item) => (
              <div key={item._id} className="productInCart">
                <img
                  src={`../../../src/assets/${item.product_image}`}
                  alt={item.product_image}
                />
                <div className="productInfo">
                  <p>{item.product_title}</p>
                  <div className="productPrice">
                    <p>{item.product_price},00 SEK</p>
                    <div className="quantity">{item.quantity}</div>
                  </div>
                </div>
                <div className="productRemove">
                  <FaRegTrashCan
                    style={{ cursor: "pointer" }}
                    onClick={() => removeOne(item._id)}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="totalPriceDiv">
            <div className="totalPrice">
              <p>Totalt:</p>
              <p>{totalPrice},00 SEK</p>
            </div>
            <p>Lägg till rabattkod</p>
          </div>
          <div className="cartDrawerDivBottom">
            <Link to={"/"}>
              <button className="returnBtn">
                <MdArrowBackIos /> Fortsätt
              </button>
            </Link>
            <button className="bayBtn" onClick={() => getCheckout()}>
              Till kassan <MdArrowForwardIos />
            </button>
          </div>
        </div>
      ) : (
        <div className="cartEmpty">
          <p>Din kundkorg är tom</p>
          <Link to={"/"}>
            <button className="returnBtn">
              <MdArrowBackIos /> Fortsätt handla
            </button>{" "}
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartDrawer;
