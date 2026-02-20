import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { productAPI, categoryAPI } from '../../services/api';
import './ProductForm.css';

function ProductForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
    category_id: '',
    image_url: '',
    sku: '',
    is_active: true
  });

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCategories();
    if (isEditMode) {
      fetchProduct();
    }
  }, [id]);

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

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await productAPI.getById(id);
      if (response.data.success) {
        const product = response.data.data;
        setFormData({
          name: product.name || '',
          description: product.description || '',
          price: product.price || '',
          quantity: product.quantity || '',
          category_id: product.category_id || '',
          image_url: product.image_url || '',
          sku: product.sku || '',
          is_active: product.is_active !== undefined ? Boolean(product.is_active) : true
        });
      }
      setError(null);
    } catch (err) {
      setError('Failed to load product');
      console.error('Error fetching product:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!formData.name || !formData.price || formData.quantity === '') {
      setError('Please fill in all required fields');
      return;
    }

    try {
      setLoading(true);
      
      const dataToSend = {
        ...formData,
        price: parseFloat(formData.price),
        quantity: parseInt(formData.quantity),
        category_id: formData.category_id ? parseInt(formData.category_id) : null,
        is_active: formData.is_active ? 1 : 0
      };

      if (isEditMode) {
        await productAPI.update(id, dataToSend);
      } else {
        await productAPI.create(dataToSend);
      }

      navigate('/admin/products');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save product');
      console.error('Save error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEditMode) {
    return <div className="loading">Loading product...</div>;
  }

  return (
    <div className="product-form-container">
      <div className="page-header">
        <div>
          <h2 className="page-title">
            {isEditMode ? 'Edit Product' : 'Add New Product'}
          </h2>
          <p className="page-subtitle">
            {isEditMode ? 'Update product information' : 'Fill in the details to create a new product'}
          </p>
        </div>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => navigate('/admin/products')}
        >
          Back to Products
        </button>
      </div>

      {error && <div className="error">{error}</div>}

      <form onSubmit={handleSubmit} className="product-form">\n        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">Product Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter product name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="sku">SKU</label>
            <input
              type="text"
              id="sku"
              name="sku"
              value={formData.sku}
              onChange={handleChange}
              className="form-control"
              placeholder="e.g., PROD-001"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="form-control"
            rows="4"
            placeholder="Enter product description"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="price">Price ($) *</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="form-control"
              step="0.01"
              min="0"
              placeholder="0.00"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="quantity">Quantity in Stock *</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="form-control"
              min="0"
              placeholder="0"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="category_id">Category</label>
            <select
              id="category_id"
              name="category_id"
              value={formData.category_id}
              onChange={handleChange}
              className="form-control"
            >
              <option value="">Select Category</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="image_url">Image URL</label>
          <input
            type="url"
            id="image_url"
            name="image_url"
            value={formData.image_url}
            onChange={handleChange}
            className="form-control"
            placeholder="https://example.com/image.jpg"
          />
          {formData.image_url && (
            <div className="image-preview">
              <img src={formData.image_url} alt="Preview" />
            </div>
          )}
        </div>

        <div className="form-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="is_active"
              checked={formData.is_active}
              onChange={handleChange}
            />
            <span>Active (Product is available for sale)</span>
          </label>
        </div>

        <div className="form-actions">
          <button
            type="submit"
            className="btn btn-success"
            disabled={loading}
          >
            {loading ? 'Saving...' : (isEditMode ? 'Update Product' : 'Create Product')}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate('/admin/products')}
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProductForm;
