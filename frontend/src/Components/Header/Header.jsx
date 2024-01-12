import Search from "../Search/Search";
import Menu from "../Menu/Menu";

import { FaFacebookF } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

import { BsCart3 } from "react-icons/bs";
import { CiHeart } from "react-icons/ci";
import { CiUser } from "react-icons/ci";

import { Link } from "react-router-dom";

import "./Header.css";
import { useContext } from "react";
import { OrderContext } from "../../Context/OrderContext";
import LangBtn from "../LangBtn/LangBtn";

const Header = () => {
  const { cartNum } = useContext(OrderContext);

  return (
    <header>
      <div className="headerTop">
        <div className="iconDiv">
          <FaFacebookF />
          <FaLinkedinIn />
          <FaYoutube />
          <FaInstagram />
        </div>
        <div className="offersDiv">
          Fri frakt i Sverige när du handlar för över 599 SEK
        </div>
<LangBtn />
      </div>
      <div className="headerBottom">
        <div className="headerBottomTop">
          <div className="logoDiv">
            <Link to={"/"}>
              <img src="../../../src/assets/Logo.png" alt="Logo" />
            </Link>
          </div>
          <div className="searchDiv">
            <Search />
          </div>
          <div className="userIconsDiv">
            <Link to={"/cart"}>
              
              <div className="inCartDiv">
                <div className="cartNum">{cartNum}</div>
                <BsCart3 />
              </div>
            </Link>
            <CiHeart />
            <Link to={"/orders"}><CiUser /></Link>
          </div>
        </div>
        <div className="headerBottomUnder">
          <div className="menuDiv">
            <Menu />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
