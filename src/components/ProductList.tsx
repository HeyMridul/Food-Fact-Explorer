import { useEffect, useRef, useCallback } from 'react';
import { Loader2, AlertCircle, Package } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { ProductCard } from './ProductCard';
import { fetchProducts, searchProducts, fetchProductByBarcode, fetchProductsByCategory } from '../utils/api';
import { Product } from '../types';

export function ProductList() {
  const { state, dispatch } = useAppContext();
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadingRef = useRef<HTMLDivElement | null>(null);

  const sortProducts = useCallback((products: Product[]) => {
    return [...products].sort((a, b) => {
      switch (state.sortBy) {
        case 'name-asc':
          return (a.product_name || '').localeCompare(b.product_name || '');
        case 'name-desc':
          return (b.product_name || '').localeCompare(a.product_name || '');
        case 'grade-asc': {
          const gradeA = a.nutrition_grades || a.nutrition_grade_fr || a.nutriscore_grade || 'Z';
          const gradeB = b.nutrition_grades || b.nutrition_grade_fr || b.nutriscore_grade || 'Z';
          return gradeA.localeCompare(gradeB);
        }
        case 'grade-desc': {
          const gradeA = a.nutrition_grades || a.nutrition_grade_fr || a.nutriscore_grade || '';
          const gradeB = b.nutrition_grades || b.nutrition_grade_fr || b.nutriscore_grade || '';
          return gradeB.localeCompare(gradeA);
        }
        default:
          return 0;
      }
    });
  }, [state.sortBy]);

  const loadProducts = useCallback(async (page: number = 1, append: boolean = false) => {
    if (state.loading) return;

    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });

    try {
      let response;

      if (state.barcode.trim()) {
        if (page === 1) {
          const product = await fetchProductByBarcode(state.barcode.trim());
          response = {
            products: product ? [product] : [],
            count: product ? 1 : 0,
            page: 1,
            page_count: 1,
            page_size: 1,
            skip: 0,
          };
        } else {
          response = {
            products: [],
            count: 0,
            page,
            page_count: 1,
            page_size: 20,
            skip: 0,
          };
        }
      } else if (state.searchTerm.trim()) {
        response = await searchProducts(state.searchTerm.trim(), page);
      } else if (state.selectedCategory) {
        response = await fetchProductsByCategory(state.selectedCategory, page);
      } else {
        response = await fetchProducts(page);
      }

      const sortedProducts = sortProducts(response.products);

      if (append && page > 1) {
        dispatch({ type: 'APPEND_PRODUCTS', payload: sortedProducts });
      } else {
        dispatch({ type: 'SET_PRODUCTS', payload: sortedProducts });
      }

      dispatch({ type: 'SET_CURRENT_PAGE', payload: page });
      dispatch({ type: 'SET_HAS_MORE_PAGES', payload: page < response.page_count });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error instanceof Error ? error.message : 'An error occurred' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, [state.searchTerm, state.barcode, state.selectedCategory, state.loading, dispatch, sortProducts]);

  useEffect(() => {
    loadProducts(1, false);
  }, [state.searchTerm, state.barcode, state.selectedCategory]);

  useEffect(() => {
    if (state.products.length > 0) {
      const sortedProducts = sortProducts(state.products);
      dispatch({ type: 'SET_PRODUCTS', payload: sortedProducts });
    }
  }, [state.sortBy, sortProducts, dispatch]);

  useEffect(() => {
    const currentLoadingRef = loadingRef.current;

    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && state.hasMorePages && !state.loading && !state.barcode.trim()) {
          loadProducts(state.currentPage + 1, true);
        }
      },
      { threshold: 0.1 }
    );

    if (currentLoadingRef) {
      observerRef.current.observe(currentLoadingRef);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [loadProducts, state.hasMorePages, state.loading, state.currentPage, state.barcode]);

  if (state.loading && state.products.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500 mx-auto mb-4" />
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  if (state.error) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center max-w-md">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Something went wrong</h3>
          <p className="text-gray-600 mb-4">{state.error}</p>
          <button
            onClick={() => loadProducts(1, false)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (state.products.length === 0 && !state.loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-600">
            {state.searchTerm || state.barcode || state.selectedCategory
              ? 'Try adjusting your search or filters'
              : 'No products available at the moment'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {state.products.map((product, index) => (
          <ProductCard key={`${product.id}-${index}`} product={product} />
        ))}
      </div>

      {/* Infinite scroll loading indicator */}
      {state.hasMorePages && !state.barcode.trim() && (
        <div ref={loadingRef} className="flex justify-center py-8">
          {state.loading && (
            <div className="flex items-center space-x-2">
              <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
              <span className="text-gray-600">Loading more products...</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}