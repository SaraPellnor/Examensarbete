import { Link } from "react-router-dom";
import { IoMdArrowDropdown } from "react-icons/io";
import { useContext, useState } from "react";

import "./Menu.css";
import { ProductContext } from "../../Context/ProductContext";

const Menu = () => {
  // ----- State variables to manage menu and drawer display

  const [drawerDisplay, setDrawerDisplay] = useState("none");
  const { categories, getProductByCategory,getProducts } = useContext(ProductContext);
  const [activeUC, setActiveUC] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");

  const menuList = categories.filter((item) => item.type === "menu");

  const ucList = categories.filter((item) => item.type === "uc");

  // ----- Function to open/close the drawer based on the selected category

  const openDrawer = (item) => {
    setActiveUC(item.category_description);
    setActiveCategory(item);

    if (drawerDisplay === "none" && activeCategory === "") {
      setDrawerDisplay("flex");
      setActiveCategory(item);
    } else if (drawerDisplay === "flex" && activeCategory !== (item || "")) {
      setDrawerDisplay("flex");
      setActiveCategory(item);
    } else {
      setDrawerDisplay("none");
      setActiveCategory("");
    }
  };

  // ----- Function to handle mouse leave event and close the drawer

  const handleOnMouseLeave = () => {
    setDrawerDisplay("none");
    setActiveCategory("");
  };

  return (
    <div onMouseLeave={() => handleOnMouseLeave()} className="menu">
      <ul>
        <Link to={"/"}>
          <li onClick={getProducts}>HEM</li>
        </Link>
        {menuList.map((item) => (
          <li
            onClick={() => {
              openDrawer(item);
              getProductByCategory(item._id);
            }}
            key={item._id}
          >
            {item.category_title}
            <IoMdArrowDropdown />
          </li>
        ))}
      </ul>
      <div className="menuDrawer" style={{ display: drawerDisplay }}>
        <img
          src={`../../../src/assets/${activeCategory.category_image}`}
          alt={activeCategory.category_image}
        />

        {/* Displaying subcategories and their descriptions */}

        {activeUC.map((id) => {
          const uc = ucList.find((item) => item._id == id);
          return (
            <div className={"ucDiv"} key={uc.category_title}>
              <h6>{uc.category_title}</h6>
              {uc.category_description.map((item) => (
                <p onClick={()=>getProductByCategory(item._id)} key={item}>{item}</p>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Menu;
