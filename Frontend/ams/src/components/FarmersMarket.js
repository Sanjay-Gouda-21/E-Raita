import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./css/FarmersMarket.css";

export default function FarmersMarket() {
  const [productData, setProductData] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3003/products?search=${searchQuery}`
        );
        console.log("Response status:", response.status);

        if (!response.ok) {
          throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched data:", data);
        setProductData(data);
        console.log(data);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, [searchQuery]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleBuy = (productId) => {
    navigate(`/purchase/${productId}`);
    console.log(`Bought product with ID: ${productId}`);
  };

  return (
    <>
      <div className="offer"></div>
      <div className="search-bar-p">
        <input
          type="text"
          placeholder="Search by product name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="s-text"
        />
        <button onClick={() => setSearchQuery("")} className="s-btn-2">
          Clear
        </button>
      </div>
      <div className="farmers-market-container">
        <div className="products-list">
          {productData.map((product) => (
            <div key={product.id} className="product-item">
              <img src={product.p_img} alt={product.p_name} className="p-img" />
              <h2>{product.p_name}</h2>
              <p className="price">{product.p_description}</p>
              <p className="product-price">Price: {product.p_price} / Kg</p>
              <div className="product-buttons">
                <button
                  onClick={() => handleBuy(product.product_id)}
                  className="p-button"
                >
                  Buy
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
