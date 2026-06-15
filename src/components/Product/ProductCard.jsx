import React from 'react';
import { Link } from 'react-router-dom';
import { FiSend, FiHeart, FiEye, FiAlertCircle } from 'react-icons/fi';

const getImageUrl = (imagePath) => {
  if (!imagePath) return 'https://via.placeholder.com/300x300?text=No+Image';
  if (imagePath.startsWith('http')) return imagePath;
  const cleanPath = imagePath.replace(/^\/+/, '');
  return `https://backend-master-computer.onrender.com/${cleanPath}`;
};

const ProductCard = ({ product, viewMode = 'grid' }) => {
  const discountPercentage = product.original_price > product.discount_price
    ? ((product.original_price - product.discount_price) / product.original_price * 100).toFixed(0)
    : 0;

  const isOutOfStock = product.stock_quantity === 0 || !product.stock_quantity;

  const handleContactToBuy = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const stockMessage = isOutOfStock 
      ? '\n\n⚠️ This product is currently OUT OF STOCK.' 
      : `\n\n✅ In Stock: ${product.stock_quantity} units available`;
    
    const message = `🛍️ Product Inquiry\n\nProduct: ${product.title_product}\nPrice: $${product.discount_price}\nStock: ${product.stock_quantity || 0} units${stockMessage}`;
    
    const telegramUrl = `https://t.me/hortmenghor?text=${encodeURIComponent(message)}`;
    window.open(telegramUrl, '_blank');
  };

  if (viewMode === 'list') {
    return (
      <div className="card flex flex-col sm:flex-row">
        <Link to={`/product/${product.id}`} className="sm:w-48 h-48 flex-shrink-0 relative">
          <img src={getImageUrl(product.main_image)} alt={product.title_product} className="w-full h-full object-cover rounded-l-xl" loading="lazy" onError={(e) => { e.target.src = 'https://via.placeholder.com/200x200?text=No+Image'; }} />
          {isOutOfStock && (<div className="absolute inset-0 bg-black/70 flex items-center justify-center rounded-l-xl"><span className="text-red-400 font-bold text-sm px-2 py-1 bg-red-500/20 rounded-lg">OUT OF STOCK</span></div>)}
        </Link>
        <div className="p-4 flex-1">
          <Link to={`/product/${product.id}`}><h3 className="text-lg font-semibold text-white hover:text-primary-400">{product.title_product}</h3></Link>
          <p className="text-gray-400 text-sm mt-1">Color: {product.color}</p>
          <p className="text-sm mt-1">{isOutOfStock ? <span className="text-red-400">Out of Stock</span> : <span className="text-green-400">In Stock: {product.stock_quantity} units</span>}</p>
          <div className="flex items-center justify-between mt-4">
            <div><span className="text-2xl font-bold text-primary-400">${product.discount_price}</span>{product.original_price > product.discount_price && (<span className="text-sm text-gray-500 line-through ml-2">${product.original_price}</span>)}</div>
            {isOutOfStock ? (<div className="bg-red-500/20 text-red-400 px-4 py-2 rounded-lg flex items-center space-x-2"><FiAlertCircle size={18} /><span>Out of Stock</span></div>) : (<button onClick={handleContactToBuy} className="bg-gradient-to-r from-green-600 to-green-700 text-white px-4 py-2 rounded-lg hover:from-green-700 hover:to-green-800 transition-all flex items-center space-x-2"><FiSend size={18} /><span>Contact to Buy</span></button>)}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card group">
      <Link to={`/product/${product.id}`}>
        <div className="relative overflow-hidden h-64">
          <img src={getImageUrl(product.main_image)} alt={product.title_product} className={`w-full h-full object-cover transition-transform duration-500 ${!isOutOfStock && 'group-hover:scale-110'}`} loading="lazy" onError={(e) => { e.target.src = 'https://via.placeholder.com/300x300?text=No+Image'; }} />
          {discountPercentage > 0 && !isOutOfStock && (<div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-lg text-sm font-bold">-{discountPercentage}%</div>)}
          {isOutOfStock && (<div className="absolute inset-0 bg-black/70 flex items-center justify-center"><span className="text-red-400 font-bold text-lg px-3 py-2 bg-red-500/20 rounded-lg">OUT OF STOCK</span></div>)}
        </div>
      </Link>
      <div className="p-4">
        <Link to={`/product/${product.id}`}><h3 className="text-lg font-semibold text-white hover:text-primary-400 mb-2 line-clamp-2">{product.title_product}</h3></Link>
        <p className="text-sm text-gray-400 mb-1">{product.color}</p>
        <p className="text-xs mb-2">{isOutOfStock ? <span className="text-red-400">❌ Out of Stock</span> : <span className="text-green-400">✅ In Stock: {product.stock_quantity} left</span>}</p>
        <div className="flex items-center justify-between mb-3"><div><span className="text-2xl font-bold text-primary-400">${product.discount_price}</span>{product.original_price > product.discount_price && (<span className="text-sm text-gray-500 line-through ml-2">${product.original_price}</span>)}</div></div>
        <div className="flex space-x-2">
          {isOutOfStock ? (<div className="flex-1 bg-red-500/20 text-red-400 px-3 py-2 rounded-lg flex items-center justify-center space-x-2 text-sm"><FiAlertCircle size={16} /><span>Out of Stock</span></div>) : (<button onClick={handleContactToBuy} className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white px-3 py-2 rounded-lg hover:from-green-700 hover:to-green-800 transition-all flex items-center justify-center space-x-2 text-sm"><FiSend size={16} /><span>Contact to Buy</span></button>)}
          <Link to={`/product/${product.id}`}><button className="p-2 border border-gray-700 rounded-lg hover:border-primary-500 hover:text-primary-400 transition-colors text-gray-400"><FiEye size={18} /></button></Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;