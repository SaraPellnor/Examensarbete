/* eslint-disable react-hooks/exhaustive-deps */
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import { ProductContext } from "../../Context/ProductContext";
import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";

import "./EditProductCard.css";

const EditProductCard = () => {
  const navigateTo = useNavigate();

  const { loggedinUser } = useContext(UserContext);

  const { products, setProducts, categories, updateProduct, createProduct } =
    useContext(ProductContext);

  const fileInputRef = useRef(null);
  const [openFileInput, setopenFileInput] = useState(false);
  const [inStock, setInStock] = useState();
  const [price, setPrice] = useState();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [image, setImage] = useState();
  const [categoryList, setCategoryList] = useState([]);

  const menuList = categories.filter((item) => item.type === "menu");

  const removeCatToNewProduct = (id) => {
    const newArray = categoryList.filter((item) => item !== id);
    setCategoryList(newArray);
  };

  const removeCategory = (product, categoryId, categoryItems) => {
    const newArray = categoryItems.filter((item) => item !== categoryId);
    const newProduct = { ...product, category: newArray };
    const updatedProducts = products.map((existingProduct) =>
      existingProduct._id === newProduct._id ? newProduct : existingProduct
    );
    setProducts(updatedProducts);
  };

  const addCategory = (product, categoryId, categoryItems) => {
    categoryItems.push(categoryId);
    const newProduct = { ...product, category: categoryItems };
    const updatedProducts = products.map((existingProduct) =>
      existingProduct._id === newProduct._id ? newProduct : existingProduct
    );
    setProducts(updatedProducts);
  };

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

  const handleCreate = () => {
    const updatedProduct = {
      category: categoryList,
      in_stock: inStock,
      product_description: description,
      product_image: image,
      product_price: price,
      product_title: title,
    };
    createProduct(updatedProduct);
  };

  useEffect(() => {
    !loggedinUser || (loggedinUser.is_admin == false && navigateTo("/"));
  }, [products]);

  return (
    <div className="editProductCard">
      <h3>Skapa en ny produkt</h3>

      <div className="newProduct">
        <div className="filepicker">
          <label>Produktbild:</label>
          <div className="filepickerDetails">
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={(e) => setImage(e.target.value.split("\\").pop())} // saves the file name onley, not the url
            />
            {image ? (
              <img src={`../../../src/assets/${image}`} alt={image} />
            ) : (
              <p>Ingen fil vald</p>
            )}
            <button onClick={() => fileInputRef.current.click()}>
              Välj fil
            </button>
          </div>
        </div>
        <div className="newProductDetails">
          <label>Antal i lager: </label>
          <input
            placeholder="Ange antal i lager..."
            onChange={(e) => setInStock(e.target.value)}
            type="number"
          />
          <label>Produktpris: </label>
          <input
            placeholder="Ange pris..."
            onChange={(e) => setPrice(e.target.value)}
            type="number"
          />
          <label>Produkttitel: </label>
          <input
            placeholder="Ange titel..."
            onChange={(e) => setTitle(e.target.value)}
            type="text"
          />{" "}
          <label>Produktbeskrivning: </label>
          <textarea
            rows={4}
            cols={50}
            className="descriptionInput"
            placeholder="Ange beskrivning av produkten..."
            onChange={(e) => setDescription(e.target.value)}
            type="text"
          />
        </div>
        <div className="newCategoryInput">
          <label>Produktkategori: </label>
          {menuList.map((category) => (
            <div key={category._id}>
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
      </div>
      <button onClick={() => handleCreate()}>Spara</button>

      {products.map((item) => (
        <div className="product" key={item._id}>
          <img
            src={`../../../src/assets/${item.product_image}`}
            alt={item.product_image}
            onClick={() => setopenFileInput(openFileInput ? false : true)}
          />
          {openFileInput && (
            <div>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={(e) => setImage(e.target.value.split("\\").pop())} // saves the file name onley, not the url
              />
              <button onClick={() => fileInputRef.current.click()}>
                Välj fil
              </button>
              {image && <p>{image}</p>}
            </div>
          )}
          <label>Antal i lager: </label>
          <input
            defaultValue={item.in_stock}
            onChange={(e) => setInStock(e.target.value)}
            type="number"
          />
          <label>Produktpris: </label>
          <input
            defaultValue={item.product_price}
            onChange={(e) => setPrice(e.target.value)}
            type="number"
          />{" "}
          <label>Produkttitel: </label>
          <input
            defaultValue={item.product_title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
          />{" "}
          <label>Produktbeskrivning: </label>
          <input
            defaultValue={item.product_description}
            onChange={(e) => setDescription(e.target.value)}
            type="text"
          />{" "}
          <label>Produktkategori: </label>
          {menuList.map((category) => (
            <div key={category._id}>
              {item.category.includes(category._id) ? (
                <MdCheckBox
                  onClick={() =>
                    removeCategory(item, category._id, item.category)
                  }
                />
              ) : (
                <MdCheckBoxOutlineBlank
                  onClick={() => addCategory(item, category._id, item.category)}
                />
              )}
              {category.category_title}
            </div>
          ))}
          <button onClick={() => handleUpdate(item)}>Spara</button>
        </div>
      ))}
    </div>
  );
};

export default EditProductCard;
