import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

// POS Components
import POS from './components/POS/POS';

// Admin Components
import Dashboard from './components/Admin/Dashboard';
import ProductList from './components/Admin/ProductList';
import ProductForm from './components/Admin/ProductForm';

function App() {
  const [currentView, setCurrentView] = useState('pos');

  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="navbar-brand">
            <h1>POS System</h1>
          </div>
          <div className="navbar-menu">
            <Link to="/" className={currentView === 'pos' ? 'active' : ''} onClick={() => setCurrentView('pos')}>
              Storefront
            </Link>
            <Link to="/admin" className={currentView === 'admin' ? 'active' : ''} onClick={() => setCurrentView('admin')}>
              Dashboard
            </Link>
            <Link to="/admin/products" className={currentView === 'products' ? 'active' : ''} onClick={() => setCurrentView('products')}>
              Products
            </Link>
          </div>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<POS />} />
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/products" element={<ProductList />} />
            <Route path="/admin/products/new" element={<ProductForm />} />
            <Route path="/admin/products/edit/:id" element={<ProductForm />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
