import { productService } from '../../../services/nocodbService';

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      return getProducts(req, res);
    case 'POST':
      return createProduct(req, res);
    default:
      return res.status(405).json({ message: 'Méthode non autorisée' });
  }
}

// Récupérer tous les produits
async function getProducts(req, res) {
  try {
    const { category, vendor } = req.query;
    
    let products;
    
    if (category) {
      // Récupérer les produits par catégorie
      products = await productService.getProductsByCategory(category);
    } else if (vendor) {
      // Récupérer les produits par vendeur
      products = await productService.getProductsByVendor(vendor);
    } else {
      // Récupérer tous les produits
      products = await productService.getAllProducts();
    }
    
    return res.status(200).json(products);
  } catch (error) {
    console.error('Erreur lors de la récupération des produits:', error);
    return res.status(500).json({ message: 'Erreur serveur' });
  }
}

// Créer un nouveau produit
async function createProduct(req, res) {
  try {
    const productData = req.body;
    
    // Vérifier si tous les champs requis sont fournis
    if (!productData.name || !productData.price || !productData.vendor_id) {
      return res.status(400).json({ message: 'Nom, prix et ID du vendeur sont requis' });
    }
    
    // Ajouter la date de création
    productData.created_at = new Date().toISOString();
    
    const newProduct = await productService.createProduct(productData);
    
    return res.status(201).json(newProduct);
  } catch (error) {
    console.error('Erreur lors de la création du produit:', error);
    return res.status(500).json({ message: 'Erreur serveur' });
  }
}
