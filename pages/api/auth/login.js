import { userService } from '../../../services/nocodbService';

export default async function handler(req, res) {
  // Vérifier si la méthode est POST
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Méthode non autorisée' });
  }

  try {
    const { email, password } = req.body;

    // Vérifier si l'email et le mot de passe sont fournis
    if (!email || !password) {
      return res.status(400).json({ message: 'Email et mot de passe requis' });
    }

    // Authentifier l'utilisateur
    const result = await userService.authenticateUser(email, password);

    if (result.success) {
      // Retourner l'utilisateur sans le mot de passe
      return res.status(200).json({ success: true, user: result.user });
    } else {
      // Retourner un message d'erreur
      return res.status(401).json({ success: false, message: result.message });
    }
  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
    return res.status(500).json({ message: 'Erreur serveur' });
  }
}
