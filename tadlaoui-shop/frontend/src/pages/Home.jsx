import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  return (
    <header className="header">
      {/* Barre de navigation */}
      <nav className="navbar">
        <ul>
          <li><Link to="/">Accueil</Link></li>
          <li><Link to="/shop">Shop</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </nav>

      {/* Logo au centre */}
      <div className="logo">
        <img src="https://cdn-icons-png.flaticon.com/128/892/892634.png" alt="Logo" />
      </div>

      {/* Icônes à droite */}
      <div className="right-icons">
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <img src="https://cdn-icons-png.flaticon.com/128/2111/2111463.png" alt="Instagram" />
        </a>
        <div className="whatsapp">
          <img src="https://cdn-icons-png.flaticon.com/128/3536/3536445.png" alt="WhatsApp" />
          <span>+212 6 XX XX XX XX</span> {/* Mets ton numéro ici */}
        </div>
        <img src="https://cdn-icons-png.flaticon.com/128/3135/3135715.png" alt="Profil" className="profile-icon" />
      </div>
    </header>
  );
};

export default Home;
