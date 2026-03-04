import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Auth.css';

function AdminLogin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { email, password } = formData;

    // Simple front-end admin credentials. Change these as needed.
    const ADMIN_EMAIL = 'admin@svcompany.in';
    const ADMIN_PASSWORD = 'admin123';

    if (!email || !password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      localStorage.setItem(
        'admin',
        JSON.stringify({ email: ADMIN_EMAIL, role: 'admin' })
      );
      localStorage.setItem('isAdmin', 'true');
      navigate('/admin');
    } else {
      setError('Invalid admin credentials');
    }

    setLoading(false);
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <div className="auth-logo">
            <img
              src="/images/logo.png"
              alt="Sri Venkateswara Company Logo"
              className="auth-logo-image"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>
          <h1>Admin Login</h1>
          <p>Sign in to access the admin dashboard.</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Admin Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="admin email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter admin password"
              required
            />
          </div>

          <button type="submit" className="btn-auth" disabled={loading}>
            {loading ? 'Logging in...' : 'Login as Admin'}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Back to{' '}
            <Link to="/login">
              User Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;


