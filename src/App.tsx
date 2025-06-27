import { AppProvider, useAppContext } from './context/AppContext';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { FilterBar } from './components/FilterBar';
import { ProductList } from './components/ProductList';
import { ProductDetail } from './components/ProductDetail';
import { Cart } from './components/Cart';
import { Toast } from './components/Toast';

function AppContent() {
  const { state, dispatch } = useAppContext();

  const handleCloseToast = () => {
    dispatch({ type: 'HIDE_TOAST' });
  };

  const renderCurrentView = () => {
    switch (state.currentView) {
      case 'product-detail':
        return <ProductDetail />;
      case 'cart':
        return <Cart />;
      default:
        return (
          <>
            <div className="space-y-6 mb-8">
              <SearchBar />
              <FilterBar />
            </div>
            <ProductList />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderCurrentView()}
      </main>
      
      {/* Toast Notification */}
      {state.toast && (
        <Toast
          message={state.toast.message}
          isVisible={state.toast.isVisible}
          onClose={handleCloseToast}
        />
      )}
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;