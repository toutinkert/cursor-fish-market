import { useEffect, useState } from 'react'
import Head from 'next/head'
import Layout from '../components/Layout'
import VendorCard from '../components/VendorCard'
import Link from 'next/link'

export default function Vendors() {
  const [vendors, setVendors] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')

  useEffect(() => {
    // Simuler le chargement des données
    const loadData = async () => {
      // Données de vendeurs fictives
      const dummyVendors = [
        {
          id: 'v1',
          name: 'صيادي البحر الأحمر',
          logo: '/images/vendor1.jpg',
          rating: 4.5,
          description: 'متخصصون في أسماك البحر الأحمر الطازجة',
          categories: ['أسماك', 'قشريات'],
          location: 'جدة'
        },
        {
          id: 'v2',
          name: 'أسماك الخليج',
          logo: '/images/vendor2.jpg',
          rating: 4.0,
          description: 'أفضل أنواع الأسماك من الخليج العربي',
          categories: ['أسماك'],
          location: 'الدمام'
        },
        {
          id: 'v3',
          name: 'مأكولات البحر',
          logo: '/images/vendor3.jpg',
          rating: 5.0,
          description: 'تشكيلة متنوعة من المأكولات البحرية الطازجة',
          categories: ['أسماك', 'قشريات', 'رخويات'],
          location: 'الرياض'
        },
        {
          id: 'v4',
          name: 'صيد اليوم',
          logo: '/images/vendor4.jpg',
          rating: 4.2,
          description: 'أسماك طازجة يتم صيدها يومياً',
          categories: ['أسماك'],
          location: 'جدة'
        },
        {
          id: 'v5',
          name: 'محار الخليج',
          logo: '/images/vendor5.jpg',
          rating: 4.7,
          description: 'متخصصون في المحار والرخويات البحرية',
          categories: ['رخويات'],
          location: 'الدمام'
        },
        {
          id: 'v6',
          name: 'سمك الذهبي',
          logo: '/images/vendor6.jpg',
          rating: 3.9,
          description: 'أسماك طازجة بأسعار مناسبة',
          categories: ['أسماك'],
          location: 'الرياض'
        }
      ]
      
      setVendors(dummyVendors)
      setIsLoaded(true)
    }
    
    loadData()
  }, [])

  // Obtenir les catégories uniques
  const categories = [...new Set(vendors.flatMap(vendor => vendor.categories))].filter(Boolean)
  
  // Obtenir les emplacements uniques
  const locations = [...new Set(vendors.map(vendor => vendor.location))].filter(Boolean)

  // Gérer le changement de recherche
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  // Gérer le changement de catégorie
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value)
  }

  // Filtrer les vendeurs
  const filteredVendors = vendors.filter(vendor => {
    // Filtre par terme de recherche
    if (searchTerm && !vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !vendor.description.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false
    }
    
    // Filtre par catégorie
    if (selectedCategory && !vendor.categories.includes(selectedCategory)) {
      return false
    }
    
    return true
  })

  return (
    <Layout>
      <Head>
        <title>البائعين - سويكا</title>
        <meta name="description" content="تصفح بائعي سويكا - سوق الأسماك الإلكتروني" />
      </Head>

      <div className="page-header">
        <div className="container">
          <h1>البائعين</h1>
          <div className="breadcrumb">
            <Link href="/" className="breadcrumb-link">
              الرئيسية
            </Link>
            <span> / </span>
            <span>البائعين</span>
          </div>
        </div>
      </div>

      <div className="container vendors-container">
        <div className="vendors-filters">
          <div className="search-box">
            <input 
              type="text" 
              placeholder="ابحث عن بائع..." 
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <button className="search-btn">
              <i className="fas fa-search"></i>
            </button>
          </div>
          
          <div className="category-filter">
            <select value={selectedCategory} onChange={handleCategoryChange}>
              <option value="">جميع الفئات</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="vendors-grid">
          {isLoaded ? (
            filteredVendors.length > 0 ? (
              filteredVendors.map(vendor => (
                <VendorCard key={vendor.id} vendor={vendor} />
              ))
            ) : (
              <div className="no-results">
                <i className="fas fa-store-slash fa-3x"></i>
                <h3>لا يوجد بائعين يطابقون معايير البحث</h3>
                <p>يرجى تغيير معايير البحث وإعادة المحاولة</p>
              </div>
            )
          ) : (
            // Afficher des placeholders pendant le chargement
            Array(6).fill(0).map((_, index) => (
              <div key={index} className="vendor-card skeleton"></div>
            ))
          )}
        </div>
        
        {filteredVendors.length > 0 && (
          <div className="pagination">
            <a href="#" className="active">1</a>
            <a href="#">2</a>
            <a href="#"><i className="fas fa-chevron-left"></i></a>
          </div>
        )}
      </div>
      
      <section className="become-vendor">
        <div className="container">
          <div className="become-vendor-content">
            <h2>هل ترغب في بيع منتجاتك على سويكا؟</h2>
            <p>انضم إلى مجتمع البائعين لدينا وابدأ في الوصول إلى آلاف العملاء المحتملين</p>
            <Link href="/register" className="btn btn-gold">
              سجل كبائع الآن
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  )
}
