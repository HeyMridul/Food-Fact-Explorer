import { ShoppingCart, Plus, Minus, Trash2, ArrowLeft, Package } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { NutritionGrade } from './NutritionGrade';

export function Cart() {
  const { state, dispatch } = useAppContext();

  const handleQuantityChange = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
    } else {
      dispatch({ type: 'UPDATE_CART_QUANTITY', payload: { productId, quantity } });
    }
  };

  const handleRemoveItem = (productId: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
  };

  const handleClearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const handleBackToProducts = () => {
    dispatch({ type: 'SET_CURRENT_VIEW', payload: 'home' });
  };

  const totalItems = state.cart.reduce((sum, item) => sum + item.quantity, 0);

  if (state.cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto">
        <button
          onClick={handleBackToProducts}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to products</span>
        </button>

        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-12">
          <div className="text-center">
            <ShoppingCart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Add some delicious products to get started!</p>
            <button
              onClick={handleBackToProducts}
              className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:scale-105"
            >
              Start Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={handleBackToProducts}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to products</span>
        </button>

        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600">
            {totalItems} {totalItems === 1 ? 'item' : 'items'}
          </span>
          <button
            onClick={handleClearCart}
            className="text-red-600 hover:text-red-700 text-sm font-medium transition-colors"
          >
            Clear Cart
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <ShoppingCart className="h-6 w-6 text-blue-500" />
            <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {state.cart.map((item) => {
            const productImage = item.product.image_url || item.product.image_front_url;
            const productName = item.product.product_name || item.product.product_name_en || 'Unknown Product';
            const nutritionGrade = item.product.nutrition_grades || item.product.nutrition_grade_fr || item.product.nutriscore_grade;

            return (
              <div key={item.product.id} className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
                    {productImage ? (
                      <img
                        src={productImage}
                        alt={productName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Package className="h-8 w-8 text-gray-400" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="pr-4">
                        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                          {productName}
                        </h3>
                        {item.product.brands && (
                          <p className="text-sm text-gray-600 mt-1">
                            {item.product.brands}
                          </p>
                        )}
                        <div className="flex items-center space-x-2 mt-2">
                          <NutritionGrade grade={nutritionGrade} size="sm" />
                          <span className="text-xs text-gray-500">Nutri-Score</span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleRemoveItem(item.product.id)}
                        className="text-red-500 hover:text-red-700 p-1 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                        >
                          <Minus className="h-4 w-4 text-gray-600" />
                        </button>
                        <span className="font-semibold text-gray-900 min-w-[2rem] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                        >
                          <Plus className="h-4 w-4 text-gray-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between text-lg font-semibold text-gray-900">
            <span>Total Items:</span>
            <span>{totalItems}</span>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            This is a demo cart. In a real application, you would proceed to checkout here.
          </p>
        </div>
      </div>
    </div>
  );
}