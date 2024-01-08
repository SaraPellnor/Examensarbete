import { IoMdArrowDropdown } from "react-icons/io";

import "./Menu.css";
import { useEffect, useState } from "react";
const Menu = () => {
  const getmenuList = async () => {
    const data = await fetch("http://localhost:3000/categories/");
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
    setActiveUC(item.category_description);
    setActiveCategory(item.category_title);
    if (drawerDisplay == "none" && activeCategory == "") {
      setDrawerDisplay("flex");
      setActiveCategory(item.category_title);
    } else if (
      drawerDisplay == "flex" &&
      activeCategory != (item.category_title || "")
    ) {
      setDrawerDisplay("flex");
      setActiveCategory(item.category_title);
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
        <li>HEM</li>
        {menuList.map((item) => (
          <li onClick={() => openDrawer(item)} key={item._id}>
            {item.category_title}
            <IoMdArrowDropdown />
          </li>
        ))}
      </ul>
      <div className="menuDrawer" style={{ display: drawerDisplay }}>
        <img src="../../../src/assets/handcare.jpg" alt="handcare" />

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
