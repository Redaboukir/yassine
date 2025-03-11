import { useEffect, useState } from "react";

const StockManagement = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
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
              <img src={`http://localhost:5000${product.image}`} alt={product.name} style={{ width: "80px", height: "80px", objectFit: "cover" }} />
              {product.name} - {product.price}€
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StockManagement;
