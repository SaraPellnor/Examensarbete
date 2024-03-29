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

import { useContext, useState } from "react";
import { OrderContext } from "../../Context/OrderContext";
import LangBtn from "../LangBtn/LangBtn";
import { UserContext } from "../../Context/UserContext";
import UserDropDown from "../UserDropDown/UserDropDown";

import "./Header.css";
import { ProductContext } from "../../Context/ProductContext";

const Header = () => {

  // ----- Accessing cartNum and loggedinUser from OrderContext and UserContext

  const { cartNum } = useContext(OrderContext);
  const { loggedinUser } = useContext(UserContext);
  const { getProducts } = useContext(ProductContext);


  // ----- State for controlling the display of user dropdown
  
  const [dropDownDisplay, setDropDownDisplay] = useState(false);

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
          Få 10% med rabattkoden SOMMAR2024 om du handlar för över 100 kr
        </div>
        <LangBtn />
      </div>
      <div className="headerBottom">
        <div className="headerBottomTop">
          <div className="logoDiv">
            <Link to={"/"}>
              <img onClick={getProducts} src="../../../src/assets/Logo.png" alt="Logo" />
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
            <div
              onClick={() => setDropDownDisplay(dropDownDisplay ? false : true)}
              className="handleUserIconDiv"
            >
              <CiUser />
              {!loggedinUser ||
                (loggedinUser != "User is not logged in" && (
                  <div className="userIconDot"></div>
                ))}

              {dropDownDisplay && <UserDropDown />}
            </div>
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
