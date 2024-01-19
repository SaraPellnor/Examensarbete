/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { createContext, useState, useEffect, useContext } from "react";
import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";


export const ProductContext = createContext();

export const ProductProvider = ({children}) => {
  const [products, setProducts] = useState([]);
  const [productDetail, setProductDetail] = useState({})
 
  const {  setErrorMessage } = useContext(UserContext);
  const navigateTo = useNavigate();

  const getProducts = async () => {
    try {
      const data = await fetch("http://localhost:3000/app/products/");
      const res = await data.json();
      setProducts(res);
    } catch (error) {
      setErrorMessage(error.message);
      navigateTo("/error");
    }

  };

  const getProductDetails = async (id) => {
    try {
      const data = await fetch(`http://localhost:3000/app/products/${id.id}`);
      const res = await data.json();
      setProductDetail(res);
    } catch (error) {
      setErrorMessage(error.message);
      navigateTo("/error");
    }
   
  };

  useEffect(() => {
    getProducts();
  },[]);

  return (
    <ProductContext.Provider value={{products, getProductDetails, productDetail}}>
      {children}
    </ProductContext.Provider>
  );
};
