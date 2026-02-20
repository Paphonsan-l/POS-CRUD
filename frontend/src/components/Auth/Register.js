import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Auth.css';

function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    full_name: ''
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

    // Validation
    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('กรุณากรอกข้อมูลให้ครบถ้วน');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร');
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('รหัสผ่านไม่ตรงกัน');
      setLoading(false);
      return;
    }

    const result = await register({
      username: formData.username,
      email: formData.email,
      password: formData.password,
      full_name: formData.full_name
    });
    
    if (result.success) {
      navigate('/');
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>🛒 POS System</h1>
          <h2>ลงทะเบียน</h2>
          <p>สร้างบัญชีใหม่เพื่อเริ่มใช้งานระบบ</p>
        </div>

        {error && <div className="error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="username">ชื่อผู้ใช้ *</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="กรอกชื่อผู้ใช้"
              className="form-control"
              autoComplete="username"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">อีเมล *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="กรอกอีเมล"
              className="form-control"
              autoComplete="email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="full_name">ชื่อ-นามสกุล</label>
            <input
              type="text"
              id="full_name"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              placeholder="กรอกชื่อ-นามสกุล"
              className="form-control"
              autoComplete="name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">รหัสผ่าน *</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="กรอกรหัสผ่าน (อย่างน้อย 6 ตัวอักษร)"
              className="form-control"
              autoComplete="new-password"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">ยืนยันรหัสผ่าน *</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="กรอกรหัสผ่านอีกครั้ง"
              className="form-control"
              autoComplete="new-password"
              required
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary btn-block"
            disabled={loading}
          >
            {loading ? 'กำลังลงทะเบียน...' : 'ลงทะเบียน'}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            มีบัญชีอยู่แล้ว? <Link to="/login">เข้าสู่ระบบที่นี่</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
