import Search from "../Search/Search";
import Menu from "../Menu/Menu";

import { FaFacebookF } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

import { BsCart3 } from "react-icons/bs";
import { CiHeart } from "react-icons/ci";
import { CiUser } from "react-icons/ci";

import { GrLanguage } from "react-icons/gr";
import { IoMdArrowDropdown } from "react-icons/io";
import { Link } from "react-router-dom";

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
        <div className="offersDiv">
          Fri frakt i Sverige när du handlar för över 599 SEK
        </div>
        <div className="language">
          <GrLanguage /> Svenska <IoMdArrowDropdown />
        </div>
      </div>
      <div className="headerBottom">
        <div className="headerBottomTop">
          
            {" "}
            <div className="logoDiv">
            <Link to={"/"}>
              <img src="../../../src/assets/Logo.png" alt="Logo" />
              </Link>

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
