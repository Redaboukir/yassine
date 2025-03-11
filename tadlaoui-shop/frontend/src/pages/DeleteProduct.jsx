import { useEffect, useState } from "react";

const DeleteProduct = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
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
      console.log("🗑️ Suppression en cours de l'ID :", id);
  
      const res = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "DELETE",
      });
  
      const data = await res.json();
      console.log("Réponse du serveur :", data);
  
      if (res.ok) {
        setProducts(products.filter((product) => product._id !== id));
      } else {
        console.error("Erreur lors de la suppression :", data);
      }
    } catch (err) {
      console.error("Erreur serveur :", err);
    }
  };
  
  

  return (
    <div>
      <h2>❌ Supprimer un produit</h2>
      {products.length === 0 ? <p>Aucun produit disponible.</p> : (
        <ul>
        {products.map((product) => {
          const imagePath = `http://localhost:5000/uploads/${product.image}`;
          console.log("Chemin de l'image :", imagePath);
      
          return (
            <li key={product._id}>
              <img
                src={imagePath}
                alt={product.name}
                style={{ width: "80px", height: "80px", objectFit: "cover" }}
              />
              {product.name} - {product.price}€
              <button onClick={() => handleDelete(product._id)}>Supprimer</button>
            </li>
          );
        })}
      </ul>
      
      )}
    </div>
  );
};

export default DeleteProduct;
