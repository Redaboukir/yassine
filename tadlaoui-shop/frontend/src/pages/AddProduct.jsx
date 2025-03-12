import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const AddProduct = () => {
  const navigate = useNavigate();
  const [newProduct, setNewProduct] = useState({ name: "", price: "", description: "", image: null });

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setNewProduct({ ...newProduct, image: e.target.files[0] });
    } else {
      setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", newProduct.name);
    formData.append("price", newProduct.price);
    formData.append("description", newProduct.description);
    formData.append("image", newProduct.image);

    const res = await fetch(`${API_URL}/api/products`, {
      method: "POST",
      body: formData
    });

    if (res.ok) {
      navigate("/admin/stocks");
    } else {
      console.error("Erreur lors de l'ajout du produit");
    }
  };

  return (
    <div>
      <h2>➕ Ajouter un produit</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Nom du produit" onChange={handleChange} required />
        <input type="number" name="price" placeholder="Prix" onChange={handleChange} required />
        <textarea name="description" placeholder="Description" onChange={handleChange} required />
        <input type="file" name="image" onChange={handleChange} required />
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
};

export default AddProduct;
