import { useState } from 'react'

const StepCard = ({ number, icon, title, description }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div 
      className={`step ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="step-number">{number}</div>
      <div className="step-icon">
        <i className={icon}></i>
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  )
}

export default StepCard
