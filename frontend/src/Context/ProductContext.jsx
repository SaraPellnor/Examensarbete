/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */


import { createContext, useState, useEffect, useContext } from "react";
import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {


  // ----- State variables for products and product details

  const [products, setProducts] = useState([]);
  const [productDetail, setProductDetail] = useState({});


  // ----- Accessing user-related context and navigation

  const { setErrorMessage } = useContext(UserContext);
  const navigateTo = useNavigate();


  // ----- Function to fetch all products

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


  // ----- Function to fetch details of a specific product

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


  // ----- useEffect hook to fetch products on component mount

  useEffect(() => {
    getProducts();
  }, []);


  // ----- Provide product-related context to children components
  
  return (
    <ProductContext.Provider value={{ products, getProductDetails, productDetail }}>
      {children}
    </ProductContext.Provider>
  );
};
