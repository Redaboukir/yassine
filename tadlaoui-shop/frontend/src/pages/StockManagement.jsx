import { useEffect, useState } from "react";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const StockManagement = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/api/products`)
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error("Erreur :", err));
  }, []);

  return (
    <div>
      <h2>📦 Gérer les Stocks</h2>
      {products.length === 0 ? <p>Aucun produit disponible.</p> : (
        <ul>
          {products.map((product) => (
            <li key={product._id}>
              <img src={`${API_URL}/uploads/${product.image}`} alt={product.name} style={{ width: "80px", height: "80px", objectFit: "cover" }} />
              {product.name} - {product.price}€
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StockManagement;
