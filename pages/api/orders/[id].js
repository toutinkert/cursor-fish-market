import { orderService } from '../../../services/nocodbService';

export default async function handler(req, res) {
  const { id } = req.query;
  
  if (!id) {
    return res.status(400).json({ message: 'ID de la commande requis' });
  }

  switch (req.method) {
    case 'GET':
      return getOrderById(req, res, id);
    case 'PATCH':
    case 'PUT':
      return updateOrder(req, res, id);
    case 'DELETE':
      return deleteOrder(req, res, id);
    default:
      return res.status(405).json({ message: 'Méthode non autorisée' });
  }
}

// Récupérer une commande par ID
async function getOrderById(req, res, id) {
  try {
    const order = await orderService.getOrderById(id);
    
    if (!order) {
      return res.status(404).json({ message: 'Commande non trouvée' });
    }
    
    return res.status(200).json(order);
  } catch (error) {
    console.error(`Erreur lors de la récupération de la commande ${id}:`, error);
    return res.status(500).json({ message: 'Erreur serveur' });
  }
}

// Mettre à jour une commande
async function updateOrder(req, res, id) {
  try {
    const orderData = req.body;
    
    // Vérifier si la commande existe
    const existingOrder = await orderService.getOrderById(id);
    
    if (!existingOrder) {
      return res.status(404).json({ message: 'Commande non trouvée' });
    }
    
    // Ajouter la date de mise à jour
    orderData.updated_at = new Date().toISOString();
    
    const updatedOrder = await orderService.updateOrder(id, orderData);
    
    return res.status(200).json(updatedOrder);
  } catch (error) {
    console.error(`Erreur lors de la mise à jour de la commande ${id}:`, error);
    return res.status(500).json({ message: 'Erreur serveur' });
  }
}

// Supprimer une commande
async function deleteOrder(req, res, id) {
  try {
    // Vérifier si la commande existe
    const existingOrder = await orderService.getOrderById(id);
    
    if (!existingOrder) {
      return res.status(404).json({ message: 'Commande non trouvée' });
    }
    
    await orderService.deleteOrder(id);
    
    return res.status(200).json({ message: 'Commande supprimée avec succès' });
  } catch (error) {
    console.error(`Erreur lors de la suppression de la commande ${id}:`, error);
    return res.status(500).json({ message: 'Erreur serveur' });
  }
}
