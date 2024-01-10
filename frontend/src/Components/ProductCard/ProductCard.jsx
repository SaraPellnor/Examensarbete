import { useContext } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { ProductContext } from "../../Context/ProductContext";

import "./ProductCard.css";
import { OrderContext } from "../../Context/OrderContext";
const ProductCard = () => {
  const { products } = useContext(ProductContext);
  const { addToCart } = useContext(OrderContext);
  !products && <p>Loading...</p>;

  return (
    products &&
    products.map((item) => (
      <div key={item._id} className="productCard">
        {/* <Link to={`product/${item._id}`}> */}
          <img src={`../../../src/assets/${item.product_image}`} alt="shampo" />
        {/* </Link> */}
        <Link to={`product/${item._id}`}>
          <div>
            <p className="title">{item.product_title}</p>
            <p>{item.product_price},00 SEK</p>
          </div>
        </Link>
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
