import React, { useEffect, useState } from "react";
import "../Product/Products.scss";
import axios from "axios";
import { FaSearch, FaEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

const Product = ({ login }) => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sortBy, setSortBy] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("http://localhost:3000/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (productId) => {
    try {
      setIsLoading(true);
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
      setIsLoading(false);
    }
  };

  const handleSortByPrice = () => {
    const sortedProducts = [...products];
    sortedProducts.sort((a, b) => a.price - b.price);
    setProducts(sortedProducts);
    setSortBy("price");
  };

  const handleSortByRating = () => {
    const sortedProducts = [...products];
    sortedProducts.sort((a, b) => b.rating - a.rating);
    setProducts(sortedProducts);
    setSortBy("rating");
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

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const navigate = useNavigate();
  const pageNumbers = Math.ceil(filteredProducts.length / itemsPerPage);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  let noResultsMessage = "";

  if (searchTerm && filteredProducts.length === 0) {
    noResultsMessage = "Mahsulot topilmadi";
  }

  return (
    <div className="Product">
      <div className="ProductCard">
        <div className="product__block">
          <div className="Test">
            <div className="ProductNav">
              <h1 className="DataLenght">
                {isLoading
                  ? "Loading..."
                  : `Все товары (${filteredProducts.length})`}
              </h1>
              <div className="SortButtons">
                <button onClick={handleSortByPrice}>Сортировать по цене</button>
                <button onClick={handleSortByRating}>
                  Сортировать по рейтингу
                </button>
              </div>
              <div className="Search">
                <input
                  type="text"
                  name="search"
                  id="search"
                  placeholder="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <FaSearch />
              </div>
              <div className="ProductFilter">
                <button
                  className="ProductFilterBtn"
                  onClick={() => setSearchTerm("smartphones")}
                >
                  Smartphones
                </button>
                <button
                  className="ProductFilterBtn"
                  onClick={() => setSearchTerm("laptops")}
                >
                  Laptops
                </button>
                <button
                  className="ProductFilterBtn"
                  onClick={() => setSearchTerm("")}
                >
                  All
                </button>
              </div>
            </div>
            {noResultsMessage && (
              <p className="product__no_results_message">{noResultsMessage}</p>
            )}
            {currentProducts.map((product) => (
              <ul key={product.id}>
                <li className="ProductLine">
                  <div className="PruductCheck">
                    <input type="checkbox" name="checkbox" id="checkbox" />
                    <h3>Товар {product.id}</h3>
                  </div>
                  <div className="ProductInfo">
                    <p className="prodactName">{product.rating}</p>
                    <p className="prodactName">{product.brand}</p>
                    <p className="prodactName">{product.price}</p>
                    <p className="prodactName">{product.category}</p>
                  </div>
                  <div className="ProdactIcon">
                    <Link to={`/newProduct/`} className="Edit">
                      <FaEdit className="edy" />
                    </Link>
                    <MdOutlineDelete
                      className="Delete"
                      onClick={() => handleDelete(product.id)}
                    />
                  </div>
                </li>
              </ul>
            ))}
            <div className="Pagination">
              {Array.from({ length: pageNumbers }).map((_, index) => (
                <button key={index} onClick={() => handlePageClick(index + 1)}>
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="CreateProduct">
        <NavLink to="/newProduct">
          <button> + Новый товар</button>
        </NavLink>
        <span>© Anymarket 2022</span>
      </div>
    </div>
  );
};

export default Product;
