import axios from 'axios';
import { nocodbConfig } from './config';

// Créer une instance axios avec les configurations de base
const nocodbApi = axios.create({
  baseURL: `${nocodbConfig.apiUrl}/api/v1/db/data/v1/${nocodbConfig.projectId}`,
  headers: {
    'xc-auth': nocodbConfig.apiToken,
    'Content-Type': 'application/json'
  }
});

// Service pour les utilisateurs
export const userService = {
  // Récupérer tous les utilisateurs
  async getAllUsers() {
    try {
      const response = await nocodbApi.get('/users');
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs:', error);
      throw error;
    }
  },

  // Récupérer un utilisateur par ID
  async getUserById(id) {
    try {
      const response = await nocodbApi.get(`/users/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération de l'utilisateur ${id}:`, error);
      throw error;
    }
  },

  // Récupérer un utilisateur par email
  async getUserByEmail(email) {
    try {
      const response = await nocodbApi.get(`/users/findOne`, {
        params: {
          where: `(email,eq,${email})`
        }
      });
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération de l'utilisateur avec l'email ${email}:`, error);
      throw error;
    }
  },

  // Créer un nouvel utilisateur
  async createUser(userData) {
    try {
      const response = await nocodbApi.post('/users', userData);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la création de l\'utilisateur:', error);
      throw error;
    }
  },

  // Mettre à jour un utilisateur
  async updateUser(id, userData) {
    try {
      const response = await nocodbApi.patch(`/users/${id}`, userData);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la mise à jour de l'utilisateur ${id}:`, error);
      throw error;
    }
  },

  // Supprimer un utilisateur
  async deleteUser(id) {
    try {
      const response = await nocodbApi.delete(`/users/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la suppression de l'utilisateur ${id}:`, error);
      throw error;
    }
  },

  // Authentifier un utilisateur
  async authenticateUser(email, password) {
    try {
      // Récupérer l'utilisateur par email
      const user = await this.getUserByEmail(email);
      
      if (!user) {
        return { success: false, message: 'Utilisateur non trouvé' };
      }
      
      // Dans une application réelle, vous devriez vérifier le mot de passe haché
      // Pour cet exemple, nous supposons que le mot de passe est stocké en clair
      if (user.password === password) {
        // Ne pas renvoyer le mot de passe au client
        const { password, ...userWithoutPassword } = user;
        return { success: true, user: userWithoutPassword };
      } else {
        return { success: false, message: 'Mot de passe incorrect' };
      }
    } catch (error) {
      console.error('Erreur lors de l\'authentification:', error);
      throw error;
    }
  }
};

// Service pour les produits
export const productService = {
  // Récupérer tous les produits
  async getAllProducts() {
    try {
      const response = await nocodbApi.get('/products');
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des produits:', error);
      throw error;
    }
  },

  // Récupérer un produit par ID
  async getProductById(id) {
    try {
      const response = await nocodbApi.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération du produit ${id}:`, error);
      throw error;
    }
  },

  // Récupérer les produits par catégorie
  async getProductsByCategory(category) {
    try {
      const response = await nocodbApi.get(`/products`, {
        params: {
          where: `(category,eq,${category})`
        }
      });
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération des produits de la catégorie ${category}:`, error);
      throw error;
    }
  },

  // Récupérer les produits par vendeur
  async getProductsByVendor(vendorId) {
    try {
      const response = await nocodbApi.get(`/products`, {
        params: {
          where: `(vendor_id,eq,${vendorId})`
        }
      });
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération des produits du vendeur ${vendorId}:`, error);
      throw error;
    }
  },

  // Créer un nouveau produit
  async createProduct(productData) {
    try {
      const response = await nocodbApi.post('/products', productData);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la création du produit:', error);
      throw error;
    }
  },

  // Mettre à jour un produit
  async updateProduct(id, productData) {
    try {
      const response = await nocodbApi.patch(`/products/${id}`, productData);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la mise à jour du produit ${id}:`, error);
      throw error;
    }
  },

  // Supprimer un produit
  async deleteProduct(id) {
    try {
      const response = await nocodbApi.delete(`/products/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la suppression du produit ${id}:`, error);
      throw error;
    }
  }
};

// Service pour les commandes
export const orderService = {
  // Récupérer toutes les commandes
  async getAllOrders() {
    try {
      const response = await nocodbApi.get('/orders');
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des commandes:', error);
      throw error;
    }
  },

  // Récupérer une commande par ID
  async getOrderById(id) {
    try {
      const response = await nocodbApi.get(`/orders/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération de la commande ${id}:`, error);
      throw error;
    }
  },

  // Récupérer les commandes d'un utilisateur
  async getOrdersByUser(userId) {
    try {
      const response = await nocodbApi.get(`/orders`, {
        params: {
          where: `(user_id,eq,${userId})`
        }
      });
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération des commandes de l'utilisateur ${userId}:`, error);
      throw error;
    }
  },

  // Créer une nouvelle commande
  async createOrder(orderData) {
    try {
      const response = await nocodbApi.post('/orders', orderData);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la création de la commande:', error);
      throw error;
    }
  },

  // Mettre à jour une commande
  async updateOrder(id, orderData) {
    try {
      const response = await nocodbApi.patch(`/orders/${id}`, orderData);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la mise à jour de la commande ${id}:`, error);
      throw error;
    }
  },

  // Supprimer une commande
  async deleteOrder(id) {
    try {
      const response = await nocodbApi.delete(`/orders/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la suppression de la commande ${id}:`, error);
      throw error;
    }
  }
};

// Service pour les vendeurs
export const vendorService = {
  // Récupérer tous les vendeurs
  async getAllVendors() {
    try {
      const response = await nocodbApi.get('/vendors');
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des vendeurs:', error);
      throw error;
    }
  },

  // Récupérer un vendeur par ID
  async getVendorById(id) {
    try {
      const response = await nocodbApi.get(`/vendors/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération du vendeur ${id}:`, error);
      throw error;
    }
  },

  // Créer un nouveau vendeur
  async createVendor(vendorData) {
    try {
      const response = await nocodbApi.post('/vendors', vendorData);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la création du vendeur:', error);
      throw error;
    }
  },

  // Mettre à jour un vendeur
  async updateVendor(id, vendorData) {
    try {
      const response = await nocodbApi.patch(`/vendors/${id}`, vendorData);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la mise à jour du vendeur ${id}:`, error);
      throw error;
    }
  },

  // Supprimer un vendeur
  async deleteVendor(id) {
    try {
      const response = await nocodbApi.delete(`/vendors/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la suppression du vendeur ${id}:`, error);
      throw error;
    }
  }
};

// Exporter un objet avec tous les services
const nocodbService = {
  user: userService,
  product: productService,
  order: orderService,
  vendor: vendorService
};

export default nocodbService;
