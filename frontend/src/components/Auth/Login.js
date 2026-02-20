import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Auth.css';

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!formData.username || !formData.password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    const result = await login(formData.username, formData.password);
    
    if (result.success) {
      // Redirect based on user role
      if (result.user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  // Demo credentials helper
  const fillDemoCredentials = (role) => {
    if (role === 'admin') {
      setFormData({ username: 'admin', password: 'password123' });
    } else {
      setFormData({ username: 'cashier1', password: 'password123' });
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>🛒 POS System</h1>
          <h2>เข้าสู่ระบบ</h2>
          <p>ยินดีต้อนรับกลับมา! กรุณาเข้าสู่ระบบเพื่อดำเนินการต่อ</p>
        </div>

        {error && <div className="error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="username">ชื่อผู้ใช้หรืออีเมล</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="กรอกชื่อผู้ใช้หรืออีเมล"
              className="form-control"
              autoComplete="username"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">รหัสผ่าน</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="กรอกรหัสผ่าน"
              className="form-control"
              autoComplete="current-password"
              required
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary btn-block"
            disabled={loading}
          >
            {loading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
          </button>
        </form>

        <div className="demo-credentials">
          <p className="demo-title">🔑 บัญชีทดสอบ (รหัสผ่าน: password123):</p>
          <div className="demo-buttons">
            <button 
              onClick={() => fillDemoCredentials('admin')}
              className="btn btn-demo"
            >
              👨‍💼 Admin Demo
            </button>
            <button 
              onClick={() => fillDemoCredentials('user')}
              className="btn btn-demo"
            >
              👤 User Demo
            </button>
          </div>
        </div>

        <div className="auth-footer">
          <p>
            ยังไม่มีบัญชี? <Link to="/register">ลงทะเบียนที่นี่</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
