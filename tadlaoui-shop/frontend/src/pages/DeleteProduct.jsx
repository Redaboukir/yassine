import { useEffect, useState } from "react";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const DeleteProduct = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/api/products`)
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error("Erreur :", err));
  }, []);

  const handleDelete = async (id) => {
    if (!id) {
      console.error("❌ ID du produit manquant !");
      return;
    }

    const confirmDelete = window.confirm("Es-tu sûr de vouloir supprimer ce produit ?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`${API_URL}/api/products/${id}`, { method: "DELETE" });

      if (res.ok) {
        setProducts(products.filter((product) => product._id !== id));
      } else {
        console.error("Erreur lors de la suppression");
      }
    } catch (err) {
      console.error("Erreur serveur :", err);
    }
  };

  const handleFavorite = async (id) => {
    try {
      const res = await fetch(`${API_URL}/api/products/${id}/favorite`, { method: "PUT" });
      const data = await res.json();

      if (res.ok) {
        setProducts(products.map(p => 
          p._id === id ? { ...p, isFavorite: !p.isFavorite } : p
        ));
      } else {
        console.error("Erreur favori :", data);
      }
    } catch (err) {
      console.error("Erreur serveur :", err);
    }
  };

  return (
    <div>
      <h2>🛠️ Gestion des Produits</h2>
      {products.length === 0 ? <p>Aucun produit disponible.</p> : (
        <ul>
          {products.map((product) => (
            <li key={product._id}>
              <img
                src={`${API_URL}/uploads/${product.image}`}
                alt={product.name}
                style={{ width: "80px", height: "80px", objectFit: "cover" }}
              />
              {product.name} - {product.price}€

              <button onClick={() => handleDelete(product._id)}>Supprimer</button>

              <button 
                style={{ background: product.isFavorite ? "gold" : "gray", marginLeft: "10px" }}
                onClick={() => handleFavorite(product._id)}
              >
                ⭐ {product.isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DeleteProduct;
