import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  const handleAddToCart = () => {
    // Récupérer les articles du panier existants
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || []
    
    // Vérifier si le produit est déjà dans le panier
    const existingItemIndex = cartItems.findIndex(item => item.id === product.id)
    
    if (existingItemIndex !== -1) {
      // Mettre à jour la quantité si le produit est déjà dans le panier
      cartItems[existingItemIndex].quantity += 1
    } else {
      // Ajouter un nouveau produit au panier
      cartItems.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        vendor: product.vendor,
        weight: product.weight,
        quantity: 1
      })
    }
    
    // Enregistrer le panier dans localStorage
    localStorage.setItem('cartItems', JSON.stringify(cartItems))
    
    // Afficher un message de succès
    showNotification('تمت إضافة المنتج إلى السلة بنجاح', 'success')
  }

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite)
    showNotification(
      isFavorite 
        ? 'تمت إزالة المنتج من المفضلة' 
        : 'تمت إضافة المنتج إلى المفضلة',
      'success'
    )
  }

  const handleToggleSaved = () => {
    setIsSaved(!isSaved)
    showNotification(
      isSaved 
        ? 'تمت إزالة المنتج من المحفوظات' 
        : 'تم حفظ المنتج للعودة إليه لاحقًا',
      'success'
    )
  }

  const showNotification = (message, type = 'info') => {
    // Créer l'élément de notification
    const notification = document.createElement('div')
    notification.className = `notification ${type}`
    notification.textContent = message
    
    // Ajouter au body
    document.body.appendChild(notification)
    
    // Afficher la notification
    setTimeout(() => {
      notification.classList.add('show')
    }, 10)
    
    // Masquer et supprimer la notification après 3 secondes
    setTimeout(() => {
      notification.classList.remove('show')
      
      // Supprimer du DOM après la fin de l'animation
      setTimeout(() => {
        document.body.removeChild(notification)
      }, 300)
    }, 3000)
  }

  return (
    <div 
      className={`product-card ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="product-image">
        {product.image ? (
          <Image 
            src={product.image} 
            alt={product.name}
            width={300}
            height={200}
            layout="responsive"
            objectFit="cover"
          />
        ) : (
          <div className="placeholder-image">
            <i className="fas fa-fish"></i>
          </div>
        )}
        {product.tag && (
          <div className={`product-tag ${product.tag === 'الأكثر مبيعاً' ? 'bestseller' : 'new'}`}>
            {product.tag}
          </div>
        )}
        <div className="product-actions">
          <button 
            className={`action-btn favorite-btn ${isFavorite ? 'active' : ''}`} 
            title={isFavorite ? "إزالة من المفضلة" : "إضافة إلى المفضلة"}
            onClick={handleToggleFavorite}
          >
            <i className={isFavorite ? "fas fa-heart" : "far fa-heart"}></i>
          </button>
          <button 
            className={`action-btn save-btn ${isSaved ? 'active' : ''}`} 
            title={isSaved ? "إزالة من المحفوظات" : "حفظ للعودة لاحقًا"}
            onClick={handleToggleSaved}
          >
            <i className={isSaved ? "fas fa-bookmark" : "far fa-bookmark"}></i>
          </button>
        </div>
      </div>
      <div className="product-info">
        <Link href={`/product/${product.id}`}>
          <h3 className="product-title">{product.name}</h3>
        </Link>
        <div className="product-meta">
          <span className="product-vendor">بائع: {product.vendor}</span>
          <span className="product-weight">الوزن: {product.weight}</span>
        </div>
        {product.location && (
          <div className="product-location">
            <i className="fas fa-map-marker-alt"></i> {product.location}
          </div>
        )}
        {product.description && (
          <div className="product-description">
            {product.description}
          </div>
        )}
        <div className="product-price">
          <span className="price">{product.price} DHS</span>
          {product.oldPrice && (
            <span className="old-price">{product.oldPrice} DHS</span>
          )}
        </div>
        <button 
          className="cart-btn"
          onClick={handleAddToCart}
          aria-label="أضف إلى السلة"
        >
          <i className="fas fa-shopping-cart"></i>
        </button>
      </div>

      <style jsx>{`
        .product-card {
          position: relative;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
          background: white;
          margin-bottom: 20px;
        }
        
        .product-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
        }
        
        .product-image {
          position: relative;
          height: 220px;
          overflow: hidden;
        }
        
        .product-actions {
          position: absolute;
          top: 10px;
          left: 10px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          z-index: 2;
        }
        
        .action-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
          opacity: 0.9;
          transform: translateX(-60px);
          animation: slideIn 0.3s forwards;
        }
        
        .product-card:hover .action-btn {
          opacity: 1;
        }
        
        @keyframes slideIn {
          to {
            transform: translateX(0);
          }
        }
        
        .action-btn:nth-child(2) {
          animation-delay: 0.1s;
        }
        
        .action-btn:nth-child(2) {
          animation-delay: 0.1s;
        }
        
        .favorite-btn {
          background-color: #e74c3c;
          color: white;
        }
        
        .favorite-btn:hover, .favorite-btn.active {
          background-color: #c0392b;
          transform: scale(1.1);
        }
        
        .save-btn {
          background-color: #f39c12;
          color: white;
        }
        
        .save-btn:hover, .save-btn.active {
          background-color: #d68910;
          transform: scale(1.1);
        }
        
        .product-info {
          padding: 20px;
          position: relative;
        }
        
        .product-title {
          font-size: 1.2rem;
          margin-bottom: 10px;
          color: #2c3e50;
          transition: color 0.3s ease;
        }
        
        .product-title:hover {
          color: #0088a9;
        }
        
        .product-meta {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
          font-size: 0.9rem;
          color: #7f8c8d;
        }
        
        .product-location {
          font-size: 0.9rem;
          color: #7f8c8d;
          margin-bottom: 10px;
        }
        
        .product-location i {
          color: #0088a9;
          margin-left: 5px;
        }
        
        .product-description {
          font-size: 0.9rem;
          color: #7f8c8d;
          margin-bottom: 15px;
          line-height: 1.5;
          max-height: 60px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        
        .product-price {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 15px;
        }
        
        .price {
          font-size: 1.3rem;
          font-weight: bold;
          color: #0088a9;
        }
        
        .old-price {
          font-size: 0.9rem;
          color: #95a5a6;
          text-decoration: line-through;
        }
        
        .cart-btn {
          position: absolute;
          bottom: 20px;
          left: 20px;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: linear-gradient(135deg, #f2d50f, #d4af37, #b8860b);
          color: white;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          cursor: pointer;
          box-shadow: 0 4px 15px rgba(212, 175, 55, 0.4);
          transition: all 0.3s ease;
        }
        
        .cart-btn:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 20px rgba(212, 175, 55, 0.6);
        }
        
        @media (max-width: 768px) {
          .product-image {
            height: 180px;
          }
          
          .action-btn {
            width: 35px;
            height: 35px;
            font-size: 0.9rem;
          }
          
          .cart-btn {
            width: 45px;
            height: 45px;
          }
        }
      `}</style>
    </div>
  )
}

export default ProductCard
