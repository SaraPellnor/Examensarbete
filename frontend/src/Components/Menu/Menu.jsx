import {Link} from "react-router-dom"
import { IoMdArrowDropdown } from "react-icons/io";

import "./Menu.css";
import { useEffect, useState } from "react";
const Menu = () => {
  const getmenuList = async () => {
    const data = await fetch("http://localhost:3000/app/categories/");
    const res = await data.json();
    const menuList = await res.filter((item) => item.type === "menu");
    setMenuList(await menuList);
    const ucList = await res.filter((item) => item.type === "uc");
    setUCList(await ucList);
  };

  const [drawerDisplay, setDrawerDisplay] = useState("none");
  const [menuList, setMenuList] = useState([]);
  const [ucList, setUCList] = useState([]);
  const [activeUC, setActiveUC] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");

  const openDrawer = (item) => {
    console.log(activeCategory);
    console.log(item);
    setActiveUC(item.category_description);
    setActiveCategory(item);
    if (drawerDisplay == "none" && activeCategory == "") {
      setDrawerDisplay("flex");
      setActiveCategory(item);
    } else if (
      drawerDisplay == "flex" &&
      activeCategory != (item || "")
    ) {
      setDrawerDisplay("flex");
      setActiveCategory(item);
    } else {
      setDrawerDisplay("none");
      setActiveCategory("");
    }
  };

  const handleOnMouseLeave = () => {
    setDrawerDisplay("none");
    setActiveCategory("");
  };

  useEffect(() => {
    getmenuList();
  }, []);

  return (
    <div onMouseLeave={() => handleOnMouseLeave()} className="menu">
      <ul>
        <Link to={"/"}><li>HEM</li></Link>
        {menuList.map((item) => (
          <li onClick={() => openDrawer(item)} key={item._id}>
            {item.category_title}
            <IoMdArrowDropdown />
          </li>
        ))}
      </ul>
      <div className="menuDrawer" style={{ display: drawerDisplay }}>
        <img src={`../../../src/assets/${activeCategory.category_image}`} alt={activeCategory.category_image} />

        {activeUC.map((id) => {
          const uc = ucList.find((item) => item._id == id);
          return (
            <div className={"ucDiv"} key={uc.category_title}>
              <h6>{uc.category_title}</h6>
              {uc.category_description.map((item) => (
                <p key={item}>{item}</p>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Menu;
