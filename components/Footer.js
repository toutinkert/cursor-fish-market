import Link from 'next/link'
import { useState } from 'react'

const Footer = () => {
  const [email, setEmail] = useState('')

  const handleNewsletterSubmit = (e) => {
    e.preventDefault()
    
    // Ici, vous enverriez normalement cela à votre backend
    // Pour l'instant, nous allons simplement afficher un message de succès
    showNotification('تم الاشتراك في النشرة البريدية بنجاح', 'success')
    setEmail('')
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
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-about">
            <h3>عن Swika</h3>
            <p>سويكا هي منصة إلكترونية تربط بين الصيادين والبائعين والمشترين لتسهيل عملية بيع وشراء الأسماك والمأكولات البحرية الطازجة.</p>
          </div>
          <div className="footer-links">
            <h3>روابط سريعة</h3>
            <ul>
              <li><Link href="/">الرئيسية</Link></li>
              <li><Link href="/marketplace">السوق</Link></li>
              <li><Link href="/vendors">البائعين</Link></li>
              <li><Link href="/about">من نحن</Link></li>
              <li><Link href="/contact">اتصل بنا</Link></li>
            </ul>
          </div>
          <div className="footer-contact">
            <h3>اتصل بنا</h3>
            <ul>
              <li><i className="fas fa-map-marker-alt"></i> شارع البحر، الدار البيضاء، المغرب</li>
              <li><i className="fas fa-phone"></i> +212 522 123 456</li>
              <li><i className="fas fa-envelope"></i> info@swika.com</li>
            </ul>
          </div>
          <div className="footer-newsletter">
            <h3>النشرة البريدية</h3>
            <p>اشترك في نشرتنا البريدية للحصول على أحدث العروض والأخبار</p>
            <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
              <input 
                type="email" 
                placeholder="البريد الإلكتروني" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit" className="btn btn-primary">اشتراك</button>
            </form>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="copyright">
            <p>&copy; 2025 Swika. جميع الحقوق محفوظة.</p>
          </div>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin-in"></i></a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
