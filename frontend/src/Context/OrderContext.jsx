/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [cart, setCart] = useState([]);
  const [cartNum, setCartNum] = useState(0);

  const getOrders = async () => {
    const data = await fetch("http://localhost:3000/order/");
    const res = await data.json();
    setOrders(res);
    console.log(orders);
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
    getOrders();
  }, []);

  return (
    <OrderContext.Provider value={{ addToCart, cartNum }}>
      {children}
    </OrderContext.Provider>
  );
};
