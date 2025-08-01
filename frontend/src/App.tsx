import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { Header } from './components/Header';
import { ProductList } from './components/ProductList';
import { Cart } from './components/Cart';
import { Orders } from './components/Orders';
import { ProjectOverview } from './components/ProjectOverview';
import { ProtectedRoute } from './components/ProtectedRoute';
import { useAuth } from './context/AuthContext';

function AppContent() {
  const [currentView, setCurrentView] = useState('products');
  const { state } = useAuth();

  // If user is not authenticated, don't render the main app content
  if (!state.isAuthenticated) {
    return null;
  }

  const renderCurrentView = () => {
    switch (currentView) {
      case 'overview':
        return <ProjectOverview />;
      case 'products':
        return <ProductList />;
      case 'cart':
        return <Cart />;
      case 'orders':
        return <Orders />;
      default:
        return <ProductList />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 to-secondary-50">
      <Header currentView={currentView} onViewChange={setCurrentView} />
      <main>
        {renderCurrentView()}
      </main>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <ProtectedRoute>
          <AppContent />
        </ProtectedRoute>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;