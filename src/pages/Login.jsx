import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';

const Login = () => {
  const { login } = useContext(UserContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const toastId = toast.loading("Logging in...");

    try {
      const response = await axios.post('https://education.jmbliss.com/api/login', {
        ...form,
        token: 'web-react'
      });

      const { user, token } = response.data;

      if (user && token) {
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
        login(user);
        toast.success("Login successful!", { id: toastId });
        navigate('/StudentDashboard');
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
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 flex items-center justify-center">
      <Toaster position="top-right" />
     <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 sm:p-8 md:p-10 lg:p-12">

        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login to Your Account</h2>

        {errors.general && (
          <div className="text-red-500 text-sm text-center mb-4">{errors.general}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              onChange={handleChange}
              value={form.email}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              onChange={handleChange}
              value={form.password}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="text-right mt-1">
              <span
                onClick={() => navigate('/forgot-password')}
                className="text-blue-600 text-sm hover:underline cursor-pointer"
              >
                Forgot Password?
              </span>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-200 text-white font-semibold py-2 rounded-md disabled:opacity-50"
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="text-sm text-center mt-5">
          Don&apos;t have an account?{' '}
          <span
            onClick={() => navigate('/register')}
            className="text-blue-600 hover:underline cursor-pointer font-medium"
          >
            Register here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
