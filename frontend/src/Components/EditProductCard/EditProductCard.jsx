import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import { ProductContext } from "../../Context/ProductContext";
import { useContext, useEffect } from "react";

const EditProductCard = () => {
  const { products, setProducts, categories, updateProduct } =
    useContext(ProductContext);

  const menuList = categories.filter((item) => item.type === "menu");

  const addCategory = (product, categoryId, categoryItems) => {
    const newArray = categoryItems.filter((item) => item !== categoryId);
    const newProduct = { ...product, category: newArray };
    const updatedProducts = products.map((existingProduct) =>
      existingProduct._id === newProduct._id ? newProduct : existingProduct
    );
    setProducts(updatedProducts);
  };

  const removeCategory = (product, categoryId, categoryItems) => {
    categoryItems.push(categoryId);
    const newProduct = { ...product, category: categoryItems };
    const updatedProducts = products.map((existingProduct) =>
      existingProduct._id === newProduct._id ? newProduct : existingProduct
    );
    setProducts(updatedProducts);
  };

  useEffect(() => {}, [products]);

  return (
    <div className="editProductCard">
      {products.map((item) => (
        <div key={item._id}>
          <img
            src={`../../../src/assets/${item.product_image}`}
            alt="product-image"
          />
          <label>Antal i lager: </label>
          <input defaultValue={item.in_stock} type="text" />
          <label>Produktpris: </label>
          <input defaultValue={item.product_price} type="text" />{" "}
          <label>Produkttitel: </label>
          <input defaultValue={item.product_title} type="text" />{" "}
          <label>Produktbeskrivning: </label>
          <input defaultValue={item.product_description} type="text" />{" "}
          <label>Produktkategori: </label>
          {menuList.map((category) => (
            <div key={category._id}>
              {item.category.includes(category._id) ? (
                <MdCheckBox
                  onClick={() => addCategory(item, category._id, item.category)}
                />
              ) : (
                <MdCheckBoxOutlineBlank
                  onClick={() =>
                    removeCategory(item, category._id, item.category)
                  }
                />
              )}
              {category.category_title}
            </div>
          ))}
          <button onClick={() => updateProduct(item)}>Spara</button>
        </div>
      ))}
    </div>
  );
};

export default EditProductCard;
