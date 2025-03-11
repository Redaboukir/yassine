const Product = require("../models/Product");

// Ajouter un produit
exports.addProduct = async (req, res) => {
  try {
    const { name, description, price, image, stock } = req.body;
    const product = new Product({ name, description, price, image, stock });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de l'ajout du produit", error });
  }
};

// Récupérer tous les produits
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des produits", error });
  }
};

// Supprimer un produit
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Produit non trouvé" });
    }
    res.status(200).json({ message: "Produit supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression du produit", error });
  }
};
