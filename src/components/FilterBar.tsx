import { useEffect } from 'react';
import { Filter, RotateCcw } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { fetchCategories } from '../utils/api';
// import { fetchCategories } from '/Users/mridulbhardwaj/Desktop/project/src/utils/api.ts';

function formatCategoryName(categoryId: string): string {
  
  const name = categoryId.replace(/^[a-z]{2}:/, '');
  return name
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function FilterBar() {
  const { state, dispatch } = useAppContext();

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categories = await fetchCategories();
        dispatch({ type: 'SET_CATEGORIES', payload: categories });
      } catch (error) {
        console.error('Error loading categories:', error);
      }
    };

    if (state.categories.length === 0) {
      loadCategories();
    }
  }, [dispatch, state.categories.length]);

  const handleCategoryChange = (category: string) => {
    dispatch({ type: 'SET_CATEGORY', payload: category });
  };

  const handleSortChange = (sortBy: typeof state.sortBy) => {
    dispatch({ type: 'SET_SORT_BY', payload: sortBy });
  };

  const handleResetFilters = () => {
    dispatch({ type: 'RESET_FILTERS' });
  };

  const hasActiveFilters = state.selectedCategory || state.searchTerm || state.barcode || state.sortBy !== 'name-asc';

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Filter className="h-5 w-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">Filters & Sort</h3>
        </div>
        {hasActiveFilters && (
          <button
            onClick={handleResetFilters}
            className="flex items-center space-x-2 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Reset</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Category Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            value={state.selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
          >
            <option value="">All Categories</option>
            {state.categories.map((categoryId) => {
              const cleanId = categoryId.includes(':') ? categoryId.split(':')[1] : categoryId;
              return (
                <option key={categoryId} value={cleanId}>
                  {formatCategoryName(categoryId)}
                </option>
              );
            })}
            {/* {state.categories.map((categoryId) => (
              <option key={categoryId} value={categoryId}>
                {formatCategoryName(categoryId)}
              </option>
            ))} */}
          </select>
        </div>

        {/* Sort Options */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sort By
          </label>
          <select
            value={state.sortBy}
            onChange={(e) => handleSortChange(e.target.value as typeof state.sortBy)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
          >
            <option value="name-asc">Name (A-Z)</option>
            <option value="name-desc">Name (Z-A)</option>
            <option value="grade-asc">Nutrition Grade (Best First)</option>
            <option value="grade-desc">Nutrition Grade (Worst First)</option>
          </select>
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex flex-wrap gap-2">
            {state.searchTerm && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                Search: "{state.searchTerm}"
              </span>
            )}
            {state.barcode && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                Barcode: {state.barcode}
              </span>
            )}
            {state.selectedCategory && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-teal-100 text-teal-800">
                Category: {formatCategoryName(state.selectedCategory)}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}