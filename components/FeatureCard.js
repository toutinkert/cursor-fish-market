import { useState } from 'react'

const FeatureCard = ({ icon, title, description }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div 
      className={`feature-card ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="feature-icon">
        <i className={icon}></i>
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  )
}

export default FeatureCard
