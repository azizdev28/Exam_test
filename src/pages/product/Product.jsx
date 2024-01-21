// Product.jsx
import React, { useEffect, useState } from "react";
import "../product/producs.scss";
import axios from "axios";
import { FaSearch, FaEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { Link } from "react-router-dom";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchProducts = async () => {
    try {
      setIsLoading(true); // Loading boshlanishi
      const response = await axios.get("http://localhost:3000/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false); // Loading tugashi
    }
  };

  const handleDelete = async (productId) => {
    try {
      setIsLoading(true); // Loading boshlanishi
      const confirmDelete = window.confirm(
        `Haqiqatan ham mahsulotni o'chirmoqchimisiz?`
      );

      if (!confirmDelete) {
        return;
      }

      await axios.delete(`http://localhost:3000/products/${productId}`);
      setProducts(products.filter((p) => p.id !== productId));
    } catch (error) {
      console.error("Error deleting product:", error);
    } finally {
      setIsLoading(false); // Loading tugashi
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(
    (product) =>
      (product.id && product.id.toString().includes(searchTerm)) ||
      (product.brand &&
        product.brand.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (product.rating && product.rating.toString().includes(searchTerm)) ||
      (product.category && product.category.toString().includes(searchTerm))
  );

  let noResultsMessage = "";

  if (searchTerm && filteredProducts.length === 0) {
    noResultsMessage = "Mahsulot topilmadi";
  }
  return (
    <div className="product">
      <div className="product__container">
        <div className="product__block">
          <div className="product__box">
            <div className="product__top_block">
              <h1 className="product__title">
                {isLoading
                  ? "Loading..."
                  : `Все товары (${filteredProducts.length})`}
              </h1>
              <div className="product__search_block">
                <input
                  type="text"
                  name="search"
                  id="search"
                  placeholder="search"
                  className="product__input"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <FaSearch />
              </div>
              <div className="product__filter_block">
                <button
                  className="product__filter_btn"
                  onClick={() => setSearchTerm("smartphones")}
                >
                  Smartphones
                </button>
                <button
                  className="product__filter_btn"
                  onClick={() => setSearchTerm("laptops")}
                >
                  Laptops
                </button>
              </div>
            </div>
            {noResultsMessage && (
              <p className="product__no_results_message">{noResultsMessage}</p>
            )}
            {filteredProducts.map((product) => (
              <ul key={product.id}>
                <li className="product__item">
                  <div className="product__input_block">
                    <input type="checkbox" name="checkbox" id="checkbox" />
                    <h1 className="product__id">Товар {product.id}</h1>
                  </div>
                  <div className="product__itemm">
                    <p className="product__rating">{product.rating}</p>
                    <p className="product__brand">{product.brand}</p>
                    <p className="product__price">{product.price}</p>
                    <p className="product__category">{product.category}</p>
                  </div>
                  <div className="product__icon_block">
                    <Link to={`/newProduct/${product.id}`}>
                      <FaEdit className="product__icon" />
                    </Link>
                    <MdOutlineDelete
                      className="product__iconn"
                      onClick={() => handleDelete(product.id)}
                    />
                  </div>
                </li>
              </ul>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
