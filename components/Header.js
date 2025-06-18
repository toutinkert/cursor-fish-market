import Link from 'next/link'
import { useEffect, useState, useRef } from 'react'

const Header = () => {
  const [currentUser, setCurrentUser] = useState(null)
  const [cartItems, setCartItems] = useState([])
  const [isScrolled, setIsScrolled] = useState(false)
  const [currentPath, setCurrentPath] = useState('/')
  const [showSubscriptionMenu, setShowSubscriptionMenu] = useState(false)
  const subscriptionMenuRef = useRef(null)
  
  useEffect(() => {
    // Obtenir le chemin actuel
    if (typeof window !== 'undefined') {
      setCurrentPath(window.location.pathname)
    }
  }, [])

  useEffect(() => {
    // Vérifier si l'utilisateur est connecté
    const storedUser = localStorage.getItem('currentUser')
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser))
    }

    // Récupérer les articles du panier
    const storedCartItems = localStorage.getItem('cartItems')
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems))
    }

    // Ajouter un écouteur d'événement pour le défilement
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    // Ajouter un écouteur d'événement pour fermer le menu d'abonnement lors d'un clic à l'extérieur
    const handleClickOutside = (event) => {
      if (subscriptionMenuRef.current && !subscriptionMenuRef.current.contains(event.target)) {
        setShowSubscriptionMenu(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    document.addEventListener('mousedown', handleClickOutside)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleLogout = (e) => {
    e.preventDefault()
    
    // Supprimer l'utilisateur du localStorage
    localStorage.removeItem('currentUser')
    setCurrentUser(null)
    
    // Afficher un message de succès
    showNotification('تم تسجيل الخروج بنجاح', 'success')
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

  const totalCartItems = cartItems.reduce((total, item) => total + item.quantity, 0)

  // Gérer le clic sur le bouton d'abonnement
  const toggleSubscriptionMenu = () => {
    setShowSubscriptionMenu(!showSubscriptionMenu)
  }

  return (
    <header className={isScrolled ? 'scrolled' : ''}>
      <div className="container">
        <div className="logo">
          <Link href="/">
            <div>
              <h1>Swika</h1>
              <p>سوق الأسماك الإلكتروني</p>
            </div>
          </Link>
        </div>
        <nav>
          <ul>
            <li>
              <Link href="/" className={currentPath === '/' ? 'active' : ''}>
                الرئيسية
              </Link>
            </li>
            <li>
              <Link href="/marketplace" className={currentPath === '/marketplace' ? 'active' : ''}>
                السوق
              </Link>
            </li>
            <li>
              <Link href="/vendors" className={currentPath === '/vendors' ? 'active' : ''}>
                البائعين
              </Link>
            </li>
            <li>
              <Link href="/dashboard" className={currentPath === '/dashboard' ? 'active' : ''}>
                لوحة التحكم
              </Link>
            </li>
          </ul>
        </nav>
        <div className="user-actions">
          <div className="subscription-container" ref={subscriptionMenuRef}>
            <button 
              className="btn btn-gold subscription-btn" 
              onClick={toggleSubscriptionMenu}
              aria-expanded={showSubscriptionMenu}
              aria-haspopup="true"
            >
              <i className="fas fa-crown"></i>
              <span>اشترك</span>
            </button>
            
            {showSubscriptionMenu && (
              <div className="subscription-menu">
                <div className="subscription-menu-header">
                  <h3>اختر خطة الاشتراك</h3>
                </div>
                <div className="subscription-options">
                  <Link href="/service-pro" className="subscription-option">
                    <div className="subscription-icon">
                      <i className="fas fa-star"></i>
                    </div>
                    <div className="subscription-details">
                      <h4>Pro</h4>
                      <p>الخطة الأساسية للبائعين</p>
                    </div>
                  </Link>
                  <Link href="/service-pro-s" className="subscription-option">
                    <div className="subscription-icon">
                      <i className="fas fa-star-half-alt"></i>
                    </div>
                    <div className="subscription-details">
                      <h4>Pro S</h4>
                      <p>خطة متقدمة مع ميزات إضافية</p>
                    </div>
                  </Link>
                  <Link href="/service-pro-st" className="subscription-option">
                    <div className="subscription-icon">
                      <i className="fas fa-stars"></i>
                    </div>
                    <div className="subscription-details">
                      <h4>Pro ST</h4>
                      <p>الخطة الاحترافية الكاملة</p>
                    </div>
                  </Link>
                </div>
              </div>
            )}
          </div>
          
          {currentUser ? (
            <>
              <Link href="/dashboard" className="btn btn-outline">
                لوحة التحكم
              </Link>
              <button onClick={handleLogout} className="btn btn-primary">
                تسجيل الخروج
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="btn btn-outline">
                تسجيل الدخول
              </Link>
              <Link href="/register" className="btn btn-primary">
                إنشاء حساب
              </Link>
            </>
          )}
          
          <Link href="/cart" className="cart-icon">
            <span>
              <i className="fas fa-shopping-cart"></i>
              {totalCartItems > 0 && (
                <span id="cart-count" className="cart-count">
                  {totalCartItems}
                </span>
              )}
            </span>
          </Link>
        </div>
      </div>
      <div className="container stagewise-container">
        {/* Stagewise navigation will be rendered here */}
      </div>
      
      <style jsx>{`
        .subscription-container {
          position: relative;
        }
        
        .subscription-btn {
          display: flex;
          align-items: center;
          gap: 5px;
          background: var(--gold-gradient);
          color: white;
          border: none;
          padding: 8px 15px;
          border-radius: var(--border-radius);
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .subscription-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 15px rgba(212, 175, 55, 0.3);
        }
        
        .subscription-menu {
          position: absolute;
          top: calc(100% + 10px);
          right: 0;
          width: 280px;
          background-color: white;
          border-radius: var(--border-radius);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
          z-index: 1000;
          overflow: hidden;
          animation: fadeIn 0.3s ease;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .subscription-menu-header {
          background: var(--gold-gradient);
          color: white;
          padding: 15px;
          text-align: center;
        }
        
        .subscription-menu-header h3 {
          margin: 0;
          font-size: 1.1rem;
        }
        
        .subscription-options {
          padding: 10px;
        }
        
        .subscription-option {
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 15px;
          border-radius: var(--border-radius);
          transition: all 0.3s ease;
          color: var(--dark-color);
          text-decoration: none;
        }
        
        .subscription-option:hover {
          background-color: rgba(212, 175, 55, 0.1);
          transform: translateX(-5px);
        }
        
        .subscription-icon {
          width: 40px;
          height: 40px;
          background: var(--gold-gradient);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
        }
        
        .subscription-details h4 {
          margin: 0 0 5px 0;
          font-size: 1rem;
        }
        
        .subscription-details p {
          margin: 0;
          font-size: 0.8rem;
          color: var(--gray-color);
        }
        
        .cart-icon {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          background-color: var(--light-color);
          border-radius: 50%;
          color: var(--primary-color);
          transition: all 0.3s ease;
        }
        
        .cart-icon:hover {
          background-color: var(--primary-color);
          color: white;
          transform: translateY(-3px);
        }
        
        .cart-count {
          position: absolute;
          top: -5px;
          right: -5px;
          width: 20px;
          height: 20px;
          background-color: var(--accent-color);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.7rem;
          font-weight: bold;
        }
        
        @media (max-width: 768px) {
          .subscription-menu {
            width: 250px;
          }
        }
      `}</style>
    </header>
  )
}

export default Header
