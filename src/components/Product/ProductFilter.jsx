import React from 'react';
import { FiFilter, FiX, FiSliders } from 'react-icons/fi';

const ProductFilter = ({ categories, filters, setFilters, onClose, isMobile = false }) => {
  const handleCategoryChange = (categoryId) => {
    setFilters(prev => ({ ...prev, category: categoryId }));
  };

  const handleSortChange = (e) => {
    setFilters(prev => ({ ...prev, sort: e.target.value }));
  };

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      priceRange: { ...prev.priceRange, [name]: value ? Number(value) : null }
    }));
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      search: '',
      sort: 'newest',
      priceRange: { min: null, max: null }
    });
  };

  const FilterContent = () => (
    <>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold flex items-center">
          <FiSliders className="mr-2" />
          Filters
        </h3>
        <button 
          onClick={clearFilters}
          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          Clear All
        </button>
        {isMobile && (
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FiX size={20} />
          </button>
        )}
      </div>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Sort By
        </label>
        <select 
          value={filters.sort}
          onChange={handleSortChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
        >
          <option value="newest">Newest First</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
        </select>
      </div>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Price Range
        </label>
        <div className="flex space-x-2">
          <input
            type="number"
            name="min"
            placeholder="Min"
            value={filters.priceRange?.min || ''}
            onChange={handlePriceChange}
            className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
          <input
            type="number"
            name="max"
            placeholder="Max"
            value={filters.priceRange?.max || ''}
            onChange={handlePriceChange}
            className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Categories
        </label>
        <div className="space-y-2">
          <label className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
            <input
              type="radio"
              name="category"
              checked={filters.category === ''}
              onChange={() => handleCategoryChange('')}
              className="mr-3 w-4 h-4 text-blue-600"
            />
            <span className="text-gray-700">All Categories</span>
          </label>
          {categories.map(category => (
            <label key={category.id} className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
              <input
                type="radio"
                name="category"
                checked={filters.category === category.id.toString()}
                onChange={() => handleCategoryChange(category.id.toString())}
                className="mr-3 w-4 h-4 text-blue-600"
              />
              <span className="text-gray-700">{category.name_category}</span>
            </label>
          ))}
        </div>
      </div>
    </>
  );

  return <FilterContent />;
};

export default ProductFilter;