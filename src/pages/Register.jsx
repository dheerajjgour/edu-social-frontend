import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import "../App.css";
import axios from 'axios';

const Register = () => {
  const { login } = useContext(UserContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'student',
    password: '',
    password_confirmation: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) newErrors.name = 'Name is required';
    else if (form.name.length > 50) newErrors.name = 'Max 50 characters allowed';

    if (!form.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Invalid email';

    if (!form.phone) newErrors.phone = 'Phone is required';
    else if (!/^\d{10}$/.test(form.phone)) newErrors.phone = 'Phone must be 10 digits';

    if (!form.password) newErrors.password = 'Password is required';
    else if (form.password.length < 6) newErrors.password = 'At least 6 characters required';

    if (form.password !== form.password_confirmation) {
      newErrors.password_confirmation = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    
    try {
      const response = await axios.post('https://education.jmbliss.com/api/register', {
        ...form,
        token: 'web-react'
      });

      // Auto-login after successful registration
if (response.data?.status === true && response.data?.user_id) {
  navigate(`/verify/${response.data.user_id}?type=${form.type}`);
}

else {
  alert(response.data.message || 'Unexpected registration response');
  navigate('/login');
}
    } catch (error) {
      if (error.response?.status === 422) {
        const apiErrors = error.response.data.errors || {};
        const formatted = {};
        for (let key in apiErrors) {
          formatted[key] = apiErrors[key][0];
        }
        setErrors(formatted);
      } else {
        alert(error.response?.data?.message || 'Registration failed. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="register">
      <div style={styles.container} className="container">
        <h2>Create Account</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            value={form.name}
          />
          {errors.name && <span style={styles.error}>{errors.name}</span>}

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            value={form.email}
          />
          {errors.email && <span style={styles.error}>{errors.email}</span>}

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            onChange={handleChange}
            value={form.phone}
          />
          {errors.phone && <span style={styles.error}>{errors.phone}</span>}

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            value={form.password}
          />
          {errors.password && <span style={styles.error}>{errors.password}</span>}

          <input
            type="password"
            name="password_confirmation"
            placeholder="Confirm Password"
            onChange={handleChange}
            value={form.password_confirmation}
          />
          {errors.password_confirmation && (
            <span style={styles.error}>{errors.password_confirmation}</span>
          )}

          <select name="type" onChange={handleChange} value={form.type}>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
            <option value="college">College</option>
          </select>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Registering...' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: { maxWidth: 400, margin: 'auto', padding: 20 },
  form: { display: 'flex', flexDirection: 'column', gap: '10px' },
  error: { color: 'red', fontSize: '0.8rem', marginTop: '-5px' }
};

export default Register;