import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const VendorCard = ({ vendor }) => {
  const [isHovered, setIsHovered] = useState(false)

  // Fonction pour générer les étoiles de notation
  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0
    
    // Étoiles pleines
    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={`full-${i}`} className="fas fa-star"></i>)
    }
    
    // Demi-étoile si nécessaire
    if (hasHalfStar) {
      stars.push(<i key="half" className="fas fa-star-half-alt"></i>)
    }
    
    // Étoiles vides
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={`empty-${i}`} className="far fa-star"></i>)
    }
    
    return stars
  }

  return (
    <div 
      className={`vendor-card ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="vendor-logo">
        {vendor.logo ? (
          <Image 
            src={vendor.logo} 
            alt={vendor.name}
            width={100}
            height={100}
            layout="responsive"
            objectFit="cover"
          />
        ) : (
          <div className="placeholder-logo">
            <i className="fas fa-store"></i>
          </div>
        )}
      </div>
      <h3>{vendor.name}</h3>
      <div className="vendor-rating">
        {renderStars(vendor.rating)}
        <span>{vendor.rating}</span>
      </div>
      <p>{vendor.description}</p>
      <Link href={`/vendor/${vendor.id}`}>
        <a className="btn btn-outline btn-block">زيارة المتجر</a>
      </Link>
    </div>
  )
}

export default VendorCard
