import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import productRoutes from "./routes/productRoutes.js";
import contactRoutes from "./routes/contact.js";

const app = express();
import Product from './models/Product.js';

// Middleware
app.use(express.json()); // Pour parser le JSON des requêtes
app.use(cors()); // Pour autoriser les requêtes du frontend
app.use("/uploads", express.static(path.resolve("uploads"))); // Pour servir les images
app.use("/uploads", express.static("uploads"));
app.use("/contact", contactRoutes);
// Routes
app.use("/api/products", productRoutes);

// Connexion MongoDB
const PORT = 5000;
const MONGO_URI = "mongodb+srv://redaboy71:Redaboy78963@shop.adodb.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("✅ MongoDB connecté !");
    app.listen(PORT, () => console.log(`🚀 Serveur démarré sur le port ${PORT}`));
  })
  .catch(err => console.error("❌ Erreur de connexion MongoDB :", err));

  app.delete('/api/products/:id', async (req, res) => {
    console.log(`🔴 Requête DELETE reçue pour ID: ${req.params.id}`); // LOG pour vérifier si la requête arrive

    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        
        if (!deletedProduct) {
            console.log("⚠️ Produit non trouvé !");
            return res.status(404).json({ message: "Produit non trouvé" });
        }

        console.log("✅ Produit supprimé avec succès !");
        res.json({ message: "Produit supprimé avec succès" });

    } catch (error) {
        console.error("❌ Erreur serveur :", error);
        res.status(500).json({ message: "Erreur lors de la suppression", error });
    }

    router.put("/:id/favorite", async (req, res) => {
      try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Produit non trouvé" });
    
        product.isFavorite = !product.isFavorite; // Inverser l'état
        await product.save();
    
        res.json({ message: "Statut favori mis à jour", product });
      } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
      }
    });
});

  