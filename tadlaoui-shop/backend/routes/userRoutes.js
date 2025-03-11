// backend/routes/userRoutes.js
const express = require('express');
const { addUser } = require('../controllers/userController');
const router = express.Router();

// Route pour ajouter un utilisateur
router.post('/add', addUser);

module.exports = router;
