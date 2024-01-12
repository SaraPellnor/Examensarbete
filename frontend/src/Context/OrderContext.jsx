/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [cart, setCart] = useState([]);
  const [cartNum, setCartNum] = useState(0);

  const getOrders = async () => {
    const data = await fetch("http://localhost:3000/app/order");
    const res = await data.json();
    setOrders(res);
  };

  const addToCart = (product, quantity) => {
    const existingProductIndex = cart.findIndex(
      (item) => item._id === product._id
    );

    if (existingProductIndex !== -1) {
      cart[existingProductIndex].quantity += quantity;
    } else {
      cart.push({ ...product, quantity });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    setCart(cart);
    setCartNum(cart.length);
  };

  const shippedFunction = async (order) => {
    try {
      const { _id, ...orderWithoutId } = order;

      await fetch(`http://localhost:3000/app/order/update/${_id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ ...orderWithoutId, shipped: !order.shipped }),
      });
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };

  //DOSENT WORK--------------------------------------------
  const orderRemove = async (id) => {
    console.log(id);
    try {
      const data = await fetch(`http://localhost:3000/app/order/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const res = await data.json();
      console.log(res, " order is removed!");
      getOrders();
    } catch (error) {
      console.log("Error in orderRemove: ", error);
    }
  };

  const conectToLS = () => {
    const inCart = JSON.parse(localStorage.getItem("cart"));
    if (!inCart) {
      localStorage.setItem("cart", "[]");
    } else {
      setCart(inCart);
      setCartNum(inCart.length);
    }
  };

  useEffect(() => {
    conectToLS();
  }, []);

  return (
    <OrderContext.Provider
      value={{
        addToCart,
        cartNum,
        setCartNum,
        cart,
        setCart,
        getOrders,
        orders,
        setOrders,
        shippedFunction,
        orderRemove,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
