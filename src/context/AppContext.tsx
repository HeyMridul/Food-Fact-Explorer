import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { AppState, AppAction, CartItem } from '../types';

const initialState: AppState = {
  products: [],
  loading: false,
  error: null,
  searchTerm: '',
  barcode: '',
  selectedCategory: '',
  sortBy: 'name-asc',
  currentPage: 1,
  hasMorePages: true,
  cart: [],
  categories: [],
  selectedProduct: null,
  currentView: 'home',
  toast: null,
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return { ...state, products: action.payload };
    case 'APPEND_PRODUCTS':
      return { ...state, products: [...state.products, ...action.payload] };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_SEARCH_TERM':
      return { ...state, searchTerm: action.payload, currentPage: 1, products: [] };
    case 'SET_BARCODE':
      return { ...state, barcode: action.payload, currentPage: 1, products: [] };
    case 'SET_CATEGORY':
      return { ...state, selectedCategory: action.payload, currentPage: 1, products: [] };
    case 'SET_SORT_BY':
      return { ...state, sortBy: action.payload };
    case 'SET_CURRENT_PAGE':
      return { ...state, currentPage: action.payload };
    case 'SET_HAS_MORE_PAGES':
      return { ...state, hasMorePages: action.payload };
    case 'ADD_TO_CART': {
      const existingItem = state.cart.find(item => item.product.id === action.payload.id);
      const productName = action.payload.product_name || action.payload.product_name_en || 'Product';
      
      let newCart;
      let toastMessage;
      
      if (existingItem) {
        newCart = state.cart.map(item =>
          item.product.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        toastMessage = `${productName} quantity updated in cart!`;
      } else {
        newCart = [...state.cart, { product: action.payload, quantity: 1 }];
        toastMessage = `${productName} added to cart!`;
      }
      
      return {
        ...state,
        cart: newCart,
        toast: {
          id: Date.now().toString(),
          message: toastMessage,
          isVisible: true,
        },
      };
    }
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.product.id !== action.payload),
      };
    case 'UPDATE_CART_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.product.id === action.payload.productId
            ? { ...item, quantity: action.payload.quantity }
            : item
        ).filter(item => item.quantity > 0),
      };
    case 'CLEAR_CART':
      return { ...state, cart: [] };
    case 'SET_CATEGORIES':
      return { ...state, categories: action.payload };
    case 'SET_SELECTED_PRODUCT':
      return { ...state, selectedProduct: action.payload };
    case 'SET_CURRENT_VIEW':
      return { ...state, currentView: action.payload };
    case 'RESET_FILTERS':
      return {
        ...state,
        searchTerm: '',
        barcode: '',
        selectedCategory: '',
        sortBy: 'name-asc',
        currentPage: 1,
        products: [],
        hasMorePages: true,
      };
    case 'SHOW_TOAST':
      return {
        ...state,
        toast: {
          id: Date.now().toString(),
          message: action.payload,
          isVisible: true,
        },
      };
    case 'HIDE_TOAST':
      return {
        ...state,
        toast: state.toast ? { ...state.toast, isVisible: false } : null,
      };
    default:
      return state;
  }
}

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load cart from localStorage on initialization
  useEffect(() => {
    const savedCart = localStorage.getItem('food-explorer-cart');
    if (savedCart) {
      try {
        const cartItems: CartItem[] = JSON.parse(savedCart);
        cartItems.forEach(item => {
          dispatch({ type: 'ADD_TO_CART', payload: item.product });
          if (item.quantity > 1) {
            dispatch({
              type: 'UPDATE_CART_QUANTITY',
              payload: { productId: item.product.id, quantity: item.quantity }
            });
          }
        });
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('food-explorer-cart', JSON.stringify(state.cart));
  }, [state.cart]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}