import { orderService } from '../../../services/nocodbService';

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      return getOrders(req, res);
    case 'POST':
      return createOrder(req, res);
    default:
      return res.status(405).json({ message: 'Méthode non autorisée' });
  }
}

// Récupérer toutes les commandes
async function getOrders(req, res) {
  try {
    const { user_id } = req.query;
    
    let orders;
    
    if (user_id) {
      // Récupérer les commandes d'un utilisateur spécifique
      orders = await orderService.getOrdersByUser(user_id);
    } else {
      // Récupérer toutes les commandes
      orders = await orderService.getAllOrders();
    }
    
    return res.status(200).json(orders);
  } catch (error) {
    console.error('Erreur lors de la récupération des commandes:', error);
    return res.status(500).json({ message: 'Erreur serveur' });
  }
}

// Créer une nouvelle commande
async function createOrder(req, res) {
  try {
    const orderData = req.body;
    
    // Vérifier si tous les champs requis sont fournis
    if (!orderData.user_id || !orderData.items || !orderData.total) {
      return res.status(400).json({ message: 'ID de l\'utilisateur, articles et total sont requis' });
    }
    
    // Ajouter la date de création et le statut initial
    orderData.created_at = new Date().toISOString();
    orderData.status = orderData.status || 'pending'; // Par défaut, le statut est "en attente"
    
    const newOrder = await orderService.createOrder(orderData);
    
    return res.status(201).json(newOrder);
  } catch (error) {
    console.error('Erreur lors de la création de la commande:', error);
    return res.status(500).json({ message: 'Erreur serveur' });
  }
}
