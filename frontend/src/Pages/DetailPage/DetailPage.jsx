/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../../Context/ProductContext";
import { useParams } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import "./DetailPage.css";
import { OrderContext } from "../../Context/OrderContext";

const DetailPage = () => {


  // ---- Extracting the 'id' parameter from the URL

  const id = useParams();
  

  // ---- State to track the quantity of the product

  const [quantity, setQuantity] = useState(1);
  

  // ----- Accessing functions and data from the ProductContext and OrderContext

  const { getProductDetails, productDetail } = useContext(ProductContext);
  const { addToCart } = useContext(OrderContext);


  // ----- Function to increase the quantity

  const handleAdd = () => {
    setQuantity(quantity + 1);
  };


  // ----- Function to decrease the quantity, but not below 1

  const handleRemove = () => {
    quantity > 1 && setQuantity(quantity - 1);
  };


  // ----- Fetch product details when the component mounts

  useEffect(() => {
    getProductDetails(id);
  }, []);


  // ----- Render the product details page
  
  return (
    <div className="detailpageDiv">
      <div className="breadcrumb">
        {`Products > ${productDetail.product_title}`}{" "}
      </div>
      <div className="detailpage">
        <img
          src={`../../../src/assets/${productDetail.product_image}`}
          alt=""
        />
        <div className="details">
          <h1>{productDetail.product_title}</h1>
          <h2>{productDetail.product_price},00 SEK</h2>
          <div className="handleAddProductDiv">
            <div onClick={() => handleRemove()} className="removeQuantityBtn">
              -
            </div>
            <div className="quantity">{quantity}</div>
            <div onClick={() => handleAdd()} className="addQuantityBtn">
              +
            </div>
            <button onClick={() => addToCart(productDetail, quantity)}>
              <FaShoppingCart /> LÄGG I KUNDKORGEN
            </button>
          </div>
        </div>
      </div>
      <div className="description">
        <h3>Beskrivning</h3>
        <p>{productDetail.product_description}</p>
      </div>
    </div>
  );
};

export default DetailPage;
