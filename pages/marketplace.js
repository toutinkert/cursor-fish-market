import { useEffect, useState, useRef, useCallback } from 'react'
import Head from 'next/head'
import Layout from '../components/Layout'
import ProductCard from '../components/ProductCard'
import Link from 'next/link'

export default function Marketplace() {
  const [products, setProducts] = useState([])
  const [displayedProducts, setDisplayedProducts] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(1)
  const [filters, setFilters] = useState({
    categories: [],
    vendors: [],
    cities: [],
    minPrice: '',
    maxPrice: ''
  })
  const [sortBy, setSortBy] = useState('newest')
  const observer = useRef()

  // Référence pour l'élément de chargement
  const loadingRef = useCallback(node => {
    if (isLoading) return
    if (observer.current) observer.current.disconnect()
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        loadMoreProducts()
      }
    })
    
    if (node) observer.current.observe(node)
  }, [isLoading, hasMore])

  // Charger les données depuis l'API
  useEffect(() => {
    const loadData = async () => {
      try {
        // Simuler une requête API
        // Dans un environnement réel, vous feriez un appel à votre API
        // const response = await fetch('/api/products')
        
        // Données fictives pour la démonstration
        const dummyProducts = [
          {
            id: 'p1',
            name: 'سمك السلمون الطازج',
            price: 120,
            oldPrice: 150,
            image: '/images/salmon.jpg',
            vendor: 'صيادي البحر الأحمر',
            weight: '1 كجم',
            category: 'أسماك',
            location: 'الدار البيضاء',
            description: 'سمك سلمون طازج من أجود الأنواع، تم صيده حديثاً',
            tag: 'الأكثر مبيعاً'
          },
          {
            id: 'p2',
            name: 'تونة طازجة',
            price: 90,
            image: '/images/tuna.jpg',
            vendor: 'أسماك الخليج',
            weight: '1 كجم',
            category: 'أسماك',
            location: 'أكادير',
            description: 'تونة طازجة ذات جودة عالية، مناسبة للشوي والطبخ'
          },
          {
            id: 'p3',
            name: 'روبيان طازج',
            price: 85,
            oldPrice: 100,
            image: '/images/shrimp.jpg',
            vendor: 'مأكولات البحر',
            weight: '500 جرام',
            category: 'قشريات',
            location: 'الرباط',
            description: 'روبيان طازج كبير الحجم، مناسب للقلي والطبخ',
            tag: 'جديد'
          },
          {
            id: 'p4',
            name: 'سمك القاروص',
            price: 130,
            image: '/images/seabass.jpg',
            vendor: 'صيد اليوم',
            weight: '1.5 كجم',
            category: 'أسماك',
            location: 'سلا',
            description: 'سمك قاروص طازج، مناسب للشوي والفرن'
          },
          {
            id: 'p5',
            name: 'سلطعون طازج',
            price: 160,
            image: '/images/crab.jpg',
            vendor: 'مأكولات البحر',
            weight: '1 كجم',
            category: 'قشريات',
            location: 'الدار البيضاء',
            description: 'سلطعون طازج كبير الحجم، مناسب للطبخ'
          },
          {
            id: 'p6',
            name: 'حبار طازج',
            price: 70,
            oldPrice: 85,
            image: '/images/squid.jpg',
            vendor: 'صيادي البحر الأحمر',
            weight: '500 جرام',
            category: 'رخويات',
            location: 'أكادير',
            description: 'حبار طازج، مناسب للقلي والطبخ'
          },
          {
            id: 'p7',
            name: 'سمك البلطي',
            price: 65,
            image: '/images/tilapia.jpg',
            vendor: 'أسماك الخليج',
            weight: '1 كجم',
            category: 'أسماك',
            location: 'الرباط',
            description: 'سمك بلطي طازج، مناسب للقلي والطبخ'
          },
          {
            id: 'p8',
            name: 'كركند طازج',
            price: 280,
            oldPrice: 320,
            image: '/images/lobster.jpg',
            vendor: 'مأكولات البحر',
            weight: '1 كجم',
            category: 'قشريات',
            location: 'سلا',
            description: 'كركند طازج فاخر، مناسب للشوي والطبخ',
            tag: 'فاخر'
          },
          {
            id: 'p9',
            name: 'سمك السردين',
            price: 45,
            image: '/images/sardines.jpg',
            vendor: 'صيد اليوم',
            weight: '500 جرام',
            category: 'أسماك',
            location: 'الدار البيضاء',
            description: 'سمك سردين طازج، مناسب للشوي والقلي'
          },
          {
            id: 'p10',
            name: 'محار طازج',
            price: 110,
            image: '/images/oysters.jpg',
            vendor: 'مأكولات البحر',
            weight: '500 جرام',
            category: 'محار',
            location: 'أكادير',
            description: 'محار طازج، مناسب للتقديم الطازج أو الطبخ'
          },
          {
            id: 'p11',
            name: 'سمك الهامور',
            price: 150,
            image: '/images/grouper.jpg',
            vendor: 'صيادي البحر الأحمر',
            weight: '1.5 كجم',
            category: 'أسماك',
            location: 'الرباط',
            description: 'سمك هامور طازج، مناسب للشوي والطبخ'
          },
          {
            id: 'p12',
            name: 'بلح البحر',
            price: 60,
            image: '/images/mussels.jpg',
            vendor: 'أسماك الخليج',
            weight: '500 جرام',
            category: 'محار',
            location: 'سلا',
            description: 'بلح بحر طازج، مناسب للطبخ'
          }
        ]
        
        // Générer plus de produits pour la démonstration
        const moreProducts = []
        for (let i = 0; i < 20; i++) {
          const originalProduct = dummyProducts[i % dummyProducts.length]
          moreProducts.push({
            ...originalProduct,
            id: `p${i + 13}`,
            name: `${originalProduct.name} - ${i + 1}`
          })
        }
        
        const allProducts = [...dummyProducts, ...moreProducts]
        setProducts(allProducts)
        setDisplayedProducts(allProducts.slice(0, 8)) // Afficher les 8 premiers produits
        setHasMore(allProducts.length > 8)
      } catch (error) {
        console.error('Erreur lors de la récupération des produits:', error)
      } finally {
        setIsLoaded(true)
      }
    }
    
    loadData()
  }, [])

  // Charger plus de produits lors du défilement
  const loadMoreProducts = () => {
    if (isLoading || !hasMore) return
    
    setIsLoading(true)
    
    // Simuler un délai de chargement
    setTimeout(() => {
      const filteredProducts = getFilteredProducts()
      const nextProducts = filteredProducts.slice(displayedProducts.length, displayedProducts.length + 4)
      
      if (nextProducts.length > 0) {
        setDisplayedProducts(prev => [...prev, ...nextProducts])
        setPage(prev => prev + 1)
        setHasMore(displayedProducts.length + nextProducts.length < filteredProducts.length)
      } else {
        setHasMore(false)
      }
      
      setIsLoading(false)
    }, 800)
  }

  // Obtenir les catégories uniques
  const categories = [...new Set(products.map(product => product.category))].filter(Boolean)
  
  // Obtenir les vendeurs uniques
  const vendors = [...new Set(products.map(product => product.vendor))].filter(Boolean)
  
  // Obtenir les villes uniques
  const cities = [...new Set(products.map(product => product.location))].filter(Boolean)

  // Gérer le changement de filtre de catégorie
  const handleCategoryChange = (category) => {
    setFilters(prev => {
      const newCategories = prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
      
      return { ...prev, categories: newCategories }
    })
  }

  // Gérer le changement de filtre de vendeur
  const handleVendorChange = (vendor) => {
    setFilters(prev => {
      const newVendors = prev.vendors.includes(vendor)
        ? prev.vendors.filter(v => v !== vendor)
        : [...prev.vendors, vendor]
      
      return { ...prev, vendors: newVendors }
    })
  }
  
  // Gérer le changement de filtre de ville
  const handleCityChange = (city) => {
    setFilters(prev => {
      const newCities = prev.cities.includes(city)
        ? prev.cities.filter(c => c !== city)
        : [...prev.cities, city]
      
      return { ...prev, cities: newCities }
    })
  }

  // Gérer le changement de prix minimum
  const handleMinPriceChange = (e) => {
    setFilters(prev => ({ ...prev, minPrice: e.target.value }))
  }

  // Gérer le changement de prix maximum
  const handleMaxPriceChange = (e) => {
    setFilters(prev => ({ ...prev, maxPrice: e.target.value }))
  }

  // Gérer le changement de tri
  const handleSortChange = (e) => {
    setSortBy(e.target.value)
  }

  // Filtrer les produits
  const getFilteredProducts = () => {
    const filtered = products.filter(product => {
      // Filtre par catégorie
      if (filters.categories.length > 0 && !filters.categories.includes(product.category)) {
        return false
      }
      
      // Filtre par vendeur
      if (filters.vendors.length > 0 && !filters.vendors.includes(product.vendor)) {
        return false
      }
      
      // Filtre par ville
      if (filters.cities.length > 0 && !filters.cities.includes(product.location)) {
        return false
      }
      
      // Filtre par prix minimum
      if (filters.minPrice && product.price < parseFloat(filters.minPrice)) {
        return false
      }
      
      // Filtre par prix maximum
      if (filters.maxPrice && product.price > parseFloat(filters.maxPrice)) {
        return false
      }
      
      return true
    })

    // Trier les produits
    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price
        case 'price-desc':
          return b.price - a.price
        case 'name-asc':
          return a.name.localeCompare(b.name)
        case 'name-desc':
          return b.name.localeCompare(a.name)
        case 'newest':
        default:
          return 0 // Pas de tri spécifique pour "newest" dans cet exemple
      }
    })
  }

  // Appliquer les filtres
  useEffect(() => {
    if (isLoaded) {
      const filteredProducts = getFilteredProducts()
      setDisplayedProducts(filteredProducts.slice(0, 8))
      setHasMore(filteredProducts.length > 8)
      setPage(1)
    }
  }, [filters, sortBy, isLoaded])

  return (
    <Layout>
      <Head>
        <title>السوق - سويكا</title>
        <meta name="description" content="تصفح منتجات سويكا - سوق الأسماك الإلكتروني" />
      </Head>

      <div className="page-header">
        <div className="container">
          <h1>السوق</h1>
          <div className="breadcrumb">
            <Link href="/">
              الرئيسية
            </Link>
            <span> / </span>
            <span>السوق</span>
          </div>
        </div>
      </div>

      <div className="container marketplace-container">
        <div className="filters">
          <h2>تصفية المنتجات</h2>
          
          <div className="filter-group">
            <h3>الفئات</h3>
            {categories.map(category => (
              <label key={category} className="filter-checkbox">
                <input 
                  type="checkbox" 
                  checked={filters.categories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                />
                <span className="checkmark"></span>
                {category}
              </label>
            ))}
          </div>
          
          <div className="filter-group">
            <h3>البائعين</h3>
            {vendors.map(vendor => (
              <label key={vendor} className="filter-checkbox">
                <input 
                  type="checkbox" 
                  checked={filters.vendors.includes(vendor)}
                  onChange={() => handleVendorChange(vendor)}
                />
                <span className="checkmark"></span>
                {vendor}
              </label>
            ))}
          </div>
          
          <div className="filter-group">
            <h3>المدينة</h3>
            {cities.map(city => (
              <label key={city} className="filter-checkbox">
                <input 
                  type="checkbox" 
                  checked={filters.cities.includes(city)}
                  onChange={() => handleCityChange(city)}
                />
                <span className="checkmark"></span>
                {city}
              </label>
            ))}
          </div>
          
          <div className="filter-group">
            <h3>السعر</h3>
            <div className="price-range">
              <input 
                type="number" 
                placeholder="الحد الأدنى" 
                value={filters.minPrice}
                onChange={handleMinPriceChange}
              />
              <input 
                type="number" 
                placeholder="الحد الأقصى" 
                value={filters.maxPrice}
                onChange={handleMaxPriceChange}
              />
            </div>
          </div>
        </div>
        
        <div className="marketplace-content">
          <div className="marketplace-header">
            <div className="results-count">
              {getFilteredProducts().length} منتج
            </div>
            <div className="sort-by">
              <span>ترتيب حسب:</span>
              <select value={sortBy} onChange={handleSortChange}>
                <option value="newest">الأحدث</option>
                <option value="price-asc">السعر: من الأقل إلى الأعلى</option>
                <option value="price-desc">السعر: من الأعلى إلى الأقل</option>
                <option value="name-asc">الاسم: أ-ي</option>
                <option value="name-desc">الاسم: ي-أ</option>
              </select>
            </div>
          </div>
          
          <div className="marketplace-products">
            {isLoaded ? (
              displayedProducts.length > 0 ? (
                <>
                  {displayedProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                  
                  {hasMore && (
                    <div 
                      ref={loadingRef} 
                      className="loading-more"
                    >
                      {isLoading ? (
                        <div className="loading-spinner">
                          <i className="fas fa-spinner fa-spin"></i>
                          <span>جاري التحميل...</span>
                        </div>
                      ) : (
                        <div className="loading-trigger"></div>
                      )}
                    </div>
                  )}
                </>
              ) : (
                <div className="no-results">
                  <i className="fas fa-search fa-3x"></i>
                  <h3>لا توجد منتجات تطابق معايير البحث</h3>
                  <p>يرجى تغيير معايير التصفية وإعادة المحاولة</p>
                </div>
              )
            ) : (
              // Afficher des placeholders pendant le chargement
              Array(8).fill(0).map((_, index) => (
                <div key={index} className="product-card skeleton"></div>
              ))
            )}
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .marketplace-container {
          display: grid;
          grid-template-columns: 250px 1fr;
          gap: 30px;
          padding: 40px 0;
        }
        
        .filters {
          background-color: white;
          border-radius: var(--border-radius);
          padding: 20px;
          box-shadow: var(--box-shadow);
          height: fit-content;
          position: sticky;
          top: 100px;
        }
        
        .filters h2 {
          margin-bottom: 20px;
        }
        
        .filter-group {
          margin-bottom: 20px;
          border-bottom: 1px solid var(--light-color);
          padding-bottom: 15px;
        }
        
        .filter-group:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }
        
        .filter-group h3 {
          font-size: 1rem;
          margin-bottom: 10px;
          color: var(--dark-color);
        }
        
        .filter-checkbox {
          display: block;
          position: relative;
          padding-right: 30px;
          margin-bottom: 10px;
          cursor: pointer;
          font-size: 0.9rem;
          user-select: none;
          color: var(--gray-color);
          transition: color 0.3s ease;
        }
        
        .filter-checkbox:hover {
          color: var(--primary-color);
        }
        
        .filter-checkbox input {
          position: absolute;
          opacity: 0;
          cursor: pointer;
          height: 0;
          width: 0;
        }
        
        .checkmark {
          position: absolute;
          top: 0;
          right: 0;
          height: 18px;
          width: 18px;
          background-color: #f1f1f1;
          border-radius: 3px;
          transition: all 0.3s ease;
        }
        
        .filter-checkbox:hover input ~ .checkmark {
          background-color: #e1e1e1;
        }
        
        .filter-checkbox input:checked ~ .checkmark {
          background-color: var(--primary-color);
        }
        
        .checkmark:after {
          content: "";
          position: absolute;
          display: none;
        }
        
        .filter-checkbox input:checked ~ .checkmark:after {
          display: block;
        }
        
        .filter-checkbox .checkmark:after {
          right: 6px;
          top: 2px;
          width: 5px;
          height: 10px;
          border: solid white;
          border-width: 0 2px 2px 0;
          transform: rotate(45deg);
        }
        
        .price-range {
          display: flex;
          gap: 10px;
        }
        
        .price-range input {
          flex: 1;
          padding: 8px 12px;
          border: 1px solid var(--light-color);
          border-radius: var(--border-radius);
          font-size: 0.9rem;
        }
        
        .marketplace-content {
          flex: 1;
        }
        
        .marketplace-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          padding-bottom: 15px;
          border-bottom: 1px solid var(--light-color);
        }
        
        .results-count {
          font-size: 0.9rem;
          color: var(--gray-color);
        }
        
        .sort-by {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .sort-by span {
          font-size: 0.9rem;
          color: var(--gray-color);
        }
        
        .sort-by select {
          padding: 8px 12px;
          border: 1px solid var(--light-color);
          border-radius: var(--border-radius);
          font-size: 0.9rem;
          background-color: white;
          cursor: pointer;
        }
        
        .marketplace-products {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 20px;
        }
        
        .loading-more {
          grid-column: 1 / -1;
          display: flex;
          justify-content: center;
          padding: 20px 0;
        }
        
        .loading-spinner {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          color: var(--primary-color);
        }
        
        .loading-spinner i {
          font-size: 1.5rem;
        }
        
        .loading-trigger {
          height: 20px;
        }
        
        .no-results {
          grid-column: 1 / -1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 50px 0;
          text-align: center;
          color: var(--gray-color);
        }
        
        .no-results i {
          margin-bottom: 20px;
          color: var(--light-color);
        }
        
        .no-results h3 {
          margin-bottom: 10px;
          color: var(--dark-color);
        }
        
        .skeleton {
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200% 100%;
          animation: loading 1.5s infinite;
          border-radius: var(--border-radius);
          height: 350px;
        }
        
        @keyframes loading {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
        
        @media (max-width: 992px) {
          .marketplace-container {
            grid-template-columns: 1fr;
          }
          
          .filters {
            position: static;
            margin-bottom: 20px;
          }
        }
        
        @media (max-width: 768px) {
          .marketplace-products {
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          }
        }
        
        @media (max-width: 576px) {
          .marketplace-products {
            grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
          }
          
          .marketplace-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
          }
        }
      `}</style>
    </Layout>
  )
}
