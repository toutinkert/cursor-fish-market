import { useEffect, useState } from 'react'
import Head from 'next/head'
import Layout from '../components/Layout'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Dashboard() {
  const [currentUser, setCurrentUser] = useState(null)
  const [activeTab, setActiveTab] = useState('overview')
  const [orders, setOrders] = useState([])
  const [products, setProducts] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Vérifier si l'utilisateur est connecté
    const storedUser = typeof window !== 'undefined' ? localStorage.getItem('currentUser') : null
    
    if (storedUser) {
      const user = JSON.parse(storedUser)
      setCurrentUser(user)
      
      // Charger les données depuis l'API
      const loadData = async () => {
        try {
          // Récupérer les commandes de l'utilisateur
          const ordersResponse = await fetch(`/api/orders?user_id=${user.id}`)
          if (ordersResponse.ok) {
            const ordersData = await ordersResponse.json()
            setOrders(ordersData)
          }
          
          // Si l'utilisateur est un vendeur, récupérer ses produits
          if (user.role === 'vendor') {
            // Récupérer le profil du vendeur
            const vendorResponse = await fetch(`/api/vendors?user_id=${user.id}`)
            if (vendorResponse.ok) {
              const vendorsData = await vendorResponse.json()
              if (vendorsData && vendorsData.length > 0) {
                const vendorId = vendorsData[0].id
                
                // Récupérer les produits du vendeur
                const productsResponse = await fetch(`/api/products?vendor=${vendorId}`)
                if (productsResponse.ok) {
                  const productsData = await productsResponse.json()
                  setProducts(productsData)
                }
              }
            }
          }
          
          setIsLoaded(true)
        } catch (error) {
          console.error('Erreur lors du chargement des données:', error)
          // Utiliser des données fictives en cas d'erreur
          setOrders([
            {
              id: 'o1',
              date: '2025-06-10',
              total: 320,
              status: 'completed',
              items: [
                { id: 'p1', name: 'سمك السلمون الطازج', quantity: 2, price: 120 },
                { id: 'p3', name: 'روبيان طازج', quantity: 1, price: 80 }
              ]
            },
            {
              id: 'o2',
              date: '2025-06-05',
              total: 150,
              status: 'pending',
              items: [
                { id: 'p5', name: 'سمك الهامور', quantity: 1, price: 150 }
              ]
            }
          ])
          
          if (user.role === 'vendor') {
            setProducts([
              {
                id: 'p1',
                name: 'سمك السلمون الطازج',
                price: 120,
                stock: 15,
                sales: 42,
                image: '/images/salmon.jpg'
              },
              {
                id: 'p2',
                name: 'تونة طازجة',
                price: 90,
                stock: 8,
                sales: 27,
                image: '/images/tuna.jpg'
              }
            ])
          }
          
          setIsLoaded(true)
        }
      }
      
      loadData()
    } else {
      // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
      router.push('/login')
    }
  }, [router])

  // Gérer le changement d'onglet
  const handleTabChange = (tab) => {
    setActiveTab(tab)
  }

  // Obtenir le statut de la commande en arabe
  const getOrderStatus = (status) => {
    switch (status) {
      case 'completed':
        return 'مكتمل'
      case 'pending':
        return 'قيد الانتظار'
      case 'cancelled':
        return 'ملغي'
      default:
        return status
    }
  }

  // Obtenir la classe CSS pour le statut de la commande
  const getStatusClass = (status) => {
    switch (status) {
      case 'completed':
        return 'status-completed'
      case 'pending':
        return 'status-pending'
      case 'cancelled':
        return 'status-cancelled'
      default:
        return ''
    }
  }

  if (!currentUser) {
    return (
      <Layout>
        <div className="container">
          <p>جاري التحميل...</p>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <Head>
        <title>لوحة التحكم - سويكا</title>
        <meta name="description" content="لوحة تحكم المستخدم - سويكا" />
      </Head>

      <div className="page-header">
        <div className="container">
          <h1>لوحة التحكم</h1>
          <div className="breadcrumb">
            <Link href="/">
              <a>الرئيسية</a>
            </Link>
            <span> / </span>
            <span>لوحة التحكم</span>
          </div>
        </div>
      </div>

      <div className="container dashboard-container">
        <div className="dashboard-sidebar">
          <div className="user-info">
            <div className="user-avatar">
              <img src="/images/avatar-placeholder.jpg" alt={currentUser.name} />
            </div>
            <div className="user-details">
              <h3>{currentUser.name}</h3>
              <p>{currentUser.role === 'vendor' ? 'بائع' : 'مشتري'}</p>
            </div>
          </div>
          
          <div className="dashboard-nav">
            <ul>
              <li>
                <a 
                  href="#" 
                  className={activeTab === 'overview' ? 'active' : ''}
                  onClick={(e) => {
                    e.preventDefault()
                    handleTabChange('overview')
                  }}
                >
                  <i className="fas fa-tachometer-alt"></i>
                  نظرة عامة
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className={activeTab === 'orders' ? 'active' : ''}
                  onClick={(e) => {
                    e.preventDefault()
                    handleTabChange('orders')
                  }}
                >
                  <i className="fas fa-shopping-bag"></i>
                  الطلبات
                </a>
              </li>
              {currentUser.role === 'vendor' && (
                <li>
                  <a 
                    href="#" 
                    className={activeTab === 'products' ? 'active' : ''}
                    onClick={(e) => {
                      e.preventDefault()
                      handleTabChange('products')
                    }}
                  >
                    <i className="fas fa-fish"></i>
                    المنتجات
                  </a>
                </li>
              )}
              <li>
                <a 
                  href="#" 
                  className={activeTab === 'profile' ? 'active' : ''}
                  onClick={(e) => {
                    e.preventDefault()
                    handleTabChange('profile')
                  }}
                >
                  <i className="fas fa-user"></i>
                  الملف الشخصي
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault()
                    // Déconnexion
                    localStorage.removeItem('currentUser')
                    router.push('/')
                  }}
                >
                  <i className="fas fa-sign-out-alt"></i>
                  تسجيل الخروج
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="dashboard-content">
          {/* Onglet Aperçu */}
          {activeTab === 'overview' && (
            <div className="dashboard-tab">
              <div className="dashboard-header">
                <h2>نظرة عامة</h2>
              </div>
              
              <div className="dashboard-cards">
                <div className="dashboard-card">
                  <div className="card-icon">
                    <i className="fas fa-shopping-bag"></i>
                  </div>
                  <div className="card-info">
                    <h3>{orders.length}</h3>
                    <p>إجمالي الطلبات</p>
                  </div>
                </div>
                
                {currentUser.role === 'vendor' && (
                  <>
                    <div className="dashboard-card">
                      <div className="card-icon">
                        <i className="fas fa-fish"></i>
                      </div>
                      <div className="card-info">
                        <h3>{products.length}</h3>
                        <p>إجمالي المنتجات</p>
                      </div>
                    </div>
                    
                    <div className="dashboard-card">
                      <div className="card-icon">
                        <i className="fas fa-chart-line"></i>
                      </div>
                      <div className="card-info">
                        <h3>{products.reduce((total, product) => total + product.sales, 0)}</h3>
                        <p>إجمالي المبيعات</p>
                      </div>
                    </div>
                  </>
                )}
                
                <div className="dashboard-card">
                  <div className="card-icon">
                    <i className="fas fa-wallet"></i>
                  </div>
                  <div className="card-info">
                    <h3>{orders.reduce((total, order) => total + order.total, 0)} ريال</h3>
                    <p>إجمالي المشتريات</p>
                  </div>
                </div>
              </div>
              
              <div className="recent-orders">
                <h3>آخر الطلبات</h3>
                {isLoaded ? (
                  orders.length > 0 ? (
                    <table className="orders-table">
                      <thead>
                        <tr>
                          <th>رقم الطلب</th>
                          <th>التاريخ</th>
                          <th>المبلغ</th>
                          <th>الحالة</th>
                          <th>الإجراءات</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.slice(0, 3).map(order => (
                          <tr key={order.id}>
                            <td>#{order.id}</td>
                            <td>{new Date(order.date).toLocaleDateString('ar-SA')}</td>
                            <td>{order.total} ريال</td>
                            <td>
                              <span className={`status ${getStatusClass(order.status)}`}>
                                {getOrderStatus(order.status)}
                              </span>
                            </td>
                            <td>
                              <a href="#" className="btn-sm">عرض التفاصيل</a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p>لا توجد طلبات حتى الآن</p>
                  )
                ) : (
                  <div className="skeleton-table"></div>
                )}
              </div>
            </div>
          )}
          
          {/* Onglet Commandes */}
          {activeTab === 'orders' && (
            <div className="dashboard-tab">
              <div className="dashboard-header">
                <h2>الطلبات</h2>
              </div>
              
              {isLoaded ? (
                orders.length > 0 ? (
                  <table className="orders-table">
                    <thead>
                      <tr>
                        <th>رقم الطلب</th>
                        <th>التاريخ</th>
                        <th>المنتجات</th>
                        <th>المبلغ</th>
                        <th>الحالة</th>
                        <th>الإجراءات</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map(order => (
                        <tr key={order.id}>
                          <td>#{order.id}</td>
                          <td>{new Date(order.date).toLocaleDateString('ar-SA')}</td>
                          <td>
                            {order.items.map(item => (
                              <div key={item.id}>{item.name} (x{item.quantity})</div>
                            ))}
                          </td>
                          <td>{order.total} ريال</td>
                          <td>
                            <span className={`status ${getStatusClass(order.status)}`}>
                              {getOrderStatus(order.status)}
                            </span>
                          </td>
                          <td>
                            <a href="#" className="btn-sm">عرض التفاصيل</a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="no-results">
                    <i className="fas fa-shopping-bag fa-3x"></i>
                    <h3>لا توجد طلبات حتى الآن</h3>
                    <p>ابدأ التسوق الآن لرؤية طلباتك هنا</p>
                    <Link href="/marketplace">
                      <a className="btn btn-primary">تصفح المنتجات</a>
                    </Link>
                  </div>
                )
              ) : (
                <div className="skeleton-table"></div>
              )}
            </div>
          )}
          
          {/* Onglet Produits (pour les vendeurs) */}
          {activeTab === 'products' && currentUser.role === 'vendor' && (
            <div className="dashboard-tab">
              <div className="dashboard-header">
                <h2>المنتجات</h2>
                <a href="#" className="btn btn-primary">
                  <i className="fas fa-plus"></i> إضافة منتج جديد
                </a>
              </div>
              
              {isLoaded ? (
                products.length > 0 ? (
                  <table className="products-table">
                    <thead>
                      <tr>
                        <th>المنتج</th>
                        <th>السعر</th>
                        <th>المخزون</th>
                        <th>المبيعات</th>
                        <th>الإجراءات</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map(product => (
                        <tr key={product.id}>
                          <td>
                            <div className="product-cell">
                              <div className="product-image">
                                <img src={product.image} alt={product.name} />
                              </div>
                              <div className="product-name">{product.name}</div>
                            </div>
                          </td>
                          <td>{product.price} ريال</td>
                          <td>{product.stock} وحدة</td>
                          <td>{product.sales} وحدة</td>
                          <td>
                            <div className="actions">
                              <a href="#" className="btn-sm">تعديل</a>
                              <a href="#" className="btn-sm btn-danger">حذف</a>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="no-results">
                    <i className="fas fa-fish fa-3x"></i>
                    <h3>لا توجد منتجات حتى الآن</h3>
                    <p>أضف منتجات جديدة لعرضها في السوق</p>
                    <a href="#" className="btn btn-primary">إضافة منتج جديد</a>
                  </div>
                )
              ) : (
                <div className="skeleton-table"></div>
              )}
            </div>
          )}
          
          {/* Onglet Profil */}
          {activeTab === 'profile' && (
            <div className="dashboard-tab">
              <div className="dashboard-header">
                <h2>الملف الشخصي</h2>
              </div>
              
              <div className="profile-form">
                <div className="form-group">
                  <label>الاسم</label>
                  <input type="text" defaultValue={currentUser.name} />
                </div>
                
                <div className="form-group">
                  <label>البريد الإلكتروني</label>
                  <input type="email" defaultValue={currentUser.email} />
                </div>
                
                <div className="form-group">
                  <label>رقم الهاتف</label>
                  <input type="tel" placeholder="أدخل رقم الهاتف" />
                </div>
                
                <div className="form-group">
                  <label>العنوان</label>
                  <textarea placeholder="أدخل العنوان"></textarea>
                </div>
                
                <div className="form-group">
                  <label>كلمة المرور الجديدة</label>
                  <input type="password" placeholder="اترك فارغاً إذا لم ترغب في التغيير" />
                </div>
                
                <div className="form-group">
                  <label>تأكيد كلمة المرور</label>
                  <input type="password" placeholder="اترك فارغاً إذا لم ترغب في التغيير" />
                </div>
                
                <button className="btn btn-primary">حفظ التغييرات</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}
