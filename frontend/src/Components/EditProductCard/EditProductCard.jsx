/* eslint-disable react-hooks/exhaustive-deps */
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import { useContext, useEffect, useRef, useState } from "react";
import { ProductContext } from "../../Context/ProductContext";

import { UserContext } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { FaRegFolderOpen } from "react-icons/fa6";

import "./EditProductCard.css";

const EditProductCard = () => {
  const navigateTo = useNavigate();

  const { loggedinUser } = useContext(UserContext);

  const {
    products,
    setProducts,
    categories,
    updateProduct,
    createProduct,
    deleteProduct,
  } = useContext(ProductContext);

  const fileInputRef = useRef(null);

  const [inStock, setInStock] = useState();
  const [price, setPrice] = useState();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [image, setImage] = useState(false);
  const [productId, setProductId] = useState();

  const [categoryList, setCategoryList] = useState([]);
  const [dropdownActive, setDropdownActive] = useState(false);
  const menuList = categories.filter((item) => item.type === "menu");

  // ----- Remove a category from the new product being created

  const removeCatToNewProduct = (id) => {
    const newArray = categoryList.filter((item) => item !== id);
    setCategoryList(newArray);
  };

  // ----- Remove a category from an existing product

  const removeCategory = (product, categoryId, categoryItems) => {
    const newArray = categoryItems.filter((item) => item !== categoryId);
    const newProduct = { ...product, category: newArray };
    const updatedProducts = products.map((existingProduct) =>
      existingProduct._id === newProduct._id ? newProduct : existingProduct
    );
    setProducts(updatedProducts);
  };

  // ----- Add a category to an existing product

  const addCategory = (product, categoryId, categoryItems) => {
    categoryItems.push(categoryId);
    const newProduct = { ...product, category: categoryItems };
    const updatedProducts = products.map((existingProduct) =>
      existingProduct._id === newProduct._id ? newProduct : existingProduct
    );
    setProducts(updatedProducts);
  };

  // ----- updating an existing product

  const handleUpdate = (item) => {
    const updatedProduct = {
      category: item.category,
      in_stock: inStock || item.in_stock,
      product_description: description || item.product_description,
      product_image: image || item.product_image,
      product_price: price || item.product_price,
      product_title: title || item.product_title,
    };
    updateProduct(updatedProduct, item._id);
  };

  // ----- Handle creating a new product

  const handleCreate = () => {
    const newProduct = {
      category: categoryList,
      in_stock: inStock,
      product_description: description,
      product_image: image,
      product_price: price,
      product_title: title,
    };
    createProduct(newProduct);
  };

  // ----- Ensure user is logged in and an admin before rendering

  useEffect(() => {
    (!loggedinUser || loggedinUser.is_admin == false) && navigateTo("/");
    setImage(false)
  }, [products]);

  return (
    <div className="editProductCard">
      <div className="addProductDiv">
        <h3>Skapa en ny produkt</h3>

        <table>
          <thead>
            <tr>
              <th>Produktbild</th>
              <th>Lagersaldo</th>
              <th>Pris</th>
              <th>Titel</th>
              <th>Beskrivning</th>
              <th>Produktkategori</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={(e) => setImage(e.target.value.split("\\").pop())} // saves the file name onley, not the url
                />
                {image && (
                  <img src={`../../../src/assets/${image}`} alt={image} />
                )}
                <p
                  className="addPic"
                  onClick={() => fileInputRef.current.click()}
                >
                  Välj bild
                </p>
              </td>

              <td>
                <input
                  placeholder="Ange lagersaldo..."
                  onChange={(e) => setInStock(e.target.value)}
                  type="number"
                />
              </td>
              <td>
                <input
                  placeholder="Ange pris..."
                  onChange={(e) => setPrice(e.target.value)}
                  type="number"
                />
              </td>
              <td>
                <input
                  placeholder="Ange titel..."
                  onChange={(e) => setTitle(e.target.value)}
                  type="text"
                />
              </td>
              <td>
                <input
                  className="descriptionInput"
                  placeholder="Ange beskrivning..."
                  onChange={(e) => setDescription(e.target.value)}
                  type="text"
                />
              </td>
              <td>
                {dropdownActive == true ? (
                  <div onMouseLeave={() => setDropdownActive(false)}>
                    {menuList.map((category) => (
                      <div className="categoryDropdown" key={category._id}>
                        {categoryList.includes(category._id) ? (
                          <MdCheckBox
                            onClick={() => removeCatToNewProduct(category._id)}
                          />
                        ) : (
                          <MdCheckBoxOutlineBlank
                            onClick={() =>
                              setCategoryList([...categoryList, category._id])
                            }
                          />
                        )}
                        {category.category_title}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p onClick={() => setDropdownActive(true)}>Kategorier</p>
                )}
              </td>
            </tr>
          </tbody>
        </table>

        <button onClick={() => handleCreate()}>Spara</button>
      </div>

      <h3>Uppdatera befintliga produkter</h3>

      <div className="newProduct">
        <table>
          <thead>
            <tr>
              <th>Produktbild</th>
              <th>Lagersaldo</th>
              <th>Pris</th>
              <th>Titel</th>
              <th>Beskrivning</th>
              <th>Produktkategori</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item) => (
              <tr key={item._id}>
                <td className="imgPickerDiv">
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={(e) => setImage(e.target.value.split("\\").pop())} // saves the file name onley, not the url
                  />
                  <button
                    className="addPic"
                    onClick={() => {
                      fileInputRef.current.click();
                      setProductId(item._id);
                    }}
                  >
                    <FaRegFolderOpen />
                  </button>
                  <img
                    src={`../../../src/assets/${
                      image && productId === item._id
                        ? image
                        : item.product_image
                    } `}
                    alt={item.product_image}
                  />
                </td>
                <td>
                  <input
                    value={item.in_stock}
                    onChange={(e) => setInStock(e.target.value)}
                    type="number"
                  />
                </td>
                <td>
                  <input
                    value={item.product_price}
                    onChange={(e) => setPrice(e.target.value)}
                    type="number"
                  />
                </td>
                <td className="tdTitle">
                  <input
                    value={item.product_title}
                    onChange={(e) => setTitle(e.target.value)}
                    type="text"
                  />
                </td>
                <td>
                  <input
                    value={item.product_description}
                    onChange={(e) => setDescription(e.target.value)}
                    type="text"
                  />
                </td>
                <td onMouseLeave={() => setDropdownActive(false)}>
                  {dropdownActive == item._id ? (
                    menuList.map((category) => (
                      <div key={category._id}>
                        {item.category.includes(category._id) ? (
                          <MdCheckBox
                            onClick={() =>
                              removeCategory(item, category._id, item.category)
                            }
                          />
                        ) : (
                          <MdCheckBoxOutlineBlank
                            onClick={() =>
                              addCategory(item, category._id, item.category)
                            }
                          />
                        )}
                        {category.category_title}
                      </div>
                    ))
                  ) : (
                    <p onClick={() => setDropdownActive(item._id)}>
                      Kategorier
                    </p>
                  )}
                </td>
                <td>
                  <div className="handleUpdateDiv">
                    <button
                      className="saveBtn"
                      onClick={() => handleUpdate(item)}
                    >
                      <FaCheck />
                    </button>
                    <button
                      className="deleteBtn"
                      onClick={() => deleteProduct(item._id)}
                    >
                      <FaRegTrashCan />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EditProductCard;
