import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [role, setRole] = useState('customer')
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
    if (!name || !email || !password || !confirmPassword) {
      setError('يرجى ملء جميع الحقول')
      setIsLoading(false)
      return
    }
    
    if (password !== confirmPassword) {
      setError('كلمات المرور غير متطابقة')
      setIsLoading(false)
      return
    }
    
    if (password.length < 6) {
      setError('يجب أن تتكون كلمة المرور من 6 أحرف على الأقل')
      setIsLoading(false)
      return
    }
    
    try {
      // Appeler l'API d'inscription
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password, role })
      })
      
      const data = await response.json()
      
      if (response.ok) {
        // Inscription réussie
        // Enregistrer l'utilisateur dans localStorage
        localStorage.setItem('currentUser', JSON.stringify(data.user))
        
        // Afficher un message de succès
        showNotification('تم إنشاء الحساب بنجاح', 'success')
        
        // Si l'utilisateur est un vendeur, créer un profil de vendeur
        if (role === 'vendor') {
          try {
            // Créer un profil de vendeur
            await fetch('/api/vendors', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                name: name,
                user_id: data.user.id,
                description: '',
                logo: '',
                rating: 0,
                created_at: new Date().toISOString()
              })
            })
          } catch (vendorError) {
            console.error('Erreur lors de la création du profil vendeur:', vendorError)
            // Continuer malgré l'erreur, car l'utilisateur est déjà créé
          }
        }
        
        // Rediriger vers le tableau de bord
        setTimeout(() => {
          router.push('/dashboard')
        }, 1500)
      } else {
        // Erreur d'inscription
        setError(data.message || 'فشل إنشاء الحساب')
      }
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error)
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
        <title>إنشاء حساب - سويكا</title>
        <meta name="description" content="إنشاء حساب جديد في سويكا" />
      </Head>

      <div className="auth-container">
        <div className="auth-header">
          <h1>إنشاء حساب جديد</h1>
          <p>أنشئ حسابك للوصول إلى جميع ميزات سويكا</p>
        </div>
        
        {error && (
          <div className="auth-error">
            <i className="fas fa-exclamation-circle"></i>
            <span>{error}</span>
          </div>
        )}
        
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="register-name">الاسم</label>
            <input 
              type="text" 
              id="register-name" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="أدخل اسمك الكامل"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="register-email">البريد الإلكتروني</label>
            <input 
              type="email" 
              id="register-email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="أدخل بريدك الإلكتروني"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="register-password">كلمة المرور</label>
            <input 
              type="password" 
              id="register-password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="أدخل كلمة المرور"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="register-confirm-password">تأكيد كلمة المرور</label>
            <input 
              type="password" 
              id="register-confirm-password" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="أعد إدخال كلمة المرور"
              required
            />
          </div>
          
          <div className="form-group">
            <label>نوع الحساب</label>
            <div className="role-options">
              <label className="role-option">
                <input 
                  type="radio" 
                  name="role" 
                  value="customer" 
                  checked={role === 'customer'}
                  onChange={() => setRole('customer')}
                />
                <div className="role-content">
                  <i className="fas fa-user"></i>
                  <span>مشتري</span>
                  <p>أريد شراء المنتجات من السوق</p>
                </div>
              </label>
              
              <label className="role-option">
                <input 
                  type="radio" 
                  name="role" 
                  value="vendor" 
                  checked={role === 'vendor'}
                  onChange={() => setRole('vendor')}
                />
                <div className="role-content">
                  <i className="fas fa-store"></i>
                  <span>بائع</span>
                  <p>أريد بيع منتجاتي في السوق</p>
                </div>
              </label>
            </div>
          </div>
          
          <div className="form-group">
            <label className="checkbox-label">
              <input type="checkbox" required />
              <span>أوافق على <Link href="/terms"><a>شروط الاستخدام</a></Link> و <Link href="/privacy"><a>سياسة الخصوصية</a></Link></span>
            </label>
          </div>
          
          <button 
            type="submit" 
            className={`btn btn-primary ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <i className="fas fa-spinner fa-spin"></i>
                <span>جاري إنشاء الحساب...</span>
              </>
            ) : (
              'إنشاء حساب'
            )}
          </button>
        </form>
        
        <div className="auth-footer">
          <p>لديك حساب بالفعل؟ <Link href="/login"><a>تسجيل الدخول</a></Link></p>
        </div>
        
        <div className="auth-social">
          <p>أو إنشاء حساب باستخدام</p>
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
