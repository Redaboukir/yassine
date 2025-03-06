// src/components/Home.jsx
import React from 'react';
import { signOutUser } from '../firebase'; // Importe la fonction de déconnexion
import { useNavigate } from 'react-router-dom'; // Pour la redirection

const Home = () => {
  const navigate = useNavigate();

  // Fonction pour gérer la déconnexion
  const handleLogout = async () => {
    try {
      await signOutUser(); // Déconnecte l'utilisateur
      alert('Déconnexion réussie !');
      navigate('/'); // Redirige vers la page de connexion
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
      alert('Une erreur est survenue lors de la déconnexion.');
    }
  };

  return (
    <div style={styles.container}>
      <h1>Bienvenue dans la boutique !</h1>
      <p>Vous êtes connecté et pouvez maintenant explorer nos produits.</p>
      <button style={styles.button} onClick={() => alert('Fonctionnalité à venir !')}>
        Voir les produits
      </button>
      <button style={styles.logoutButton} onClick={handleLogout}>
        Se déconnecter
      </button>
    </div>
  );
};

// Styles pour la page Home
const styles = {
  container: {
    textAlign: 'center',
    padding: '20px',
  },
  button: {
    backgroundColor: '#FF4B2B',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '20px',
    padding: '12px 45px',
    fontSize: '12px',
    fontWeight: 'bold',
    margin: '10px',
    cursor: 'pointer',
  },
  logoutButton: {
    backgroundColor: '#333',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '20px',
    padding: '12px 45px',
    fontSize: '12px',
    fontWeight: 'bold',
    margin: '10px',
    cursor: 'pointer',
  },
};

export default Home;