import Search from "../Search/Search";
import Menu from "../Menu/Menu";


import { FaFacebookF } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

import { BsCart3 } from "react-icons/bs";
import { CiHeart } from "react-icons/ci";
import { CiUser } from "react-icons/ci";

import "./Header.css";

const Header = () => {
  return (
    <header>
      <div className="headerTop">
        <div className="iconDiv">
            <FaFacebookF />
            <FaLinkedinIn />
            <FaYoutube />
            <FaInstagram />
        </div>
        <div className="offersDiv">Fri frakt i Sverige när du handlar för över 599 SEK
</div>
      </div>
      <div className="headerBottom">
        <div className="headerBottomTop">
          <div className="logoDiv">
            <img src="../../../src/assets/Logo.png" alt="Logo" />
          </div>
          <div className="searchDiv">
            <Search />
          </div>
          <div className="userIconsDiv">
            <BsCart3 />
            <CiHeart />
            <CiUser />
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
