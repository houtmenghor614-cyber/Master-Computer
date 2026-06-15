import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiSend, FiHeart, FiShare2, FiCheck, FiArrowLeft, FiAlertCircle } from 'react-icons/fi';
import { productAPI } from '../services/api';
import LoadingSpinner from '../components/Common/LoadingSpinner';
import ErrorMessage from '../components/Common/ErrorMessage';
import toast from 'react-hot-toast';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [activeTab, setActiveTab] = useState('description');
  const [sizes, setSizes] = useState(['One Size']);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await productAPI.getById(id);
      setProduct(response.data);
      
      let parsedSizes = ['One Size'];
      try {
        if (response.data.sizes) {
          if (typeof response.data.sizes === 'string') {
            parsedSizes = JSON.parse(response.data.sizes);
          } else if (Array.isArray(response.data.sizes)) {
            parsedSizes = response.data.sizes;
          }
        }
      } catch (err) {
        console.error('Error parsing sizes:', err);
        parsedSizes = ['One Size'];
      }
      setSizes(parsedSizes);
      setError(null);
    } catch (err) {
      setError('Failed to load product details');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleContactToBuy = () => {
    const sizeText = sizes.length > 0 && sizes[0] !== 'One Size' ? sizes.join(', ') : 'Standard';
    const discountPercent = product.original_price > product.discount_price 
      ? Math.round(((product.original_price - product.discount_price) / product.original_price) * 100) 
      : 0;
    const stockStatus = product.stock_quantity > 0 
      ? `✅ In Stock: ${product.stock_quantity} units available` 
      : '❌ OUT OF STOCK';
    
    const message = `🛍️ PRODUCT INQUIRY

================================

📦 PRODUCT DETAILS
--------------------------------
Name: ${product.title_product}
Price: $${product.discount_price}
Original: $${product.original_price}
Discount: ${discountPercent}% OFF
Color: ${product.color}
Sizes: ${sizeText}
Stock: ${stockStatus}
Product ID: #${product.id}

================================

🖼️ PRODUCT IMAGE
--------------------------------
http://localhost:8000/${product.main_image}

================================

💬 CUSTOMER REQUEST
--------------------------------
I'm interested in this product!

Please provide me with:
- Best available price
- Shipping cost to my location
- Estimated delivery time
- Payment methods accepted

================================
Date: ${new Date().toLocaleDateString()}
Time: ${new Date().toLocaleTimeString()}

Thank you!`;
    
    const telegramUrl = `https://t.me/hortmenghor?text=${encodeURIComponent(message)}`;
    window.open(telegramUrl, '_blank');
    toast.success('Opening Telegram chat...');
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} onRetry={fetchProduct} />;
  if (!product) return <ErrorMessage message="Product not found" />;

  const images = product.images || [];
  const allImages = [product.main_image, ...images.map(img => img.image_path)].filter(Boolean);
  const discountPercentage = product.original_price > product.discount_price 
    ? ((product.original_price - product.discount_price) / product.original_price * 100).toFixed(0) 
    : 0;
  const isOutOfStock = product.stock_quantity === 0 || !product.stock_quantity;

  return (
    <div className="container-custom py-8 animate-slideUp">
      <button 
        onClick={() => navigate('/shop')} 
        className="flex items-center space-x-2 text-gray-400 hover:text-primary-400 mb-4 transition-colors"
      >
        <FiArrowLeft size={20} />
        <span>Back to Shop</span>
      </button>

      <div className="bg-dark-card rounded-2xl shadow-2xl overflow-hidden border border-gray-800">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 lg:p-8">
          {/* Image Gallery */}
          <div>
            <div className="mb-4">
              <img 
                src={`http://localhost:8000/${allImages[currentImage] || product.main_image}`}
                alt={product.title_product}
                className="w-full h-96 object-cover rounded-xl"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/500x500?text=Product+Image';
                }}
              />
            </div>
            {allImages.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImage(idx)}
                    className={`w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                      currentImage === idx ? 'border-primary-500 shadow-lg' : 'border-gray-700'
                    }`}
                  >
                    <img 
                      src={`http://localhost:8000/${img}`}
                      alt={`Product ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-4">
              <h1 className="text-3xl font-bold text-white mb-2">{product.title_product}</h1>
              
              <div className="flex items-center space-x-3 mb-3">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                    </svg>
                  ))}
                </div>
                <span className="text-gray-400">(50+ satisfied customers)</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <span className="text-3xl font-bold text-primary-400">${product.discount_price}</span>
                {product.original_price > product.discount_price && (
                  <>
                    <span className="text-xl text-gray-500 line-through">${product.original_price}</span>
                    <span className="bg-red-500/20 text-red-400 px-2 py-1 rounded-lg text-sm font-semibold">
                      Save ${(product.original_price - product.discount_price).toFixed(2)} ({discountPercentage}%)
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* FIXED STOCK DISPLAY SECTION */}
            <div className="mb-6 p-4 rounded-xl border border-gray-800 bg-dark-bg">
              <h3 className="text-sm font-semibold text-gray-300 mb-3">📦 Stock Availability</h3>
              {!isOutOfStock ? (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400">In Stock</span>
                    <span className="text-green-400 font-semibold">{product.stock_quantity} units available</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min((product.stock_quantity / 100) * 100, 100)}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    {product.stock_quantity > 20 ? '✓ Ready to ship immediately' : 
                     product.stock_quantity > 0 ? '⚠ Limited stock available - Order soon!' : '✗ Currently unavailable'}
                  </p>
                </div>
              ) : (
                <div>
                  <div className="flex items-center space-x-2">
                    <FiAlertCircle className="text-red-400" size={18} />
                    <span className="text-red-400 font-semibold">Out of Stock</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    This product is currently unavailable. Contact us on Telegram for restock information.
                  </p>
                </div>
              )}
            </div>

            {/* Color Information */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-300 mb-2">🎨 Color Available</h3>
              <div className="flex space-x-2">
                <span className="px-4 py-2 rounded-lg border-2 border-gray-700 bg-dark-bg text-gray-300">
                  {product.color}
                </span>
              </div>
            </div>

            {/* Size Information */}
            {sizes.length > 0 && sizes[0] !== 'One Size' && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-300 mb-2">📏 Available Sizes</h3>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((size) => (
                    <span
                      key={size}
                      className="px-4 py-2 rounded-lg border-2 border-gray-700 bg-dark-bg text-gray-300"
                    >
                      {size}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Contact Button - Disabled if out of stock */}
            <div className="mb-6">
              <button
                onClick={handleContactToBuy}
                disabled={isOutOfStock}
                className={`w-full text-white px-6 py-4 rounded-xl transition-all flex items-center justify-center space-x-2 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 ${
                  isOutOfStock 
                    ? 'bg-gray-600 cursor-not-allowed opacity-50' 
                    : 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800'
                }`}
              >
                <FiSend size={22} />
                <span>{isOutOfStock ? 'Out of Stock - Contact for Restock' : 'Contact on Telegram to Buy'}</span>
              </button>
              <p className="text-sm text-gray-500 text-center mt-3">
                {isOutOfStock 
                  ? 'This product is out of stock. Click to inquire about restock date.'
                  : 'Click to chat with us on Telegram for price, availability, and shipping'}
              </p>
            </div>

            {/* Key Features */}
            <div className="bg-dark-bg rounded-xl p-4 mb-6 border border-gray-800">
              <h3 className="font-semibold text-white mb-3">✅ Why Buy From Us?</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center space-x-2">
                  <FiCheck className="text-green-500" />
                  <span className="text-sm text-gray-300">Best Price Guarantee</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FiCheck className="text-green-500" />
                  <span className="text-sm text-gray-300">Original Products</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FiCheck className="text-green-500" />
                  <span className="text-sm text-gray-300">Fast Shipping</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FiCheck className="text-green-500" />
                  <span className="text-sm text-gray-300">24/7 Customer Support</span>
                </div>
              </div>
            </div>

            {/* Action Icons */}
            <div className="flex items-center space-x-4 pt-4 border-t border-gray-800">
              <button className="flex items-center space-x-2 text-gray-400 hover:text-red-500 transition-colors">
                <FiHeart size={18} />
                <span>Save to Wishlist</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-400 hover:text-primary-400 transition-colors">
                <FiShare2 size={18} />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="border-t border-gray-800">
          <div className="flex border-b border-gray-800">
            <button
              onClick={() => setActiveTab('description')}
              className={`px-6 py-3 font-semibold transition-colors ${
                activeTab === 'description'
                  ? 'text-primary-400 border-b-2 border-primary-400'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab('specifications')}
              className={`px-6 py-3 font-semibold transition-colors ${
                activeTab === 'specifications'
                  ? 'text-primary-400 border-b-2 border-primary-400'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Specifications
            </button>
            <button
              onClick={() => setActiveTab('shipping')}
              className={`px-6 py-3 font-semibold transition-colors ${
                activeTab === 'shipping'
                  ? 'text-primary-400 border-b-2 border-primary-400'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Shipping Info
            </button>
          </div>
          
          <div className="p-6">
            {activeTab === 'description' && (
              <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                {product.description}
              </p>
            )}
            
            {activeTab === 'specifications' && (
              <div className="space-y-3">
                <div className="flex py-2 border-b border-gray-800">
                  <span className="w-32 font-semibold text-gray-400">Brand</span>
                  <span className="text-gray-300">MasterComputer</span>
                </div>
                <div className="flex py-2 border-b border-gray-800">
                  <span className="w-32 font-semibold text-gray-400">Color</span>
                  <span className="text-gray-300">{product.color}</span>
                </div>
                <div className="flex py-2 border-b border-gray-800">
                  <span className="w-32 font-semibold text-gray-400">Available Sizes</span>
                  <span className="text-gray-300">{sizes.join(', ')}</span>
                </div>
                <div className="flex py-2 border-b border-gray-800">
                  <span className="w-32 font-semibold text-gray-400">Stock Status</span>
                  <span className={isOutOfStock ? 'text-red-400' : 'text-green-400'}>
                    {isOutOfStock ? 'Out of Stock' : `${product.stock_quantity} units in stock`}
                  </span>
                </div>
                <div className="flex py-2 border-b border-gray-800">
                  <span className="w-32 font-semibold text-gray-400">Warranty</span>
                  <span className="text-gray-300">1 Year Limited Warranty</span>
                </div>
              </div>
            )}
            
            {activeTab === 'shipping' && (
              <div className="space-y-4">
                <div className="bg-primary-500/10 rounded-lg p-4 border border-primary-500/20">
                  <h4 className="font-semibold text-primary-400 mb-2">Shipping Information</h4>
                  <p className="text-gray-300">Contact us on Telegram for shipping quotes and delivery times to your location.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border border-gray-800 rounded-lg p-3 bg-dark-bg">
                    <p className="font-semibold text-gray-300">Processing Time</p>
                    <p className="text-sm text-gray-500">1-2 business days</p>
                  </div>
                  <div className="border border-gray-800 rounded-lg p-3 bg-dark-bg">
                    <p className="font-semibold text-gray-300">Delivery Time</p>
                    <p className="text-sm text-gray-500">3-7 business days</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;