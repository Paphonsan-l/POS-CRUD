import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ProtectedRoute({ children, adminOnly = false }) {
  const { isAuthenticated, isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
        <p>กำลังตรวจสอบสิทธิ์...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && !isAdmin()) {
    return (
      <div className="access-denied">
        <div className="access-denied-content">
          <h1>🚫 ไม่มีสิทธิ์เข้าถึง</h1>
          <p>คุณไม่มีสิทธิ์เข้าถึงหน้านี้ ต้องใช้สิทธิ์ผู้ดูแลระบบเท่านั้น</p>
          <button onClick={() => window.history.back()} className="btn btn-primary">
            ย้อนกลับ
          </button>
        </div>
      </div>
    );
  }

  return children;
}

export default ProtectedRoute;
