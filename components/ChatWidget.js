import { useState, useEffect, useRef } from 'react'

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)
  const webhookUrl = 'https://ai.swika.shop/webhook/c968dd8e-5fa3-4800-a4f5-745b9b6afb5d/chat'

  // Ajouter un message de bienvenue au chargement
  useEffect(() => {
    setMessages([
      {
        id: 'welcome',
        text: 'مرحبًا بك في سويكا! أنا المساعد الافتراضي الخاص بك. كيف يمكنني مساعدتك اليوم؟',
        sender: 'bot'
      }
    ])
  }, [])
  
  // Mettre le focus sur le champ de saisie lorsque le chat est ouvert
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current.focus()
      }, 300)
    }
  }, [isOpen])

  // Faire défiler vers le bas lorsque de nouveaux messages sont ajoutés
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  // Gérer l'envoi d'un message
  const handleSendMessage = async (e) => {
    e.preventDefault()
    
    if (!inputMessage.trim()) return
    
    // Ajouter le message de l'utilisateur à la liste des messages
    const userMessage = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user'
    }
    
    setMessages(prevMessages => [...prevMessages, userMessage])
    setInputMessage('')
    setIsLoading(true)
    
    try {
      // Envoyer le message au webhook
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: inputMessage,
          sessionId: localStorage.getItem('chatSessionId') || Date.now().toString()
        })
      })
      
      if (!response.ok) {
        throw new Error('فشل في الاتصال بخدمة الدردشة')
      }
      
      const data = await response.json()
      
      // Enregistrer l'ID de session si c'est un nouveau chat
      if (data.sessionId && !localStorage.getItem('chatSessionId')) {
        localStorage.setItem('chatSessionId', data.sessionId)
      }
      
      // Ajouter la réponse du bot à la liste des messages
      const botMessage = {
        id: Date.now().toString() + '-bot',
        text: data.response || 'عذرًا، لم أتمكن من فهم رسالتك. هل يمكنك إعادة صياغتها؟',
        sender: 'bot'
      }
      
      setMessages(prevMessages => [...prevMessages, botMessage])
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message:', error)
      
      // Ajouter un message d'erreur
      const errorMessage = {
        id: Date.now().toString() + '-error',
        text: 'عذرًا، حدث خطأ في الاتصال. يرجى المحاولة مرة أخرى لاحقًا.',
        sender: 'bot',
        isError: true
      }
      
      setMessages(prevMessages => [...prevMessages, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="chat-widget">
      {/* Bouton pour ouvrir/fermer le chat */}
      <button 
        className={`chat-toggle-btn ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'إغلاق المحادثة' : 'فتح المحادثة'}
      >
        {isOpen ? (
          <i className="fas fa-times"></i>
        ) : (
          <>
            <i className="fas fa-comments"></i>
            <span className="chat-label">تحدث معنا</span>
          </>
        )}
      </button>
      
      {/* Fenêtre de chat */}
      <div className={`chat-window ${isOpen ? 'open' : ''}`}>
        <div className="chat-header">
          <div className="chat-title">
            <i className="fas fa-fish"></i>
            <h3>مساعد سويكا</h3>
          </div>
          <button 
            className="chat-close-btn"
            onClick={() => setIsOpen(false)}
            aria-label="إغلاق المحادثة"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
        
        <div className="chat-messages">
          {messages.map(message => (
            <div 
              key={message.id} 
              className={`chat-message ${message.sender} ${message.isError ? 'error' : ''}`}
            >
              {message.text}
            </div>
          ))}
          
          {isLoading && (
            <div className="chat-message bot loading">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        <form className="chat-input-form" onSubmit={handleSendMessage}>
          <input 
            type="text" 
            ref={inputRef}
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="اكتب رسالتك هنا..."
            disabled={isLoading}
          />
          <button 
            type="submit" 
            disabled={isLoading || !inputMessage.trim()}
            title="إرسال"
          >
            <i className="fas fa-paper-plane"></i>
          </button>
        </form>
      </div>
    </div>
  )
}

export default ChatWidget
