import Link from 'next/link'
import { useEffect, useState } from 'react'

const CallToAction = ({ title, description, buttonText, buttonLink }) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const element = document.querySelector('.cta')
      if (element) {
        const position = element.getBoundingClientRect()
        
        // Si l'élément est visible dans la fenêtre
        if (position.top < window.innerHeight && position.bottom >= 0) {
          setIsVisible(true)
        }
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    // Vérifier une fois au chargement
    handleScroll()
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section className="cta">
      <div className="container">
        <div className={`cta-content ${isVisible ? 'fade-in' : ''}`}>
          <h2>{title}</h2>
          <p>{description}</p>
          <Link href={buttonLink || '/register'} className="btn btn-primary">
            {buttonText || 'سجل كبائع الآن'}
          </Link>
        </div>
      </div>
    </section>
  )
}

export default CallToAction
