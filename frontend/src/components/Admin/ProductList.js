import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productAPI, categoryAPI } from '../../services/api';
import './ProductList.css';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productAPI.getAll();
      if (response.data.success) {
        setProducts(response.data.data);
      }
      setError(null);
    } catch (err) {
      setError('Failed to load products');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await categoryAPI.getAll();
      if (response.data.success) {
        setCategories(response.data.data);
      }
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  const handleDelete = async (productId, productName) => {
    if (!window.confirm(`Are you sure you want to delete "${productName}"?`)) {
      return;
    }

    try {
      const response = await productAPI.delete(productId);
      if (response.data.success) {
        setSuccessMessage(`Product "${productName}" deleted successfully`);
        fetchProducts();
        setTimeout(() => setSuccessMessage(null), 3000);
      }
    } catch (err) {
      setError('Failed to delete product');
      console.error('Delete error:', err);
    }
  };

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(p => p.category_id === parseInt(selectedCategory));

  if (loading) {
    return <div className="loading">Loading products...</div>;
  }

  return (
    <div className="product-list-container">
      <div className="page-header">
        <div>
          <h2 className="page-title">Product Management</h2>
          <p className="page-subtitle">Manage your inventory and products</p>
        </div>
        <Link to="/admin/products/new" className="btn btn-primary">
          Add New Product
        </Link>
      </div>

      {error && <div className="error">{error}</div>}
      {successMessage && <div className="success">{successMessage}</div>}

      {/* Filter */}
      <div className="filter-section">
        <label htmlFor="category-filter">Filter by Category</label>
        <select
          id="category-filter"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="form-control"
        >
          <option value="all">All Categories</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
      </div>

      {/* Products Table */}
      {filteredProducts.length === 0 ? (
        <div className="empty-state">
          <p>No products found</p>
          <Link to="/admin/products/new" className="btn btn-primary">
            Add Your First Product
          </Link>
        </div>
      ) : (
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>SKU</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td>
                    <div className="product-thumbnail">
                      {product.image_url ? (
                        <img
                          src={product.image_url}
                          alt={product.name}
                        />
                      ) : (
                        <div className="thumbnail-placeholder"></div>
                      )}
                    </div>
                  </td>
                  <td className="cell-mono">{product.sku || '-'}</td>
                  <td className="cell-bold">{product.name}</td>
                  <td>{product.category_name || 'Uncategorized'}</td>
                  <td className="cell-price">${parseFloat(product.price).toFixed(2)}</td>
                  <td>
                    <span className={`stock-badge ${product.quantity < 10 ? 'low-stock' : ''}`}>
                      {product.quantity}
                    </span>
                  </td>
                  <td>
                    <span className={`status-badge ${product.is_active ? 'active' : 'inactive'}`}>
                      {product.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <Link
                        to={`/admin/products/edit/${product.id}`}
                        className="btn-icon btn-edit"
                        title="Edit"
                      >
                        Edit
                      </Link>
                      <button
                        className="btn-icon btn-delete"
                        onClick={() => handleDelete(product.id, product.name)}
                        title="Delete"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ProductList;
