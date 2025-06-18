import { productService } from '../../../services/nocodbService';

export default async function handler(req, res) {
  const { id } = req.query;
  
  if (!id) {
    return res.status(400).json({ message: 'ID du produit requis' });
  }

  switch (req.method) {
    case 'GET':
      return getProductById(req, res, id);
    case 'PATCH':
    case 'PUT':
      return updateProduct(req, res, id);
    case 'DELETE':
      return deleteProduct(req, res, id);
    default:
      return res.status(405).json({ message: 'Méthode non autorisée' });
  }
}

// Récupérer un produit par ID
async function getProductById(req, res, id) {
  try {
    const product = await productService.getProductById(id);
    
    if (!product) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }
    
    return res.status(200).json(product);
  } catch (error) {
    console.error(`Erreur lors de la récupération du produit ${id}:`, error);
    return res.status(500).json({ message: 'Erreur serveur' });
  }
}

// Mettre à jour un produit
async function updateProduct(req, res, id) {
  try {
    const productData = req.body;
    
    // Vérifier si le produit existe
    const existingProduct = await productService.getProductById(id);
    
    if (!existingProduct) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }
    
    // Ajouter la date de mise à jour
    productData.updated_at = new Date().toISOString();
    
    const updatedProduct = await productService.updateProduct(id, productData);
    
    return res.status(200).json(updatedProduct);
  } catch (error) {
    console.error(`Erreur lors de la mise à jour du produit ${id}:`, error);
    return res.status(500).json({ message: 'Erreur serveur' });
  }
}

// Supprimer un produit
async function deleteProduct(req, res, id) {
  try {
    // Vérifier si le produit existe
    const existingProduct = await productService.getProductById(id);
    
    if (!existingProduct) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }
    
    await productService.deleteProduct(id);
    
    return res.status(200).json({ message: 'Produit supprimé avec succès' });
  } catch (error) {
    console.error(`Erreur lors de la suppression du produit ${id}:`, error);
    return res.status(500).json({ message: 'Erreur serveur' });
  }
}
