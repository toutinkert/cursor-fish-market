import { vendorService } from '../../../services/nocodbService';

export default async function handler(req, res) {
  const { id } = req.query;
  
  if (!id) {
    return res.status(400).json({ message: 'ID du vendeur requis' });
  }

  switch (req.method) {
    case 'GET':
      return getVendorById(req, res, id);
    case 'PATCH':
    case 'PUT':
      return updateVendor(req, res, id);
    case 'DELETE':
      return deleteVendor(req, res, id);
    default:
      return res.status(405).json({ message: 'Méthode non autorisée' });
  }
}

// Récupérer un vendeur par ID
async function getVendorById(req, res, id) {
  try {
    const vendor = await vendorService.getVendorById(id);
    
    if (!vendor) {
      return res.status(404).json({ message: 'Vendeur non trouvé' });
    }
    
    return res.status(200).json(vendor);
  } catch (error) {
    console.error(`Erreur lors de la récupération du vendeur ${id}:`, error);
    return res.status(500).json({ message: 'Erreur serveur' });
  }
}

// Mettre à jour un vendeur
async function updateVendor(req, res, id) {
  try {
    const vendorData = req.body;
    
    // Vérifier si le vendeur existe
    const existingVendor = await vendorService.getVendorById(id);
    
    if (!existingVendor) {
      return res.status(404).json({ message: 'Vendeur non trouvé' });
    }
    
    // Ajouter la date de mise à jour
    vendorData.updated_at = new Date().toISOString();
    
    const updatedVendor = await vendorService.updateVendor(id, vendorData);
    
    return res.status(200).json(updatedVendor);
  } catch (error) {
    console.error(`Erreur lors de la mise à jour du vendeur ${id}:`, error);
    return res.status(500).json({ message: 'Erreur serveur' });
  }
}

// Supprimer un vendeur
async function deleteVendor(req, res, id) {
  try {
    // Vérifier si le vendeur existe
    const existingVendor = await vendorService.getVendorById(id);
    
    if (!existingVendor) {
      return res.status(404).json({ message: 'Vendeur non trouvé' });
    }
    
    await vendorService.deleteVendor(id);
    
    return res.status(200).json({ message: 'Vendeur supprimé avec succès' });
  } catch (error) {
    console.error(`Erreur lors de la suppression du vendeur ${id}:`, error);
    return res.status(500).json({ message: 'Erreur serveur' });
  }
}
