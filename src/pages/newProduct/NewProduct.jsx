import React, { useState, useEffect } from "react";
import "./newProduct.scss";
import axios from "axios";
import { NavLink, useParams, useNavigate } from "react-router-dom";

const NewProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({
    title: "",
    brand: "",
    manufacturerCode: "",
    description: "",
    price: "",
    discountedPrice: "",
    rating: "",
  });
  const [manufacturerCode, setManufacturerCode] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/products/${id}`
        );
        setProduct(response.data);
        setManufacturerCode(response.data.manufacturerCode || "");
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    if (id) {
      fetchProductDetails();
    }
  }, [id]);

  const validateForm = () => {
    const errors = {};

    if (!product.title.trim()) {
      errors.title = "Название обязательно";
    }

    if (!product.brand.trim()) {
      errors.brand = "Бренд обязателен";
    }

    if (!manufacturerCode.trim()) {
      errors.manufacturerCode = "Артикул производителя обязателен";
    }

    return errors;
  };

  const handleSave = async () => {
    try {
      const errors = validateForm();

      if (Object.keys(errors).length > 0) {
        setErrors(errors);
        return;
      }

      if (id) {
        await axios.put(`http://localhost:3000/products/${id}`, {
          ...product,
          manufacturerCode,
        });
      } else {
        await axios.post("http://localhost:3000/products", {
          ...product,
          manufacturerCode,
        });
      }

      setIsSaved(true);
      setErrors({});

      // Product page ga o'tish
      navigate("/product");
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  const handleCancel = () => {
    setProduct({
      title: "",
      brand: "",
      manufacturerCode: "",
      description: "",
      price: "",
      discountedPrice: "",
      rating: "",
    });

    setIsSaved(false);
    setErrors({});
  };

  return (
    <div className="newProduct">
      <div className="AddProduct">
        <div className="ExitBtn">
          <NavLink to="/product">
            <button>Основные</button>
          </NavLink>
        </div>
        <div className="newProduct">
          <form className="form__container">
            <div className="nameProduct">
              <label className="newProduct__label">
                Название <span>*</span>
              </label>

              <input
                className={`newProduct__input_1 ${errors.title ? "error" : ""}`}
                type="text"
                value={product.title}
                onChange={(e) =>
                  setProduct({ ...product, title: e.target.value })
                }
              />
              {errors.title && <p className="error-message">{errors.title}</p>}
            </div>
            <div className="BrendLine">
              <div className="Brend">
                <label className="newProduct__label">
                  Бренд <span>*</span>
                </label>
                <input
                  className={`newProduct__input_2 ${
                    errors.brand ? "error" : ""
                  }`}
                  type="text"
                  value={product.brand}
                  onChange={(e) =>
                    setProduct({ ...product, brand: e.target.value })
                  }
                />
                {errors.brand && (
                  <p className="error-message">{errors.brand}</p>
                )}
              </div>
              <div className="SerCode">
                <label className="newProduct__label">
                  Артикул производителя <span> *</span>
                </label>
                <input
                  className={`newProduct__input_4 ${
                    errors.manufacturerCode ? "error" : ""
                  }`}
                  type="text"
                  value={manufacturerCode}
                  onChange={(e) => setManufacturerCode(e.target.value)}
                />
                {errors.manufacturerCode && (
                  <p className="error-message">{errors.manufacturerCode}</p>
                )}
              </div>
            </div>
            <div className="Comment">
              <label className="newProduct__label">
                Описание <span>*</span>
              </label>
              <textarea
                className="newProduct__area"
                value={product.description}
                onChange={(e) =>
                  setProduct({ ...product, description: e.target.value })
                }
              ></textarea>
            </div>
            <div className="Money">
              <div className="Summa">
                <label className="newProduct__label">Цена</label>
                <input
                  className="newProduct__input_3"
                  type="text"
                  value={product.price}
                  onChange={(e) =>
                    setProduct({ ...product, price: e.target.value })
                  }
                />
              </div>
              <div className="SilceSum">
                <label className="newProduct__label">Цена со скидкой</label>
                <input
                  className="newProduct__input_3"
                  type="text"
                  value={product.discountedPrice}
                  onChange={(e) =>
                    setProduct({
                      ...product,
                      discountedPrice: e.target.value,
                    })
                  }
                />
              </div>

              {isSaved && (
                <div className="newProductSaved">
                  <h2>New Product Saved:</h2>
                  <p>Name: {product.title}</p>
                  <p>Brand: {product.brand}</p>
                  <p>Rating: {product.rating}</p>
                  <p>Manufacturer Code: {product.manufacturerCode}</p>
                  <p>Description: {product.description}</p>
                  <p>Price: {product.price}</p>
                  <p>Discounted Price: {product.discountedPrice}</p>
                  {/* Boshqa malumotlar... */}
                </div>
              )}
            </div>
          </form>
        </div>
      </div>

      <div className="footer">
        <div className="FooterInfo">
          <button className="SaveInfo" onClick={handleSave}>
            Сохранить
          </button>
          <button className="IgnorSave" onClick={handleCancel}>
            Отмена
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewProduct;
