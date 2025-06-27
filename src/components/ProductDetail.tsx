import { ArrowLeft, ShoppingCart, Package, Award, Leaf, AlertTriangle } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { NutritionGrade } from './NutritionGrade';

export function ProductDetail() {
  const { state, dispatch } = useAppContext();

  if (!state.selectedProduct) {
    return null;
  }

  const product = state.selectedProduct;
  const productImage = product.image_url || product.image_front_url;
  const productName = product.product_name || product.product_name_en || 'Unknown Product';
  const nutritionGrade = product.nutrition_grades || product.nutrition_grade_fr || product.nutriscore_grade;

  const handleBack = () => {
    dispatch({ type: 'SET_CURRENT_VIEW', payload: 'home' });
    dispatch({ type: 'SET_SELECTED_PRODUCT', payload: null });
  };

  const handleAddToCart = () => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const formatNutrientValue = (value?: number, unit?: string) => {
    if (value === undefined || value === null) return 'N/A';
    return `${value}${unit ? ` ${unit}` : ''}`;
  };

  return (
    <div className="max-w-6xl mx-auto">
      <button
        onClick={handleBack}
        className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
      >
        <ArrowLeft className="h-5 w-5" />
        <span>Back to products</span>
      </button>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden">
              {productImage ? (
                <img
                  src={productImage}
                  alt={productName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Package className="h-24 w-24 text-gray-400" />
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between mb-4">
                <h1 className="text-3xl font-bold text-gray-900 leading-tight">
                  {productName}
                </h1>
                <NutritionGrade grade={nutritionGrade} size="lg" />
              </div>
              
              {product.brands && (
                <p className="text-lg text-gray-600 mb-2">
                  <strong>Brand:</strong> {product.brands}
                </p>
              )}

              {product.categories && (
                <p className="text-sm text-gray-500">
                  <strong>Categories:</strong> {product.categories}
                </p>
              )}
            </div>

            {/* Nutrition Grade Section */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-2">
                <Award className="h-5 w-5 text-blue-500" />
                <h3 className="font-semibold text-gray-900">Nutrition Score</h3>
              </div>
              <div className="flex items-center space-x-3">
                <NutritionGrade grade={nutritionGrade} size="md" />
                <div>
                  <p className="text-sm text-gray-600">
                    Nutri-Score: <strong>{nutritionGrade?.toUpperCase() || 'Not available'}</strong>
                  </p>
                  <p className="text-xs text-gray-500">
                    A = Best nutritional quality, E = Poorest nutritional quality
                  </p>
                </div>
              </div>
            </div>

            {/* Additional Scores */}
            <div className="grid grid-cols-2 gap-4">
              {product.ecoscore_grade && (
                <div className="bg-green-50 rounded-lg p-3">
                  <div className="flex items-center space-x-2 mb-1">
                    <Leaf className="h-4 w-4 text-green-500" />
                    <span className="text-sm font-medium text-gray-900">Eco-Score</span>
                  </div>
                  <span className="text-lg font-bold text-green-700">
                    {product.ecoscore_grade.toUpperCase()}
                  </span>
                </div>
              )}

              {product.nova_group && (
                <div className="bg-orange-50 rounded-lg p-3">
                  <div className="flex items-center space-x-2 mb-1">
                    <AlertTriangle className="h-4 w-4 text-orange-500" />
                    <span className="text-sm font-medium text-gray-900">NOVA Group</span>
                  </div>
                  <span className="text-lg font-bold text-orange-700">
                    {product.nova_group}
                  </span>
                </div>
              )}
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="w-full bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white py-3 px-6 rounded-lg font-medium transition-all duration-200 hover:scale-105 flex items-center justify-center space-x-2"
            >
              <ShoppingCart className="h-5 w-5" />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>

        {/* Detailed Information Tabs */}
        <div className="border-t border-gray-200">
          <div className="p-8 space-y-8">
            {/* Ingredients */}
            {product.ingredients_text && (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Ingredients</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-700 leading-relaxed">
                    {product.ingredients_text}
                  </p>
                </div>
              </div>
            )}

            {/* Nutritional Information */}
            {product.nutriments && Object.keys(product.nutriments).length > 0 && (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Nutritional Information</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {product.nutriments.energy && (
                      <div className="bg-white rounded-lg p-3">
                        <div className="text-sm text-gray-600">Energy</div>
                        <div className="text-lg font-semibold">
                          {formatNutrientValue(product.nutriments.energy, product.nutriments.energy_unit)}
                        </div>
                      </div>
                    )}
                    
                    {product.nutriments['energy-kcal'] && (
                      <div className="bg-white rounded-lg p-3">
                        <div className="text-sm text-gray-600">Calories</div>
                        <div className="text-lg font-semibold">
                          {formatNutrientValue(product.nutriments['energy-kcal'], 'kcal')}
                        </div>
                      </div>
                    )}

                    {product.nutriments.fat !== undefined && (
                      <div className="bg-white rounded-lg p-3">
                        <div className="text-sm text-gray-600">Fat</div>
                        <div className="text-lg font-semibold">
                          {formatNutrientValue(product.nutriments.fat, product.nutriments.fat_unit || 'g')}
                        </div>
                      </div>
                    )}

                    {product.nutriments['saturated-fat'] !== undefined && (
                      <div className="bg-white rounded-lg p-3">
                        <div className="text-sm text-gray-600">Saturated Fat</div>
                        <div className="text-lg font-semibold">
                          {formatNutrientValue(product.nutriments['saturated-fat'], product.nutriments['saturated-fat_unit'] || 'g')}
                        </div>
                      </div>
                    )}

                    {product.nutriments.carbohydrates !== undefined && (
                      <div className="bg-white rounded-lg p-3">
                        <div className="text-sm text-gray-600">Carbohydrates</div>
                        <div className="text-lg font-semibold">
                          {formatNutrientValue(product.nutriments.carbohydrates, product.nutriments.carbohydrates_unit || 'g')}
                        </div>
                      </div>
                    )}

                    {product.nutriments.sugars !== undefined && (
                      <div className="bg-white rounded-lg p-3">
                        <div className="text-sm text-gray-600">Sugars</div>
                        <div className="text-lg font-semibold">
                          {formatNutrientValue(product.nutriments.sugars, product.nutriments.sugars_unit || 'g')}
                        </div>
                      </div>
                    )}

                    {product.nutriments.fiber !== undefined && (
                      <div className="bg-white rounded-lg p-3">
                        <div className="text-sm text-gray-600">Fiber</div>
                        <div className="text-lg font-semibold">
                          {formatNutrientValue(product.nutriments.fiber, product.nutriments.fiber_unit || 'g')}
                        </div>
                      </div>
                    )}

                    {product.nutriments.proteins !== undefined && (
                      <div className="bg-white rounded-lg p-3">
                        <div className="text-sm text-gray-600">Proteins</div>
                        <div className="text-lg font-semibold">
                          {formatNutrientValue(product.nutriments.proteins, product.nutriments.proteins_unit || 'g')}
                        </div>
                      </div>
                    )}

                    {product.nutriments.salt !== undefined && (
                      <div className="bg-white rounded-lg p-3">
                        <div className="text-sm text-gray-600">Salt</div>
                        <div className="text-lg font-semibold">
                          {formatNutrientValue(product.nutriments.salt, product.nutriments.salt_unit || 'g')}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Labels */}
            {product.labels && (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Labels & Certifications</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex flex-wrap gap-2">
                    {product.labels.split(',').map((label, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800"
                      >
                        {label.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Additional Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {product.serving_size && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Serving Size</h4>
                  <p className="text-gray-700">{product.serving_size}</p>
                </div>
              )}

              {product.countries && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Countries</h4>
                  <p className="text-gray-700">{product.countries}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}