import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/Product/ProductCard';
import LoadingSpinner from '../components/Common/LoadingSpinner';
import { productAPI, categoryAPI } from '../services/api';
import { FiGrid, FiList, FiFilter, FiX } from 'react-icons/fi';

const Shop = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({ 
    category: searchParams.get('category') || '', 
    search: searchParams.get('search') || '', 
    sort: 'newest' 
  });

  const fetchCategories = useCallback(async () => {
    try {
      const response = await categoryAPI.getAll();
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }, []);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const params = {};
      if (filters.category) params.category_id = filters.category;
      const response = await productAPI.getAll(params);
      let filteredProducts = response.data;
      
      if (filters.search) {
        filteredProducts = filteredProducts.filter(product =>
          product.title_product.toLowerCase().includes(filters.search.toLowerCase())
        );
      }
      
      if (filters.sort === 'price-low') {
        filteredProducts.sort((a, b) => a.discount_price - b.discount_price);
      } else if (filters.sort === 'price-high') {
        filteredProducts.sort((a, b) => b.discount_price - a.discount_price);
      } else if (filters.sort === 'newest') {
        filteredProducts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      }
      
      setProducts(filteredProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, [fetchCategories, fetchProducts]);

  const handleCategoryChange = (categoryId) => {
    setFilters(prev => ({ ...prev, category: categoryId }));
    setShowFilters(false);
  };

  const handleSortChange = (e) => {
    setFilters(prev => ({ ...prev, sort: e.target.value }));
  };

  const clearFilters = () => {
    setFilters({ category: '', search: '', sort: 'newest' });
  };

  return (
    <div className="container-custom py-8 animate-slideUp">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="hidden lg:block lg:w-1/4">
          <div className="bg-dark-card rounded-xl shadow-xl p-6 sticky top-20 border border-gray-800">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white flex items-center"><FiFilter className="mr-2 text-primary-400" />Filters</h3>
              <button onClick={clearFilters} className="text-sm text-primary-400 hover:text-primary-300">Clear All</button>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">Sort By</label>
              <select value={filters.sort} onChange={handleSortChange} className="w-full px-3 py-2 bg-dark-bg border border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 text-white">
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">Categories</label>
              <div className="space-y-2">
                <label className="flex items-center cursor-pointer p-2 rounded-lg hover:bg-dark-bg">
                  <input type="radio" name="category" checked={filters.category === ''} onChange={() => handleCategoryChange('')} className="mr-3 w-4 h-4 text-primary-500" />
                  <span className="text-gray-300">All Categories</span>
                </label>
                {categories.map(category => (
                  <label key={category.id} className="flex items-center cursor-pointer p-2 rounded-lg hover:bg-dark-bg">
                    <input type="radio" name="category" checked={filters.category === category.id.toString()} onChange={() => handleCategoryChange(category.id.toString())} className="mr-3 w-4 h-4 text-primary-500" />
                    <span className="text-gray-300">{category.name_category}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <div><h2 className="text-2xl font-bold text-white">All Products</h2><p className="text-gray-400">{products.length} products found</p></div>
            <div className="flex space-x-2">
              <button className="lg:hidden p-2 rounded-lg bg-dark-card border border-gray-700 text-gray-300 hover:text-primary-400" onClick={() => setShowFilters(!showFilters)}><FiFilter size={20} /></button>
              <button className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-primary-500 text-white' : 'bg-dark-card border border-gray-700 text-gray-400 hover:text-white'}`} onClick={() => setViewMode('grid')}><FiGrid size={20} /></button>
              <button className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-primary-500 text-white' : 'bg-dark-card border border-gray-700 text-gray-400 hover:text-white'}`} onClick={() => setViewMode('list')}><FiList size={20} /></button>
            </div>
          </div>
          
          {showFilters && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div className="fixed inset-0 bg-black bg-opacity-70" onClick={() => setShowFilters(false)}></div>
              <div className="fixed right-0 top-0 h-full w-80 bg-dark-card shadow-2xl p-6 overflow-y-auto">
                <div className="flex justify-between items-center mb-6"><h3 className="text-lg font-semibold text-white">Filters</h3><button onClick={() => setShowFilters(false)} className="text-gray-400 hover:text-white"><FiX size={24} /></button></div>
                <div className="mb-6"><label className="block text-sm font-medium text-gray-300 mb-2">Sort By</label><select value={filters.sort} onChange={handleSortChange} className="w-full px-3 py-2 bg-dark-bg border border-gray-700 rounded-lg text-white"><option value="newest">Newest First</option><option value="price-low">Price: Low to High</option><option value="price-high">Price: High to Low</option></select></div>
                <div className="mb-6"><label className="block text-sm font-medium text-gray-300 mb-2">Categories</label><div className="space-y-2"><label className="flex items-center p-2 rounded-lg hover:bg-dark-bg"><input type="radio" name="category-mobile" checked={filters.category === ''} onChange={() => handleCategoryChange('')} className="mr-3" /><span className="text-gray-300">All Categories</span></label>{categories.map(category => (<label key={category.id} className="flex items-center p-2 rounded-lg hover:bg-dark-bg"><input type="radio" name="category-mobile" checked={filters.category === category.id.toString()} onChange={() => handleCategoryChange(category.id.toString())} className="mr-3" /><span className="text-gray-300">{category.name_category}</span></label>))}</div></div>
                <button onClick={clearFilters} className="w-full btn-secondary">Clear All Filters</button>
              </div>
            </div>
          )}
          
          {loading ? <LoadingSpinner /> : products.length === 0 ? (<div className="text-center py-12 bg-dark-card rounded-xl"><p className="text-gray-400 text-lg">No products found</p><button onClick={clearFilters} className="mt-4 btn-primary">Clear Filters</button></div>) : (<div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>{products.map(product => (<ProductCard key={product.id} product={product} viewMode={viewMode} />))}</div>)}
        </div>
      </div>
    </div>
  );
};

export default Shop;