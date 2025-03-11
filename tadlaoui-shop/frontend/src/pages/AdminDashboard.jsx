import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div>
      <h2>Dashboard Admin</h2>
      <ul>
        <li><Link to="/admin/stocks">📦 Gérer les stocks</Link></li>
        <li><Link to="/admin/add-product">➕ Ajouter un produit</Link></li>
        <li><Link to="/admin/delete">❌ Supprimer un produit</Link></li>
      </ul>
    </div>
  );
};

export default AdminDashboard;
