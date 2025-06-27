# 🍎 Food Product Fact Explorer

A comprehensive web application for exploring food products using the OpenFoodFacts API. Search, scan, filter, and manage food products with detailed nutrition information, barcode scanning, and shopping cart functionality.


## ✨ Features

### 🔍 **Search & Discovery**
- **Text Search**: Search products by name, brand, or keywords
- **Barcode Search**: Manual barcode entry for precise product lookup
- **Category Filtering**: Filter by 25+ food categories (beverages, dairy, snacks, etc.)
- **Smart Sorting**: Sort by name (A-Z, Z-A) or nutrition grade (best/worst first)


### 🛒 **Shopping Cart**
- **Add to Cart**: One-click product additions with quantity management
- **Cart Management**: Increase/decrease quantities, remove items
- **Persistent State**: Cart maintained during browsing session
- **Visual Feedback**: Cart badge shows total item count
- **Slide-out Cart**: Easy access cart sidebar with full item details

### 📊 **Product Information**
- **Comprehensive Details**: Name, brand, ingredients, nutrition facts
- **Quality Scores**: Nutri-Score (A-E), NOVA processing levels, Eco-Score
- **Nutrition Facts**: Complete nutritional information per 100g
- **Categories & Tags**: Detailed product categorization
- **High-Quality Images**: Product photos when available

### 🎯 **User Experience**
- **Infinite Scrolling**: Smooth, automatic loading of more products
- **Toast Notifications**: Real-time feedback for all actions
- **Responsive Design**: Optimized for desktop, tablet, and mobile
- **Loading States**: Clear indicators during data fetching
- **Error Handling**: Graceful error messages and fallbacks

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/your-username/food-product-explorer.git
   cd food-product-explorer
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

3. **Run the development server**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`

## 🛠️ Technology Stack

### **Frontend Framework**
- **Next.js 14+**: React framework with App Router
- **React 18+**: Component-based UI library
- **TypeScript**: Type-safe development

### **UI Components**
- **shadcn/ui**: Modern, accessible component library
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Beautiful, customizable icons

### **Barcode Scanning**
- **@zxing/library**: JavaScript barcode scanning library

### **State Management**
- **React Context**: Global cart state management
- **useReducer**: Complex state logic handling

### **API Integration**
- **OpenFoodFacts API**: Comprehensive food product database
- **Fetch API**: HTTP requests for data fetching

## 📖 Usage Guide

### **Basic Search**
1. Enter product name in the search bar
2. Click "Search" or press Enter
3. Browse results with infinite scrolling

### **Barcode Scanning**
1. Click the scan button (📷) next to barcode search
2. Enter barcode numbers and click search

### **Category Filtering**
1. Use the category dropdown to filter products
2. Categories show product counts for reference
3. Combine with search terms for refined results

### **Shopping Cart**
1. Click "Add to Cart" on any product
2. Access cart via the cart button in header
3. Manage quantities with +/- buttons
4. Remove items or clear entire cart

### **Product Details**
1. Click "View Details" on any product card
2. Explore nutrition facts, ingredients, and categories
3. Add to cart directly from detail view

## 🔧 Configuration

### **Environment Variables**
No environment variables required - the app uses public APIs.

### **API Endpoints**
- **Product Search**: \`https://world.openfoodfacts.org/cgi/search.pl\`
- **Barcode Lookup**: \`https://world.openfoodfacts.org/api/v0/product/{barcode}.json\`
- **Categories**: \`https://world.openfoodfacts.org/categories.json\`

## 📱 Browser Support

### **Desktop Browsers**
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### **Mobile Browsers**
- Chrome Mobile 90+
- Safari iOS 14+
- Samsung Internet 15+


## 🎨 Customization

### **Styling**
- Modify \`tailwind.config.ts\` for theme customization
- Update component styles in individual component files
- Colors and spacing follow Tailwind CSS conventions


## 🔗 Links

- **API Reference**: [https://world.openfoodfacts.org/data](https://world.openfoodfacts.org/data)

---

Made with ❤️ by [Mridul Bhardwaj] (https://github.com/HeyMridul)
