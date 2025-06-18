import '../styles/globals.css'
import '../styles/stagewise.css'
import '../styles/chat.css'
import { useEffect } from 'react'
import dynamic from 'next/dynamic'

// Importer dynamiquement le composant ChatWidget pour éviter les erreurs de rendu côté serveur
const ChatWidget = dynamic(() => import('../components/ChatWidget'), {
  ssr: false
})

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Importer Font Awesome
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css'
    document.head.appendChild(link)
  }, [])

  return (
    <div dir="rtl" lang="ar">
      <Component {...pageProps} />
      <ChatWidget />
    </div>
  )
}

export default MyApp
