import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../styles/Home.css';

const Home = () => {
  const [favoriteProducts, setFavoriteProducts] = useState([]);

  // Charger les produits favoris au montage du composant
  useEffect(() => {
    fetchFavorites();
  }, []);

  // Récupération des produits favoris
  const fetchFavorites = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/products");
      if (!response.ok) throw new Error("Erreur lors du chargement des produits");

      const data = await response.json();

      // Filtrer les produits favoris
      const filteredFavorites = data.filter((product) => product.isFavorite);
      setFavoriteProducts(filteredFavorites);
    } catch (error) {
      console.error("❌ Erreur lors du fetch des favoris:", error);
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="home-container">
      {/* 🔹 Header */}
      <header className="header">
  <nav className="navbar">
    {/* 🔹 Logo */}
    <div className="logo">
      <img src="logo.jpeg" alt="Logo" />
    </div>

    {/* 🔹 Liens de navigation */}
    <ul className="nav-links">
      <li><Link to="/">Accueil</Link></li>
      <li><Link to="/shop">Shop</Link></li>
      <li><Link to="/contact">Contact</Link></li>
    </ul>

    {/* 🔹 Icônes à droite */}
    <div className="right-icons">
      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
        <img src="https://cdn-icons-png.flaticon.com/128/2111/2111463.png" alt="Instagram" />
      </a>
      <div className="whatsapp">
        <img src="https://cdn-icons-png.flaticon.com/128/3536/3536445.png" alt="WhatsApp" />
        <span>+212 6 XX XX XX XX</span>
      </div>
      <img src="https://cdn-icons-png.flaticon.com/128/3135/3135715.png" alt="Profil" className="profile-icon" />
    </div>
  </nav>
</header>

      {/* 🔹 Carrousel */}
      <div className="carousel-container">
        <Slider {...settings}>
          <div>
            <img src={`${process.env.PUBLIC_URL}/caroussel/moderne.jpeg`} alt="Moderne" />
          </div>
          <div>
            <img src={`${process.env.PUBLIC_URL}/caroussel/style.jpeg`} alt="Style" />
          </div>
          <div>
            <img src={`${process.env.PUBLIC_URL}/caroussel/traditionnel.jpeg`} alt="Traditionnel" />
          </div>
        </Slider>
      </div>

      {/* 🔹 Section des 6 images */}
      <div className="image-grid">
        {[1, 2, 3, 4, 5, 6].map((num) => (
          <div className="image-box" key={num}>
            <img src={`${process.env.PUBLIC_URL}/affiche/affiche${num}.jpeg`} alt={`Affiche ${num}`} />
          </div>
        ))}
      </div>

      {/* 🔹 Section "Nos Meilleurs Produits" */}
      <div className="favorites-container">
        <h2 className="favorites-title">Produits populaires</h2>

        {favoriteProducts.length === 0 ? (
          <p className="no-favorites">Aucun tableau favori pour le moment.</p>
        ) : (
          <div className="favorites-grid">
            {favoriteProducts.map((product) => (
              <div key={product._id} className="favorite-item">
                <img
                  src={`http://localhost:5000/uploads/${product.image}`}
                  alt={product.name}
                  className="favorite-image"
                />
                <h3 className="favorite-name">{product.name}</h3>
                <p className="favorite-price">{product.price} DH</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 🔹 Footer */}
      <footer className="footer">
        <p>© 2025 Tadlaoui Shop - Tous droits réservés.</p>
      </footer>
    </div>
  );
};

export default Home;
