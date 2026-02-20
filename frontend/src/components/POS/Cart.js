import React from 'react';

function Cart({ cart, onUpdateQuantity, onRemoveFromCart, onCheckout, onClearCart }) {
  const TAX_RATE = 0.08; // 8% tax

  const calculateSubtotal = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * TAX_RATE;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  if (cart.length === 0) {
    return (
      <div className="cart-container">
        <h3 className="cart-title">Shopping Cart</h3>
        <div className="cart-empty">
          <p>Your cart is empty</p>
          <p className="cart-empty-subtitle">Add items to get started</p>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h3 className="cart-title">Shopping Cart ({cart.length})</h3>

      <div className="cart-items">
        {cart.map((item) => (
          <div key={item.id} className="cart-item">
            <div className="cart-item-image-container">
              {item.image_url ? (
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="cart-item-image"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
              ) : (
                <div className="cart-item-placeholder"></div>
              )}
              <div className="cart-item-placeholder" style={{ display: 'none' }}></div>
            </div>

            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-price">${parseFloat(item.price).toFixed(2)}</div>
            </div>

            <div className="cart-item-actions">
              <button
                className="quantity-btn"
                onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
              >
                -
              </button>
              <span className="quantity-display">{item.quantity}</span>
              <button
                className="quantity-btn"
                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
              >
                +
              </button>
              <button
                className="remove-btn"
                onClick={() => onRemoveFromCart(item.id)}
                title="Remove item"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <div className="summary-row">
          <span>Subtotal:</span>
          <span>${calculateSubtotal().toFixed(2)}</span>
        </div>
        <div className="summary-row">
          <span>Tax (8%):</span>
          <span>${calculateTax().toFixed(2)}</span>
        </div>
        <div className="summary-row total">
          <span>Total:</span>
          <span>${calculateTotal().toFixed(2)}</span>
        </div>
      </div>

      <div className="cart-actions">
        <button className="checkout-btn" onClick={onCheckout}>
          Checkout - ${calculateTotal().toFixed(2)}
        </button>
        <button className="clear-cart-btn" onClick={onClearCart}>
          Clear Cart
        </button>
      </div>
    </div>
  );
}

export default Cart;
