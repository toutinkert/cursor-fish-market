import Head from 'next/head'
import Link from 'next/link'
import { SignUp } from '@clerk/nextjs'
import Layout from '../components/Layout'

export default function Register() {

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
        
        <div className="clerk-auth-container">
          <SignUp 
            path="/register"
            routing="path"
            signInUrl="/login"
            redirectUrl="/dashboard"
            appearance={{
              elements: {
                formButtonPrimary: 'btn btn-primary',
                footerAction: 'auth-footer',
                rootBox: 'clerk-root-box',
                card: 'clerk-card'
              }
            }}
          />
        </div>
        
        <div className="auth-footer">
          <p>لديك حساب بالفعل؟ <Link href="/login"><a>تسجيل الدخول</a></Link></p>
        </div>
      </div>
    </Layout>
  )
}
