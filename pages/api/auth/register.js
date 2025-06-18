import { userService } from '../../../services/nocodbService';

export default async function handler(req, res) {
  // Vérifier si la méthode est POST
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Méthode non autorisée' });
  }

  try {
    const { name, email, password, role } = req.body;

    // Vérifier si tous les champs requis sont fournis
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: 'Tous les champs sont requis' });
    }

    // Vérifier si l'email existe déjà
    try {
      const existingUser = await userService.getUserByEmail(email);
      if (existingUser) {
        return res.status(409).json({ message: 'Cet email est déjà utilisé' });
      }
    } catch (error) {
      // Si l'erreur est due au fait que l'utilisateur n'existe pas, on continue
      // Sinon, on propage l'erreur
      if (error.response && error.response.status !== 404) {
        throw error;
      }
    }

    // Créer l'utilisateur
    const userData = {
      name,
      email,
      password, // Dans une application réelle, vous devriez hacher le mot de passe
      role,
      created_at: new Date().toISOString()
    };

    const newUser = await userService.createUser(userData);

    // Retourner l'utilisateur créé sans le mot de passe
    const { password: _, ...userWithoutPassword } = newUser;
    return res.status(201).json({ success: true, user: userWithoutPassword });
  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error);
    return res.status(500).json({ message: 'Erreur serveur' });
  }
}
