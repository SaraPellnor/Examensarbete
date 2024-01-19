/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { createContext, useState, useEffect, useContext } from "react";
import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [cart, setCart] = useState([]);
  const [cartNum, setCartNum] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const { loggedinUser, setErrorMessage } = useContext(UserContext);
  const navigateTo = useNavigate();

  const getOrders = async () => {
    try {
      const data = await fetch("http://localhost:3000/app/order", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      // Handle errors
      if (data.ok) {
        const res = await data.json();

        if (res) {
          setOrders(res);
        } else {
          setErrorMessage(res);
          navigateTo("/error");
        }
      } else {
        setErrorMessage(data.status);

        navigateTo("/error");
      }
    } catch (error) {
      setErrorMessage(error.message);
      navigateTo("/error");
    }
  };

  // ----- Fors the window to stripe checkout page were customer can handle the payments

  const getCheckout = async () => {
    try {
      // New listItem with data that stripe session needs
      const lineItems = cart.map((product) => {
        return {
          price_data: {
            currency: "sek",
            product_data: { name: product.product_title },
            unit_amount: product.product_price * 100,
          },
          quantity: product.quantity,
        };
      });
      // All the data to POST to backend
      const dataToSend = {
        lineItems: lineItems,
        userEmail: loggedinUser.email,
      };

      const data = await fetch("http://localhost:3000/app/stripe/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(dataToSend),
      });

      if (!data.ok) {
        setErrorMessage(data.status);
        navigateTo("/error");
      }
      const res = await data.json();
      window.location = res.url;
    } catch (error) {
      console.log(error);
      setErrorMessage(error.message);
      navigateTo("/error");
    }
  };

  // returns date of today
  const date = () => {
    const today = new Date();

    const options = {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };

    const formattedDate = today.toLocaleString("sv-SE", options);

    return formattedDate;
  };

  const createOrder = async () => {
    if (
      cart.length === 0 ||
      loggedinUser === undefined ||
      loggedinUser === "User is not logged in"
    ) {
      setErrorMessage("Något gick fel vid skapandet av order...");
      navigateTo("/error");
    }

    try {
      const orderList = cart.map((product) => {
        return product._id;
      });

      const orderData = {
        user_ID: loggedinUser.user_id,
        product_ID: orderList,
        shipped: false,
        total_price: totalPrice,
        date: date(),
      };

      if (!orderList || !orderData) {
        setErrorMessage("Något gick fel vid skapandet av order...");
        navigateTo("/error");
      }

      const data = await fetch("http://localhost:3000/app/order/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(orderData),
      });

      // Handle errors

      if (!data.ok) {
        setErrorMessage(data.status);
        navigateTo("/error");
      }

      localStorage.clear("cart");
      setCart([]);
      setCartNum(0)
    } catch (error) {
      console.log(error);
      setErrorMessage(error.message);
      navigateTo("/error");
    }
  };

  // ----- Add products to cart and Local storage

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
      if (!_id || !orderWithoutId) {
        setErrorMessage(
          "Något gick fel när du försökte ändra på statusen på ordern"
        );
        navigateTo("/error");
      }
      const data = await fetch(
        `http://localhost:3000/app/order/update/${_id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ ...orderWithoutId, shipped: !order.shipped }),
        }
      );
      if (!data.ok) {
        setErrorMessage(data.status);
        navigateTo("/error");
      }

      getOrders();
    } catch (error) {
      console.log(error);
      setErrorMessage(error.message);
      navigateTo("/error");
    }
  };

  //DOSENT WORK--------------------------------------------
  const orderRemove = async (id) => {
    if (!id) {
      setErrorMessage("Något gick fel när du försökte ta bort en order");
      navigateTo("/error");
    }
    try {
      const data = await fetch(`http://localhost:3000/app/order/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const res = await data.json();
      if (!res || res === "you are not an admin, sorry") {
        setErrorMessage(res);
        navigateTo("/error");
      }

      getOrders();
    } catch (error) {
      console.log(error);
      setErrorMessage(error.message);
      navigateTo("/error");
    }
  };

  const totalPriceFunction = () => {
    // count together the value for each item in to acc
    const sum = cart.reduce((acc, item) => {
      return acc + item.product_price * item.quantity;
    }, 0);

    sum && setTotalPrice(sum);
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
    totalPriceFunction();
    conectToLS();
  }, [loggedinUser]);

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
        getCheckout,
        createOrder,
        totalPrice,
        totalPriceFunction,
        
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
