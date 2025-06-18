import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Vérifier si l'utilisateur est déjà connecté
    const currentUser = typeof window !== 'undefined' ? localStorage.getItem('currentUser') : null
    
    if (currentUser) {
      // Rediriger vers le tableau de bord si l'utilisateur est déjà connecté
      router.push('/dashboard')
    }
  }, [router])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)
    
    // Validation simple
    if (!email || !password) {
      setError('يرجى ملء جميع الحقول')
      setIsLoading(false)
      return
    }
    
    try {
      // Appeler l'API de connexion
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })
      
      const data = await response.json()
      
      if (response.ok) {
        // Connexion réussie
        // Enregistrer l'utilisateur dans localStorage
        localStorage.setItem('currentUser', JSON.stringify(data.user))
        
        // Afficher un message de succès
        showNotification('تم تسجيل الدخول بنجاح', 'success')
        
        // Rediriger vers le tableau de bord
        setTimeout(() => {
          router.push('/dashboard')
        }, 1500)
      } else {
        // Erreur de connexion
        setError(data.message || 'فشل تسجيل الدخول')
      }
    } catch (error) {
      console.error('Erreur lors de la connexion:', error)
      setError('حدث خطأ أثناء الاتصال بالخادم')
    }
    
    setIsLoading(false)
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
    <Layout>
      <Head>
        <title>تسجيل الدخول - سويكا</title>
        <meta name="description" content="تسجيل الدخول إلى حسابك في سويكا" />
      </Head>

      <div className="auth-container">
        <div className="auth-header">
          <h1>تسجيل الدخول</h1>
          <p>أدخل بيانات حسابك للوصول إلى لوحة التحكم</p>
        </div>
        
        {error && (
          <div className="auth-error">
            <i className="fas fa-exclamation-circle"></i>
            <span>{error}</span>
          </div>
        )}
        
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="login-email">البريد الإلكتروني</label>
            <input 
              type="email" 
              id="login-email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="أدخل بريدك الإلكتروني"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="login-password">كلمة المرور</label>
            <input 
              type="password" 
              id="login-password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="أدخل كلمة المرور"
              required
            />
            <Link href="/forgot-password">
              <a className="forgot-password">نسيت كلمة المرور؟</a>
            </Link>
          </div>
          
          <button 
            type="submit" 
            className={`btn btn-primary ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <i className="fas fa-spinner fa-spin"></i>
                <span>جاري تسجيل الدخول...</span>
              </>
            ) : (
              'تسجيل الدخول'
            )}
          </button>
        </form>
        
        <div className="auth-footer">
          <p>ليس لديك حساب؟ <Link href="/register"><a>إنشاء حساب جديد</a></Link></p>
        </div>
        
        <div className="auth-social">
          <p>أو تسجيل الدخول باستخدام</p>
          <div className="social-buttons">
            <button className="btn btn-social btn-google">
              <i className="fab fa-google"></i>
              <span>Google</span>
            </button>
            <button className="btn btn-social btn-facebook">
              <i className="fab fa-facebook-f"></i>
              <span>Facebook</span>
            </button>
          </div>
        </div>
      </div>
    </Layout>
  )
}
