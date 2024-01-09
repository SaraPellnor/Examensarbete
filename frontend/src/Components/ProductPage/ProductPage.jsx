import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import "./ProductPage.css";

const ProductPage = () => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const data = await fetch("http://localhost:3000/products/");
    const res = await data.json();
    console.log(res);
    setProducts(res);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="productPage">
      {products.map((item) => (
        <Link key={item._id} className="productCard">
          <img src={`../../../src/assets/${item.product_image}`} alt="shampo" />
          <div>
            <p className="title">{item.product_title}</p>
            <p>{item.product_price},00 SEK</p>
          </div>
          <div className="icons">
            <div className="cart">
              <FaShoppingCart />
            </div>
            <div className="heart">
              <FaHeart />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductPage;
