import React from 'react';
import { ShoppingCart, Eye, Package } from 'lucide-react';
import { Product } from '../types';
import { useAppContext } from '../context/AppContext';
import { NutritionGrade } from './NutritionGrade';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { dispatch } = useAppContext();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const handleViewDetails = () => {
    dispatch({ type: 'SET_SELECTED_PRODUCT', payload: product });
    dispatch({ type: 'SET_CURRENT_VIEW', payload: 'product-detail' });
  };

  const productImage = product.image_url || product.image_front_url;
  const productName = product.product_name || product.product_name_en || 'Unknown Product';
  const nutritionGrade = product.nutrition_grades || product.nutrition_grade_fr || product.nutriscore_grade;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden group">
      <div className="relative aspect-square bg-gray-100 overflow-hidden">
        {productImage ? (
          <img
            src={productImage}
            alt={productName}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Package className="h-16 w-16 text-gray-400" />
          </div>
        )}
        <div className="absolute top-3 right-3">
          <NutritionGrade grade={nutritionGrade} size="sm" />
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <button
            onClick={handleViewDetails}
            className="bg-white text-gray-900 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center space-x-2"
          >
            <Eye className="h-4 w-4" />
            <span>View Details</span>
          </button>
        </div>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-gray-900 line-clamp-2 leading-tight">
            {productName}
          </h3>
        </div>

        {product.brands && (
          <p className="text-sm text-gray-600 mb-2 line-clamp-1">
            {product.brands}
          </p>
        )}

        {product.categories && (
          <p className="text-xs text-gray-500 mb-3 line-clamp-1">
            {product.categories.split(',').slice(0, 2).join(', ')}
          </p>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <NutritionGrade grade={nutritionGrade} size="sm" />
            <span className="text-xs text-gray-600">Nutri-Score</span>
          </div>
          <button
            onClick={handleAddToCart}
            className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-1 hover:scale-105"
          >
            <ShoppingCart className="h-4 w-4" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
}