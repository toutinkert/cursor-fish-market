import Head from 'next/head'
import Link from 'next/link'
import { SignIn } from '@clerk/nextjs'
import Layout from '../components/Layout'

export default function Login() {

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
        
        <div className="clerk-auth-container">
          <SignIn 
            path="/login"
            routing="path"
            signUpUrl="/register"
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
          <p>ليس لديك حساب؟ <Link href="/register"><a>إنشاء حساب جديد</a></Link></p>
        </div>
      </div>
    </Layout>
  )
}
