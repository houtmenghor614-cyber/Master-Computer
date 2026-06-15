import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiTruck, FiShield, FiClock, FiRefreshCw, FiTrendingUp, FiStar } from 'react-icons/fi';
import ProductCard from '../components/Product/ProductCard';
import { productAPI } from '../services/api';
import LoadingSpinner from '../components/Common/LoadingSpinner';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await productAPI.getAll({ limit: 8 });
      setFeaturedProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const features = [
    { icon: FiTruck, title: 'Free Shipping', description: 'On orders over $50', color: 'from-blue-500 to-blue-600' },
    { icon: FiShield, title: 'Secure Payment', description: '100% secure transactions', color: 'from-green-500 to-green-600' },
    { icon: FiClock, title: '24/7 Support', description: 'Customer service anytime', color: 'from-purple-500 to-purple-600' },
    { icon: FiRefreshCw, title: 'Easy Returns', description: '30-day return policy', color: 'from-orange-500 to-orange-600' },
  ];

  return (
    <div className="animate-slideUp">
      {/* Hero Section */}
      <section className="dark-gradient relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?w=1600')] bg-cover bg-center opacity-5"></div>
        <div className="container-custom relative py-20">
          <div className="max-w-2xl animate-slideUp">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-primary-400 bg-clip-text text-transparent">
              Premium Computer Accessories
            </h1>
            <p className="text-xl text-dark-textMuted mb-8">
              Discover the latest tech accessories at unbeatable prices. Quality products, fast shipping, and exceptional service.
            </p>
            <Link 
              to="/shop" 
              className="btn-primary inline-flex items-center space-x-2 text-lg"
            >
              <span>Shop Now</span>
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-dark-bg">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="card p-6 text-center group hover:scale-105 transition-all">
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-all`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-white">{feature.title}</h3>
                <p className="text-dark-textMuted">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-dark-card">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-white to-primary-400 bg-clip-text text-transparent">
              Featured Products
            </h2>
            <p className="text-dark-textMuted">Check out our most popular items</p>
          </div>
          
          {loading ? (
            <LoadingSpinner />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
          
          <div className="text-center mt-12">
            <Link 
              to="/shop" 
              className="btn-outline inline-flex items-center space-x-2"
            >
              <span>View All Products</span>
              <FiArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-primary-800">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Need Help Finding the Right Product?</h2>
          <p className="text-white/80 mb-6 max-w-2xl mx-auto">
            Contact us on Telegram and our experts will help you choose the perfect product for your needs
          </p>
          <a 
            href="https://t.me/hortmenghor" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            <FiStar size={20} />
            <span>Chat with Expert</span>
          </a>
        </div>
      </section>
    </div>
  );
};

export default Home;