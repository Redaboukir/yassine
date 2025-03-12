import express from "express";
import multer from "multer";
import Product from "../models/Product.js";

const router = express.Router();

// 📸 Configuration de multer pour uploader les images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Stocke dans le dossier uploads/
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Renomme le fichier
  }
});
const upload = multer({ storage });

// ✅ Route pour ajouter un produit avec image
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { name, price, description } = req.body;
    if (!name || !price || !description || !req.file) {
      return res.status(400).json({ message: "Tous les champs sont obligatoires" });
    }

    const newProduct = new Product({
      name,
      price,
      description,
      image: req.file.filename // Stocke juste le nom du fichier
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("❌ Erreur serveur:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// 🔄 Route pour récupérer tous les produits
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error("❌ Erreur récupération des produits:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// 🔍 Route pour récupérer un produit par ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Produit non trouvé" });

    res.json(product);
  } catch (error) {
    console.error("❌ Erreur récupération du produit:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// ✏️ Route pour modifier un produit
router.put("/:id", async (req, res) => {
  try {
    const { name, price, description } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, price, description },
      { new: true }
    );

    if (!updatedProduct) return res.status(404).json({ message: "Produit non trouvé" });

    res.json(updatedProduct);
  } catch (error) {
    console.error("❌ Erreur mise à jour du produit:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// 🗑️ Route pour supprimer un produit
router.delete("/:id", async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) return res.status(404).json({ message: "Produit non trouvé" });

    res.json({ message: "Produit supprimé avec succès" });
  } catch (error) {
    console.error("❌ Erreur suppression du produit:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// ⭐ Route pour ajouter/enlever un produit des favoris
router.put("/:id/favorite", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Produit non trouvé" });

    product.isFavorite = !product.isFavorite; // Inverser l'état
    await product.save();

    res.json({ message: "Statut favori mis à jour", product });
  } catch (error) {
    console.error("❌ Erreur gestion du favori:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

export default router;
