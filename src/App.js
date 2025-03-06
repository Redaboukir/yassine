// src/App.jsx
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { auth } from './firebase'; // Importe l'objet auth depuis Firebase
import AuthForm from './pages/AuthForm';
import Home from './pages/Home';

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

  return (
    <Router>
      <Routes>
        {/* Route pour la page d'accueil (uniquement si connecté) */}
        <Route
          path="/home"
          element={user ? <Home /> : <Navigate to="/" />}
        />
        {/* Route pour le formulaire d'authentification (uniquement si déconnecté) */}
        <Route
          path="/"
          element={user ? <Navigate to="/home" /> : <AuthForm />}
        />
      </Routes>
    </Router>
  );
};

export default App;