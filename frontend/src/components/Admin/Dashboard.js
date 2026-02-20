import React, { useState, useEffect } from 'react';
import { transactionAPI, productAPI } from '../../services/api';
import './Dashboard.css';

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch sales stats
      const statsResponse = await transactionAPI.getStats();
      if (statsResponse.data.success) {
        setStats(statsResponse.data.data);
      }

      // Fetch recent transactions
      const transactionsResponse = await transactionAPI.getAll({ limit: 10 });
      if (transactionsResponse.data.success) {
        setRecentTransactions(transactionsResponse.data.data);
      }

      setError(null);
    } catch (err) {
      setError('Failed to load dashboard data');
      console.error('Dashboard error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  return (
    <div className="dashboard-container">
      <div className="page-header">
        <div>
          <h2 className="page-title">Dashboard</h2>
          <p className="page-subtitle">Overview of your store performance</p>
        </div>
      </div>

      {error && <div className="error">{error}</div>}

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <h3 className="stat-label">Today's Revenue</h3>
          <p className="stat-value">
            ${stats?.today?.total_revenue ? parseFloat(stats.today.total_revenue).toFixed(2) : '0.00'}
          </p>
          <p className="stat-description">Total sales today</p>
        </div>

        <div className="stat-card">
          <h3 className="stat-label">Today's Transactions</h3>
          <p className="stat-value">{stats?.today?.total_transactions || 0}</p>
          <p className="stat-description">Completed orders</p>
        </div>

        <div className="stat-card">
          <h3 className="stat-label">Average Transaction</h3>
          <p className="stat-value">
            ${stats?.today?.average_transaction ? parseFloat(stats.today.average_transaction).toFixed(2) : '0.00'}
          </p>
          <p className="stat-description">Per order</p>
        </div>
      </div>

      {/* Top Products */}
      {stats?.topProducts && stats.topProducts.length > 0 && (
        <div className="section">
          <h3 className="section-title">Top Selling Products</h3>
          <p className="section-subtitle">Last 7 days</p>
          <div className="top-products-grid">
            {stats.topProducts.map((product, index) => (
              <div key={index} className="product-card">
                <div className="product-card-image">
                  {product.image_url ? (
                    <img src={product.image_url} alt={product.name} />
                  ) : (
                    <div className="image-placeholder"></div>
                  )}
                </div>
                <div className="product-card-content">
                  <h4 className="product-card-title">{product.name}</h4>
                  <p className="product-card-meta">Sold: {product.total_sold} units</p>
                  <p className="product-card-price">${parseFloat(product.revenue).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Transactions */}
      <div className="section">
        <h3 className="section-title">Recent Transactions</h3>
        <p className="section-subtitle">Latest 10 orders</p>
        {recentTransactions.length === 0 ? (
          <div className="empty-state">
            <p>No transactions yet</p>
          </div>
        ) : (
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Date</th>
                  <th>Subtotal</th>
                  <th>Tax</th>
                  <th>Total</th>
                  <th>Payment</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentTransactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td className="cell-mono">#{transaction.id}</td>
                    <td>{new Date(transaction.transaction_date).toLocaleString()}</td>
                    <td>${parseFloat(transaction.subtotal).toFixed(2)}</td>
                    <td>${parseFloat(transaction.tax).toFixed(2)}</td>
                    <td className="cell-bold">${parseFloat(transaction.total).toFixed(2)}</td>
                    <td className="cell-capitalize">{transaction.payment_method}</td>
                    <td>
                      <span className={`status-badge status-${transaction.status}`}>
                        {transaction.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
