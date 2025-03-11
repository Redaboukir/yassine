// backend/controllers/userController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Ajouter un utilisateur
exports.addUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // Hashage du mot de passe
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de l\'ajout de l\'utilisateur', error });
  }
};
