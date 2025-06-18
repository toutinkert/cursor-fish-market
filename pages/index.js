import { useEffect, useState } from 'react'
import Head from 'next/head'
import Layout from '../components/Layout'
import Hero from '../components/Hero'
import FeatureCard from '../components/FeatureCard'
import ProductCard from '../components/ProductCard'
import VendorCard from '../components/VendorCard'
import StepCard from '../components/StepCard'
import CallToAction from '../components/CallToAction'
import Link from 'next/link'

export default function Home() {
  const [products, setProducts] = useState([])
  const [vendors, setVendors] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Simuler le chargement des données
    const loadData = async () => {
      // Données de produits fictives
      const dummyProducts = [
        {
          id: 'p1',
          name: 'Saumon Frais',
          price: 120,
          oldPrice: 150,
          image: '/images/salmon.jpg',
          vendor: 'Pêcheurs de l\'Atlantique',
          weight: '1 kg',
          tag: 'Bestseller'
        },
        {
          id: 'p2',
          name: 'Thon Frais',
          price: 90,
          image: '/images/tuna.jpg',
          vendor: 'Poissons du Maroc',
          weight: '1 kg'
        },
        {
          id: 'p3',
          name: 'Crevettes Fraîches',
          price: 85,
          oldPrice: 100,
          image: '/images/shrimp.jpg',
          vendor: 'Fruits de Mer',
          weight: '500 g',
          tag: 'Nouveau'
        },
        {
          id: 'p4',
          name: 'Bar',
          price: 130,
          image: '/images/seabass.jpg',
          vendor: 'Pêche du Jour',
          weight: '1.5 kg'
        }
      ]
      
      // Données de vendeurs fictives
      const dummyVendors = [
        {
          id: 'v1',
          name: 'Pêcheurs de l\'Atlantique',
          logo: '/images/vendor1.jpg',
          rating: 4.5,
          description: 'Spécialistes des poissons frais de l\'Atlantique'
        },
        {
          id: 'v2',
          name: 'Poissons du Maroc',
          logo: '/images/vendor2.jpg',
          rating: 4.0,
          description: 'Les meilleures variétés de poissons du Maroc'
        },
        {
          id: 'v3',
          name: 'Fruits de Mer',
          logo: '/images/vendor3.jpg',
          rating: 5.0,
          description: 'Une variété de fruits de mer frais'
        }
      ]
      
      setProducts(dummyProducts)
      setVendors(dummyVendors)
      setIsLoaded(true)
    }
    
    loadData()
  }, [])

  // Caractéristiques du site
  const features = [
    {
      icon: 'fas fa-fish',
      title: 'Poissons Frais',
      description: 'Nous vous garantissons les meilleurs poissons frais directement des pêcheurs'
    },
    {
      icon: 'fas fa-truck',
      title: 'Livraison Rapide',
      description: 'Nous livrons votre commande dans les plus brefs délais pour préserver la qualité des produits'
    },
    {
      icon: 'fas fa-store',
      title: 'Vendeurs Fiables',
      description: 'Tous les vendeurs de notre plateforme sont vérifiés pour garantir la qualité des produits'
    },
    {
      icon: 'fas fa-shield-alt',
      title: 'Paiement Sécurisé',
      description: 'Méthodes de paiement multiples et sécurisées pour une expérience d\'achat confortable'
    }
  ]
  
  // Étapes de fonctionnement
  const steps = [
    {
      number: 1,
      icon: 'fas fa-user-plus',
      title: 'Créer un Compte',
      description: 'Inscrivez-vous en tant qu\'acheteur ou vendeur sur notre plateforme en quelques étapes simples'
    },
    {
      number: 2,
      icon: 'fas fa-search',
      title: 'Parcourir les Produits',
      description: 'Recherchez les poissons que vous souhaitez parmi une variété de vendeurs'
    },
    {
      number: 3,
      icon: 'fas fa-shopping-cart',
      title: 'Ajouter au Panier',
      description: 'Sélectionnez les produits et ajoutez-les à votre panier'
    },
    {
      number: 4,
      icon: 'fas fa-credit-card',
      title: 'Finaliser l\'Achat',
      description: 'Complétez le processus d\'achat en utilisant votre méthode de paiement préférée'
    },
    {
      number: 5,
      icon: 'fas fa-truck',
      title: 'Recevoir la Commande',
      description: 'Recevez votre commande à domicile ou au point de collecte désigné'
    }
  ]

  return (
    <Layout>
      <Head>
        <title>Swika - Marché de Poisson</title>
        <meta name="description" content="Swika - Marché de Poisson en Ligne" />
      </Head>

      <Hero 
        title="Le Meilleur Marché de Poissons Frais"
        description="Achetez et vendez des poissons frais directement des pêcheurs et fournisseurs locaux"
        image="/images/hero-fish.png"
      />

      <section className="features">
        <div className="container">
          <h2 className="section-title">Pourquoi Choisir Swika?</h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <FeatureCard 
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="popular-products">
        <div className="container">
          <h2 className="section-title">Produits les Plus Vendus</h2>
          <div className="products-grid">
            {isLoaded ? (
              products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              // Afficher des placeholders pendant le chargement
              Array(4).fill(0).map((_, index) => (
                <div key={index} className="product-card skeleton"></div>
              ))
            )}
          </div>
          <div className="view-all">
            <Link href="/marketplace" className="btn btn-outline">
              Voir Tous les Produits
            </Link>
          </div>
        </div>
      </section>

      <section className="vendors-section">
        <div className="container">
          <h2 className="section-title">Meilleurs Vendeurs</h2>
          <div className="vendors-grid">
            {isLoaded ? (
              vendors.map(vendor => (
                <VendorCard key={vendor.id} vendor={vendor} />
              ))
            ) : (
              // Afficher des placeholders pendant le chargement
              Array(3).fill(0).map((_, index) => (
                <div key={index} className="vendor-card skeleton"></div>
              ))
            )}
          </div>
          <div className="view-all">
            <Link href="/vendors" className="btn btn-outline">
              Voir Tous les Vendeurs
            </Link>
          </div>
        </div>
      </section>

      <section className="how-it-works">
        <div className="container">
          <h2 className="section-title">Comment Fonctionne Swika?</h2>
          <div className="steps">
            {steps.map((step, index) => (
              <StepCard 
                key={index}
                number={step.number}
                icon={step.icon}
                title={step.title}
                description={step.description}
              />
            ))}
          </div>
        </div>
      </section>

      <CallToAction 
        title="Êtes-vous un Pêcheur ou un Marchand de Poisson?"
        description="Rejoignez notre plateforme et commencez à vendre vos produits à des milliers de clients"
        buttonText="Inscrivez-vous en tant que Vendeur"
        buttonLink="/register"
      />
    </Layout>
  )
}
