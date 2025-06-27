export interface Product {
  id: string;
  product_name: string;
  product_name_en?: string;
  image_url?: string;
  image_front_url?: string;
  categories?: string;
  categories_tags?: string[];
  ingredients_text?: string;
  ingredients_text_en?: string;
  nutrition_grades?: string;
  nutrition_grade_fr?: string;
  nutriscore_grade?: string;
  brands?: string;
  brands_tags?: string[];
  countries?: string;
  countries_tags?: string[];
  labels?: string;
  labels_tags?: string[];
  nutriments?: Nutriments;
  code?: string;
  _id?: string;
  ecoscore_grade?: string;
  nova_group?: number;
  serving_size?: string;
}

export interface Nutriments {
  energy?: number;
  energy_unit?: string;
  'energy-kcal'?: number;
  'energy-kcal_unit'?: string;
  'energy-kj'?: number;
  'energy-kj_unit'?: string;
  fat?: number;
  fat_unit?: string;
  'saturated-fat'?: number;
  'saturated-fat_unit'?: string;
  carbohydrates?: number;
  carbohydrates_unit?: string;
  sugars?: number;
  sugars_unit?: string;
  fiber?: number;
  fiber_unit?: string;
  proteins?: number;
  proteins_unit?: string;
  salt?: number;
  salt_unit?: string;
  sodium?: number;
  sodium_unit?: string;
}

export interface ApiResponse {
  products: Product[];
  count: number;
  page: number;
  page_count: number;
  page_size: number;
  skip: number;
}

export interface ProductDetailResponse {
  code: string;
  product: Product;
  status: number;
  status_verbose: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ToastNotification {
  id: string;
  message: string;
  isVisible: boolean;
}

export interface AppState {
  products: Product[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  barcode: string;
  selectedCategory: string;
  sortBy: 'name-asc' | 'name-desc' | 'grade-asc' | 'grade-desc';
  currentPage: number;
  hasMorePages: boolean;
  cart: CartItem[];
  categories: string[];
  selectedProduct: Product | null;
  currentView: 'home' | 'product-detail' | 'cart';
  toast: ToastNotification | null;
}

export type AppAction =
  | { type: 'SET_PRODUCTS'; payload: Product[] }
  | { type: 'APPEND_PRODUCTS'; payload: Product[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_SEARCH_TERM'; payload: string }
  | { type: 'SET_BARCODE'; payload: string }
  | { type: 'SET_CATEGORY'; payload: string }
  | { type: 'SET_SORT_BY'; payload: AppState['sortBy'] }
  | { type: 'SET_CURRENT_PAGE'; payload: number }
  | { type: 'SET_HAS_MORE_PAGES'; payload: boolean }
  | { type: 'ADD_TO_CART'; payload: Product }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_CART_QUANTITY'; payload: { productId: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'SET_CATEGORIES'; payload: string[] }
  | { type: 'SET_SELECTED_PRODUCT'; payload: Product | null }
  | { type: 'SET_CURRENT_VIEW'; payload: AppState['currentView'] }
  | { type: 'RESET_FILTERS' }
  | { type: 'SHOW_TOAST'; payload: string }
  | { type: 'HIDE_TOAST' };