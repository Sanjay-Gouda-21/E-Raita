import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./css/productdetails.css";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3003/products");
        console.log("Response status:", response.status);

        if (!response.ok) {
          throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched data:", data);
        setProducts(data);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  const handleUpdateProduct = (product) => {
    navigate(`/updateproduct/${product.product_id}`);
    console.log("Update product:", product);
  };

  const handleDeleteProduct = async (product) => {
    try {
      const response = await fetch(
        `http://localhost:3003/products/${product.product_id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to delete product. Status: ${response.status}`);
      }

      const updatedProducts = products.filter(
        (p) => p.product_id !== product.product_id
      );
      setProducts(updatedProducts);
    } catch (error) {
      console.error("Error deleting product:", error.message);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="products-container">
      <button
        className="insert-product-button"
        onClick={() => navigate("/insertproduct")}
      >
        Insert Product
      </button>
      <p>Total Products: {products.length}</p>
      <table className="products-table">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr
              key={product.product_id}
              className={`product-item-${product.product_id}`}
            >
              <td>{product.p_name}</td>
              <td className="description-column">{product.p_description}</td>
              <td>{product.p_price}</td>
              <td>
                <button
                  className="btn-p"
                  onClick={() => handleUpdateProduct(product)}
                >
                  Update
                </button>
                <button
                  className="btn-p"
                  onClick={() => handleDeleteProduct(product)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
