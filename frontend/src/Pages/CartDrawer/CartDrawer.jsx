/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegTrashCan } from "react-icons/fa6";
import { MdArrowForwardIos } from "react-icons/md";
import { OrderContext } from "../../Context/OrderContext";
import ReturnBtn from "../../Components/ReturnBtn/ReturnBtn";

import "./CartDrawer.css";
import { UserContext } from "../../Context/UserContext";

// ----- Component definition

const CartDrawer = () => {
  const navigateTo = useNavigate()


  // ----- Destructuring values from OrderContext and userContext


  const {
    cart,
    setCart,
    setCartNum,
    getCheckout,
    totalPriceFunction,
    totalPrice,
  } = useContext(OrderContext);

  const {loggedinUser} = useContext(UserContext)


  // ----- Function to remove all items from the cart

  const removeAll = () => {
    localStorage.removeItem("cart");
    setCartNum(0);
    setCart([]);
  };


  // ----- Function to remove one quantity of a product from the cart

  const removeOne = (productId) => {
    const updatedCart = cart
      .map((item) => {
        if (item._id === productId) {
          const updatedQuantity = Math.max(item.quantity - 1, 0);
          return { ...item, quantity: updatedQuantity };
        }
        return item;
      })
      .filter((item) => item.quantity > 0);

    setCart(updatedCart);
    setCartNum(updatedCart.length);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleGetCheckout = () => {
    loggedinUser ? getCheckout() : navigateTo("/login")
  }


  // ----- useEffect to recalculate total price when the cart changes

  useEffect(() => {
    totalPriceFunction();
  }, [setCart]);


  // ----- JSX rendering based on cart content

  return (
    <div className="cartDrawer">
      {cart.length > 0 ? (


        // ----- Display when cart has items

        <div className="cartDrawerDiv">
          <div className="cartDrawerDivTop">
            <button onClick={() => removeAll()}>
              <FaRegTrashCan /> Ränsa
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
              <p>Totalt: {totalPrice},00 SEK</p>
            </div>
          </div>
          <div className="cartDrawerDivBottom">
            <ReturnBtn />

            <button className="bayBtn" onClick={() =>handleGetCheckout()}>
            Gå till betalning<MdArrowForwardIos />
            </button>
          </div>
        </div>
      ) : (


        // ----- Display when cart is empty

        <div className="cartEmpty">
          <p>Kundvagnen är tom</p>
          <ReturnBtn />
        </div>
      )}
    </div>
  );
};

export default CartDrawer;
