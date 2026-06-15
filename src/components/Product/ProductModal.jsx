import React, { useState } from 'react';
import { FiX, FiMinus, FiPlus, FiShoppingCart, FiHeart, FiShare2 } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import toast from 'react-hot-toast';

const ProductModal = ({ product, onClose }) => {
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [currentImage, setCurrentImage] = useState(0);
  const { addToCart } = useCart();

  if (!product) return null;

  const sizes = JSON.parse(product.sizes || '["One Size"]');
  const images = product.images || [];
  const allImages = [product.main_image, ...images.map(img => img.image_path)];
  const discountPercentage = product.original_price > product.discount_price
    ? ((product.original_price - product.discount_price) / product.original_price * 100).toFixed(0)
    : 0;

  const handleAddToCart = () => {
    addToCart(product, selectedSize || sizes[0], product.color, quantity);
    toast.success(`Added ${quantity} item(s) to cart`);
    onClose();
  };

  const updateQuantity = (delta) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && newQuantity <= 99) {
      setQuantity(newQuantity);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        {/* Backdrop */}
        <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose}></div>
        
        {/* Modal */}
        <div className="relative bg-white rounded-2xl shadow-xl max-w-5xl w-full max-h-[90vh] overflow-y-auto animate-slideUp">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10 bg-white rounded-full p-1"
          >
            <FiX size={24} />
          </button>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Image Gallery */}
              <div>
                <div className="mb-4">
                  <img 
                    src={`http://localhost:8000/${allImages[currentImage]}`}
                    alt={product.title_product}
                    className="w-full h-80 object-cover rounded-xl"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400x400?text=Product';
                    }}
                  />
                </div>
                {allImages.length > 1 && (
                  <div className="flex space-x-2 overflow-x-auto pb-2">
                    {allImages.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentImage(idx)}
                        className={`w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                          currentImage === idx ? 'border-blue-600 shadow-md' : 'border-gray-200'
                        }`}
                      >
                        <img 
                          src={`http://localhost:8000/${img}`}
                          alt={`Thumbnail ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{product.title_product}</h2>
                
                <div className="flex items-center space-x-3 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">(24 reviews)</span>
                </div>
                
                <div className="mb-4">
                  <span className="text-3xl font-bold text-blue-600">${product.discount_price}</span>
                  {product.original_price > product.discount_price && (
                    <>
                      <span className="text-lg text-gray-400 line-through ml-2">${product.original_price}</span>
                      <span className="bg-red-100 text-red-600 px-2 py-1 rounded-lg text-sm font-semibold ml-2">
                        -{discountPercentage}%
                      </span>
                    </>
                  )}
                </div>
                
                <p className="text-gray-600 mb-6 line-clamp-3">{product.description}</p>
                
                {/* Color */}
                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-gray-800 mb-2">Color: {product.color}</h3>
                  <div className="flex space-x-2">
                    <div 
                      className="w-8 h-8 rounded-full border-2 border-blue-600 ring-2 ring-blue-200"
                      style={{ backgroundColor: product.color.toLowerCase() }}
                    ></div>
                  </div>
                </div>

                {/* Size Selection */}
                {sizes.length > 0 && sizes[0] !== 'One Size' && (
                  <div className="mb-4">
                    <h3 className="text-sm font-semibold text-gray-800 mb-2">Select Size</h3>
                    <div className="flex flex-wrap gap-2">
                      {sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`px-4 py-2 rounded-lg border-2 transition-all ${
                            selectedSize === size
                              ? 'border-blue-600 bg-blue-50 text-blue-600 font-semibold'
                              : 'border-gray-300 hover:border-blue-300'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-800 mb-2">Quantity</h3>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => updateQuantity(-1)}
                      className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <FiMinus size={16} />
                    </button>
                    <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                    <button
                      onClick={() => updateQuantity(1)}
                      className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <FiPlus size={16} />
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 font-semibold"
                  >
                    <FiShoppingCart size={20} />
                    <span>Add to Cart</span>
                  </button>
                  <button className="p-3 border border-gray-300 rounded-xl hover:border-red-500 hover:text-red-500 transition-colors">
                    <FiHeart size={20} />
                  </button>
                  <button className="p-3 border border-gray-300 rounded-xl hover:border-blue-500 hover:text-blue-500 transition-colors">
                    <FiShare2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;