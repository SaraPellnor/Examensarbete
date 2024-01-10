/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";


export const ProductContext = createContext();

export const ProductProvider = ({children}) => {
  const [products, setProducts] = useState([]);
  const [productDetail, setProductDetail] = useState({})

  const getProducts = async () => {
    const data = await fetch("http://localhost:3000/products/");
    const res = await data.json();
    setProducts(res);
  };

  const getProductDetails = async (id) => {
    const data = await fetch(`http://localhost:3000/products/${id.id}`);
    const res = await data.json();
    setProductDetail(res);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <ProductContext.Provider value={{products, getProductDetails, productDetail}}>
      {children}
    </ProductContext.Provider>
  );
};
