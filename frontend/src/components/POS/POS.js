import React, { useState, useEffect } from 'react';
import ProductGrid from './ProductGrid';
import Cart from './Cart';
import './POS.css';
import { productAPI, transactionAPI } from '../../services/api';

function POS() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [checkoutMessage, setCheckoutMessage] = useState(null);

  useEffect(() => {
    fetchProducts();
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
      setError('Failed to load products. Please try again.');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      if (existingItem.quantity >= product.quantity) {
        alert(`Only ${product.quantity} items available in stock!`);
        return;
      }
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    const product = products.find(p => p.id === productId);
    
    if (newQuantity > product.quantity) {
      alert(`Only ${product.quantity} items available in stock!`);
      return;
    }

    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart(cart.map(item =>
      item.id === productId
        ? { ...item, quantity: newQuantity }
        : item
    ));
  };

  const handleCheckout = async () => {
    if (cart.length === 0) {
      alert('Cart is empty!');
      return;
    }

    try {
      const items = cart.map(item => ({
        product_id: item.id,
        quantity: item.quantity
      }));

      const response = await transactionAPI.checkout({ items, payment_method: 'cash' });
      
      if (response.data.success) {
        setCheckoutMessage(`✅ Transaction completed! Total: $${response.data.data.total.toFixed(2)}`);
        setCart([]);
        fetchProducts(); // Refresh product quantities
        
        setTimeout(() => setCheckoutMessage(null), 5000);
      }
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Checkout failed. Please try again.';
      setError(errorMsg);
      console.error('Checkout error:', err);
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  if (loading) {
    return <div className="loading">Loading products...</div>;
  }

  return (
    <div className="pos-container">
      <div className="page-header">
        <div>
          <h2 className="page-title">Point of Sale</h2>
          <p className="page-subtitle">Select products and complete transactions</p>
        </div>
      </div>
      
      {error && <div className="error">{error}</div>}
      {checkoutMessage && <div className="success">{checkoutMessage}</div>}

      <div className="pos-layout">
        <div className="products-section">
          <h3 className="section-title">Available Products</h3>
          <ProductGrid products={products} onAddToCart={addToCart} />
        </div>

        <div className="cart-section">
          <Cart
            cart={cart}
            onUpdateQuantity={updateQuantity}
            onRemoveFromCart={removeFromCart}
            onCheckout={handleCheckout}
            onClearCart={clearCart}
          />
        </div>
      </div>
    </div>
  );
}

export default POS;
