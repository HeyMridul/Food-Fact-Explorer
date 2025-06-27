import { ShoppingCart, Package } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export function Header() {
  const { state, dispatch } = useAppContext();

  const cartItemCount = state.cart.reduce((total, item) => total + item.quantity, 0);

  const handleViewChange = (view: 'home' | 'cart') => {
    dispatch({ type: 'SET_CURRENT_VIEW', payload: view });
  };

  return (
    <header className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button
              onClick={() => handleViewChange('home')}
              className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
            >
              <div className="bg-gradient-to-r from-blue-500 to-teal-500 p-2 rounded-xl">
                <Package className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Food Explorer</h1>
                <p className="text-sm text-gray-500">Discover healthy choices</p>
              </div>
            </button>
          </div>

          <nav className="flex items-center space-x-6">
            <button
              onClick={() => handleViewChange('home')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                state.currentView === 'home'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              Products
            </button>
            
            <button
              onClick={() => handleViewChange('cart')}
              className={`relative px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
                state.currentView === 'cart'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <ShoppingCart className="h-5 w-5" />
              <span>Cart</span>
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold">
                  {cartItemCount}
                </span>
              )}
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}