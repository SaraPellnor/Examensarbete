/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { ProductContext } from "../../Context/ProductContext";
import { OrderContext } from "../../Context/OrderContext";

import "./ProductCard.css";


const ProductCard = () => {


  // ----- Destructuring the products array and addToCart function from context

  const { products } = useContext(ProductContext);
  const { addToCart } = useContext(OrderContext);

useEffect(() =>{

},[products])
  return (


    // ----- Mapping through products to create product cards

    products &&
    products.map((item) => (
      <div key={item._id} className="productCard">
        <img src={`../../../src/assets/${item.product_image}`} alt="shampo" />


        {/* Linking to the product details page */}

        <Link to={`product/${item._id}`}>
          <div>
            <p className="title">{item.product_title}</p>
            <p>{item.product_price},00 SEK</p>
          </div>
        </Link>


        {/* Icons for adding to cart and favorite */}

        <div className="icons">
          <div className="cart" onClick={() => addToCart(item, 1)}>
            <FaShoppingCart />
          </div>
          <div className="heart">
            <FaHeart />
          </div>
        </div>
      </div>
    ))
  );
};

export default ProductCard;
