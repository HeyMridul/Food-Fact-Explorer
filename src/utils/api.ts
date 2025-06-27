import { Product, ApiResponse, ProductDetailResponse } from '../types';

// const BASE_URL = 'https://world.openfoodfacts.org';


function cleanProduct(product: any): Product {
  return {
    id: product.id || product.code || product._id || Math.random().toString(36).substr(2, 9),
    product_name: product.product_name || product.product_name_en || 'Unknown Product',
    product_name_en: product.product_name_en,
    image_url: product.image_url || product.image_front_url,
    image_front_url: product.image_front_url,
    categories: product.categories,
    categories_tags: product.categories_tags || [],
    ingredients_text: product.ingredients_text || product.ingredients_text_en,
    ingredients_text_en: product.ingredients_text_en,
    nutrition_grades: product.nutrition_grades || product.nutrition_grade_fr || product.nutriscore_grade,
    nutrition_grade_fr: product.nutrition_grade_fr,
    nutriscore_grade: product.nutriscore_grade,
    brands: product.brands,
    brands_tags: product.brands_tags || [],
    countries: product.countries,
    countries_tags: product.countries_tags || [],
    labels: product.labels,
    labels_tags: product.labels_tags || [],
    nutriments: product.nutriments || {},
    code: product.code,
    _id: product._id,
    ecoscore_grade: product.ecoscore_grade,
    nova_group: product.nova_group,
    serving_size: product.serving_size,
  };
}

export async function fetchProducts(page: number = 1, pageSize: number = 20): Promise<ApiResponse> {
  try {

    const response = await fetch(
  `/api/cgi/search.pl?search_simple=1&action=process&page=${page}&page_size=${pageSize}&json=true`
);
    // const response = await fetch(
    //   `${BASE_URL}/cgi/search.pl?search_simple=1&action=process&page=${page}&page_size=${pageSize}&json=true`
    // );

    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    return {
      products: (data.products || []).map(cleanProduct),
      count: data.count || 0,
      page: data.page || page,
      page_count: data.page_count || 1,
      page_size: data.page_size || pageSize,
      skip: data.skip || 0,
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Failed to fetch products. Please try again later.');
  }
}

export async function searchProducts(searchTerm: string, page: number = 1): Promise<ApiResponse> {
  try {
    const encodedSearchTerm = encodeURIComponent(searchTerm);
    // const response = await fetch(
    //   `${BASE_URL}/cgi/search.pl?search_terms=${encodedSearchTerm}&page=${page}&page_size=20&json=true`
    // );
    const response = await fetch(`/api/cgi/search.pl?search_terms=${encodedSearchTerm}&page=${page}&page_size=20&json=true`);

    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    return {
      products: (data.products || []).map(cleanProduct),
      count: data.count || 0,
      page: data.page || page,
      page_count: data.page_count || 1,
      page_size: data.page_size || 20,
      skip: data.skip || 0,
    };
  } catch (error) {
    console.error('Error searching products:', error);
    throw new Error('Failed to search products. Please try again later.');
  }
}

export async function fetchProductByBarcode(barcode: string): Promise<Product | null> {
  try {

    // const response = await fetch(`/api/api/v0/product/${barcode}.json`);
    const response = await fetch(`api/api/v0/product/${barcode}.json`);
    // const response = await fetch(`${BASE_URL}/api/v0/product/${barcode}.json`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: ProductDetailResponse = await response.json();
    
    if (data.status === 1 && data.product) {
      return cleanProduct(data.product);
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching product by barcode:', error);
    throw new Error('Failed to fetch product by barcode. Please try again later.');
  }
}

// export async function fetchProductsByCategory(category: string, page: number = 1): Promise<ApiResponse> {
//   try {
//     const cleanCategory = category.includes(':') ? category.split(':')[1] : category;
//     const encodedCategory = encodeURIComponent(cleanCategory);
//     // const response = await fetch(`${BASE_URL}/category/${encodedCategory}/${page}.json`);

//     const response = await fetch(`/api/category/${encodedCategory}/${page}.json`);
    
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
    
//     const data = await response.json();
    
//     return {
//       products: (data.products || []).map(cleanProduct),
//       count: data.count || 0,
//       page: data.page || page,
//       page_count: data.page_count || 1,
//       page_size: data.page_size || 20,
//       skip: data.skip || 0,
//     };
//   } catch (error) {
//     console.error('Error fetching products by category:', error);
//     throw new Error('Failed to fetch products by category. Please try again later.');
//   }
// }

export async function fetchProductsByCategory(category: string, page: number = 1): Promise<ApiResponse> {
  try {
    if (!category || typeof category !== 'string') {
      throw new Error(`Invalid category value: ${category}`);
    }

    const cleanCategory = category.includes(':') ? category.split(':')[1] : category;
    const encodedCategory = encodeURIComponent(cleanCategory);

    const url = `/api/category/${encodedCategory}/${page}.json`;
    console.log("Fetching products by category from:", url);

    const response = await fetch(url);

    console.log("Raw response:", response);

    if (!response.ok) {
      console.error("HTTP error:", response.status);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const text = await response.text();
    console.log("Response text:", text.slice(0, 200)); 
    
    const data = JSON.parse(text);

    return {
      products: (data.products || []).map(cleanProduct),
      count: data.count || 0,
      page: data.page || page,
      page_count: data.page_count || 1,
      page_size: data.page_size || 20,
      skip: data.skip || 0,
    };
  } catch (error) {
    console.error('Error fetching products by category:', error);
    throw new Error('Failed to fetch products by category. Please try again later.');
  }
}



export async function fetchCategories(): Promise<string[]> {
  try {
    // const response = await fetch(`${BASE_URL}/categories.json`);
    const response = await fetch(`/api/facets/categories.json`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    const categories = (data.tags || [])
      .filter((tag: any) => tag.products > 100) 
      .map((tag: any) => tag.id) 
      .slice(0, 50);
    
    return categories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [
      'beverages',
      'dairy',
      'snacks',
      'breakfast-cereals',
      'meat',
      'fish',
      'fruits',
      'vegetables',
      'bread',
      'desserts'
    ];
  }
}