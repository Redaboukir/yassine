import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { auth } from "./firebase"; // Importe l'objet auth depuis Firebase
import AuthForm from "./pages/AuthForm";
import Home from "./pages/Home";
import StockManagement from "./pages/StockManagement";
import DeleteProduct from "./pages/DeleteProduct";
import AddProduct from "./pages/AddProduct";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

const PrivateRoute = ({ children }) => {
  return localStorage.getItem("adminAuth") ? children : <Navigate to="/host" />;
};

const App = () => {
  const [user, setUser] = useState(null); // État pour stocker l'utilisateur connecté

  // Écouter les changements d'état de connexion
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user); // Utilisateur connecté
      } else {
        setUser(null); // Utilisateur déconnecté
      }
    });

    return () => unsubscribe(); // Nettoyer l'abonnement
  }, []);

  // Déconnexion automatique à la fermeture de la page
  useEffect(() => {
    const handleUnload = () => {
      auth.signOut();
    };

    window.addEventListener("beforeunload", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, []);

  return (
    <Router>
      <Routes>
        {/* Route pour la page d'accueil (uniquement si connecté) */}
        <Route path="/home" element={user ? <Home /> : <Navigate to="/" />} />

        {/* Route pour le formulaire d'authentification (uniquement si déconnecté) */}
        <Route path="/" element={user ? <Navigate to="/home" /> : <AuthForm />} />

        {/* Routes Admin */}
        <Route path="/host" element={<AdminLogin />} />
        <Route path="/host/dashboard" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/stock" element={<StockManagement />} />
        <Route path="/admin/delete" element={<DeleteProduct />} />
        <Route path="/admin/add-product" element={<AddProduct />} />
      </Routes>
    </Router>
  );
};

export default App;
