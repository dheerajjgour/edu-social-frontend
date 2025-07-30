import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 

const Login = () => {
  const { login } = useContext(UserContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false); 

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const toastId = toast.loading('Logging in...');

    try {
      const response = await axios.post('https://education.jmbliss.com/api/login', {
        ...form,
        token: 'web-react',
      });

      const { user, token } = response.data;

      if (user && token) {
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
        login(user);
        toast.success('Login successful!', { id: toastId });
        navigate('/Dashboard');
      }
    } catch (error) {
      if (error.response?.status === 401) {
        setErrors({ general: 'Invalid email or password' });
        toast.error('Invalid email or password', { id: toastId });
      } else {
        setErrors({ general: 'Login failed. Please try again.' });
        toast.error('Login failed. Please try again.', { id: toastId });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-page">
      <Toaster position="top-right" />
      <div className="login-box">
        <h2 className="login-title">Welcome Back 👋</h2>

        {errors.general && <div className="error-box">{errors.general}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">
              Password
              <span className="forgot-link" onClick={() => navigate('/forgot-password')}>
                Forgot Password?
              </span>
            </label>
            <div className="password-wrapper" style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  cursor: 'pointer',
                  color: '#666',
                  
                }}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          <button type="submit" className="login-button" disabled={isSubmitting}>
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="register-text">
          Don’t have an account?{' '}
          <span onClick={() => navigate('/register')} className="register-link">
            Register here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
