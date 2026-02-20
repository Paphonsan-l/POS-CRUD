import React from 'react';

function ProductGrid({ products, onAddToCart }) {
  if (products.length === 0) {
    return (
      <div className="product-grid-empty">
        <p>No products available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <div className="product-image-container">
            {product.image_url ? (
              <img
                src={product.image_url}
                alt={product.name}
                className="product-image"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
            ) : (
              <div className="product-placeholder"></div>
            )}
            <div className="product-placeholder" style={{ display: 'none' }}></div>
          </div>

          <div className="product-info">
            <h4 className="product-name" title={product.name}>
              {product.name}
            </h4>
            {product.category_name && (
              <p className="product-category">{product.category_name}</p>
            )}
            <p className="product-price">${parseFloat(product.price).toFixed(2)}</p>
            <p className={`product-stock ${product.quantity < 10 ? 'low-stock' : ''}`}>
              {product.quantity > 0 ? `${product.quantity} in stock` : 'Out of stock'}
            </p>
            <button
              className="add-to-cart-btn"
              onClick={() => onAddToCart(product)}
              disabled={product.quantity === 0}
            >
              {product.quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductGrid;
