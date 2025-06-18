import Header from './Header'
import Footer from './Footer'
import ChatWidget from './ChatWidget'
import { useEffect } from 'react'

const Layout = ({ children }) => {
  useEffect(() => {
    // Initialiser Stagewise si le conteneur existe
    if (typeof window !== 'undefined' && window.Stagewise) {
      const stageWiseContainer = document.querySelector('.stagewise-container')
      if (stageWiseContainer) {
        // Obtenir le chemin de la page actuelle
        const currentPath = window.location.pathname
        const currentPage = currentPath === '/' ? 'index' : currentPath.split('/')[1]
        
        // Définir les étapes de navigation en fonction de la structure du site
        const steps = [
          { 
            title: 'الرئيسية',
            description: 'الصفحة الرئيسية',
            path: '/'
          },
          { 
            title: 'السوق',
            description: 'تصفح المنتجات',
            path: '/marketplace'
          },
          { 
            title: 'البائعين',
            description: 'تصفح البائعين',
            path: '/vendors'
          },
          { 
            title: 'لوحة التحكم',
            description: 'إدارة حسابك',
            path: '/dashboard'
          }
        ]
        
        // Déterminer l'étape actuelle en fonction de la page actuelle
        let currentStep = 0
        steps.forEach((step, index) => {
          if (currentPage === step.path || (currentPage === 'index' && step.path === '/')) {
            currentStep = index
          }
        })
        
        // Initialiser Stagewise
        new window.Stagewise({
          container: '.stagewise-container',
          steps: steps,
          currentStep: currentStep,
          direction: 'horizontal',
          clickable: true,
          onStepChange: (currentStep, newStep) => {
            // Naviguer vers la page correspondant à l'étape sélectionnée
            window.location.href = steps[newStep].path
            return false // Empêcher le rendu par défaut car nous naviguons ailleurs
          }
        })
      }
    }
  }, [])

  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <ChatWidget />
    </>
  )
}

export default Layout
