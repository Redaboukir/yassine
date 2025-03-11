// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client'; // Si tu utilises React 18 ou supérieur
import App from './App';

// Créer une racine pour React
const root = ReactDOM.createRoot(document.getElementById('root')); // Vérifie que l'élément avec ID 'root' existe bien dans ton HTML
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
