import { vendorService } from '../../../services/nocodbService';

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      return getVendors(req, res);
    case 'POST':
      return createVendor(req, res);
    default:
      return res.status(405).json({ message: 'Méthode non autorisée' });
  }
}

// Récupérer tous les vendeurs
async function getVendors(req, res) {
  try {
    const vendors = await vendorService.getAllVendors();
    return res.status(200).json(vendors);
  } catch (error) {
    console.error('Erreur lors de la récupération des vendeurs:', error);
    return res.status(500).json({ message: 'Erreur serveur' });
  }
}

// Créer un nouveau vendeur
async function createVendor(req, res) {
  try {
    const vendorData = req.body;
    
    // Vérifier si tous les champs requis sont fournis
    if (!vendorData.name || !vendorData.user_id) {
      return res.status(400).json({ message: 'Nom et ID de l\'utilisateur sont requis' });
    }
    
    // Ajouter la date de création
    vendorData.created_at = new Date().toISOString();
    
    const newVendor = await vendorService.createVendor(vendorData);
    
    return res.status(201).json(newVendor);
  } catch (error) {
    console.error('Erreur lors de la création du vendeur:', error);
    return res.status(500).json({ message: 'Erreur serveur' });
  }
}
