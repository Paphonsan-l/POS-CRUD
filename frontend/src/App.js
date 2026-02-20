import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import './App.css';

// Context
import { AuthProvider, useAuth } from './context/AuthContext';

// Auth Components
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ProtectedRoute from './components/ProtectedRoute';

// POS Components
import POS from './components/POS/POS';

// Admin Components
import Dashboard from './components/Admin/Dashboard';
import ProductList from './components/Admin/ProductList';
import ProductForm from './components/Admin/ProductForm';

function AppContent() {
  const { isAuthenticated, user, logout, isAdmin } = useAuth();

  return (
    <div className="App">
      {/* Show navbar only if authenticated */}
      {isAuthenticated && (
        <nav className="navbar">
          <div className="navbar-brand">
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              <h1>POS System</h1>
            </Link>
          </div>
          <div className="navbar-menu">
            <Link to="/" className="nav-link">
              Storefront
            </Link>
            {isAdmin() && (
              <>
                <Link to="/admin" className="nav-link">
                  Dashboard
                </Link>
                <Link to="/admin/products" className="nav-link">
                  Products
                </Link>
              </>
            )}
            <div className="navbar-user">
              <span className="user-info">
                {user?.full_name || user?.username}
                {user?.role === 'admin' && <span className="admin-badge">Admin</span>}
              </span>
              <button onClick={logout} className="btn btn-logout">
                Logout
              </button>
            </div>
          </div>
        </nav>
      )}

      <main className={isAuthenticated ? "main-content" : "main-content-full"}>
        <Routes>
          {/* Public routes */}
          <Route 
            path="/login" 
            element={isAuthenticated ? <Navigate to="/" replace /> : <Login />} 
          />
          <Route 
            path="/register" 
            element={isAuthenticated ? <Navigate to="/" replace /> : <Register />} 
          />

          {/* Protected routes - require authentication */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <POS />
              </ProtectedRoute>
            }
          />

          {/* Admin only routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute adminOnly={true}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/products"
            element={
              <ProtectedRoute adminOnly={true}>
                <ProductList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/products/new"
            element={
              <ProtectedRoute adminOnly={true}>
                <ProductForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/products/edit/:id"
            element={
              <ProtectedRoute adminOnly={true}>
                <ProductForm />
              </ProtectedRoute>
            }
          />

          {/* Redirect any unknown route */}
          <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} replace />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
