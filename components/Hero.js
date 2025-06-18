import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'

const Hero = ({ title, description, image }) => {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <section className="hero">
      <div className="container">
        <div className={`hero-content ${isLoaded ? 'fade-in' : ''}`}>
          <h2>{title}</h2>
          <p>{description}</p>
          <div className="hero-buttons">
            <Link href="/marketplace" className="btn btn-primary">
              تصفح السوق
            </Link>
            <Link href="/register" className="btn btn-secondary">
              سجل كبائع
            </Link>
          </div>
        </div>
        <div className={`hero-image ${isLoaded ? 'fade-in' : ''}`}>
          {image ? (
            <Image 
              src={image} 
              alt="أسماك طازجة"
              width={500}
              height={400}
              objectFit="contain"
            />
          ) : (
            <div className="placeholder-hero-image">
              <i className="fas fa-fish fa-5x"></i>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Hero
