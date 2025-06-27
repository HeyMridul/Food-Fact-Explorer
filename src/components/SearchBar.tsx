import { useState, useEffect } from 'react';
import { Search, Scan, X } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export function SearchBar() {
  const { state, dispatch } = useAppContext();
  const [localSearchTerm, setLocalSearchTerm] = useState(state.searchTerm);
  const [localBarcode, setLocalBarcode] = useState(state.barcode);
  const [searchMode, setSearchMode] = useState<'name' | 'barcode'>('name');

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (searchMode === 'name' && localSearchTerm !== state.searchTerm) {
        dispatch({ type: 'SET_SEARCH_TERM', payload: localSearchTerm });
        dispatch({ type: 'SET_BARCODE', payload: '' });
      } else if (searchMode === 'barcode' && localBarcode !== state.barcode) {
        dispatch({ type: 'SET_BARCODE', payload: localBarcode });
        dispatch({ type: 'SET_SEARCH_TERM', payload: '' });
      }
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [localSearchTerm, localBarcode, searchMode, dispatch, state.searchTerm, state.barcode]);

  const handleClear = () => {
    setLocalSearchTerm('');
    setLocalBarcode('');
    dispatch({ type: 'SET_SEARCH_TERM', payload: '' });
    dispatch({ type: 'SET_BARCODE', payload: '' });
  };

  const currentValue = searchMode === 'name' ? localSearchTerm : localBarcode;
  const hasValue = currentValue.length > 0;

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative">
        <div className="flex">
          <div className="flex bg-white rounded-l-xl border border-r-0 border-gray-300 overflow-hidden">
            <button
              onClick={() => setSearchMode('name')}
              className={`px-4 py-3 flex items-center space-x-2 transition-colors ${
                searchMode === 'name'
                  ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-500'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Search className="h-4 w-4" />
              <span className="text-sm font-medium">Name</span>
            </button>
            <button
              onClick={() => setSearchMode('barcode')}
              className={`px-4 py-3 flex items-center space-x-2 transition-colors ${
                searchMode === 'barcode'
                  ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-500'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Scan className="h-4 w-4" />
              <span className="text-sm font-medium">Barcode</span>
            </button>
          </div>
          <div className="flex-1 relative">
            <input
              type="text"
              value={currentValue}
              onChange={(e) => {
                if (searchMode === 'name') {
                  setLocalSearchTerm(e.target.value);
                } else {
                  setLocalBarcode(e.target.value);
                }
              }}
              placeholder={
                searchMode === 'name'
                  ? 'Search for food products...'
                  : 'Enter product barcode...'
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-r-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900 placeholder-gray-500"
            />
            {hasValue && (
              <button
                onClick={handleClear}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}