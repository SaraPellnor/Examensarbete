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
  const [categories, setCategories] = useState([]);

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

// ----- Creates a new product on MongoDB

  const createProduct = async (product) => {
    console.log(product);
    try {
      const data = await fetch("http://localhost:3000/app/products/create/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(product),
      });
      if (!data.ok) {
        window.alert("Du måste fylla i alla fält!");
      }
      getProducts();
    } catch (error) {
      console.log(error);
      setErrorMessage(error.message);
      navigateTo("/error");
    }
  };

  // ----- Uppdates product in MongoDB

  const updateProduct = async (product, id) => {
    try {
      const data = await fetch(
        `http://localhost:3000/app/products/update/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(product),
        }
      );
      if (!data.ok) {
        window.alert("Du måste fylla i alla fält!");
      }
      getProducts();
    } catch (error) {
      console.log(error);
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

  const getCategories = async () => {
    try {
      const data = await fetch("http://localhost:3000/app/categories/");
      const res = await data.json();
      setCategories(res);
    } catch (error) {
      setErrorMessage(error.message);
      navigateTo("/error");
    }
  };

  // ----- useEffect hook to fetch products on component mount

  useEffect(() => {
    getProducts();
    getCategories();
  }, []);

  // ----- Provide product-related context to children components

  return (
    <ProductContext.Provider
      value={{
        products,
        setProducts,
        getProductDetails,
        productDetail,
        categories,
        updateProduct,
        createProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
