import { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import "../App.css"
import axios from 'axios';

const Register = () => {
  const { register } = useContext(UserContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'student',
    password: ''
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (form.name.length > 50) {
      newErrors.name = 'Name should not exceed 50 characters';
    }

    if (!form.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Invalid email address';
    }

    if (!form.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(form.phone)) {
      newErrors.phone = 'Phone number must be 10 digits';
    }

    if (!form.password) {
      newErrors.password = 'Password is required';
    } else if (form.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!form.type) {
      newErrors.type = 'Role is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' }); // clear error on change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const response = await axios.post('https://education.jmbliss.com/api/register', {
        ...form,
        token: 'web-react'
      });

      register(response.data.user);
      alert('Registered successfully!');
      navigate('/login');
    } catch (error) {
      console.error('Registration error:', error.response?.data || error.message);
      alert('Registration failed. Try again.');
    }
  };

  return (
    <div className='register'>
      <div style={styles.container} className='container'>
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

          <select name="type" onChange={handleChange} value={form.type}>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
            <option value="college">College</option>
          </select>
          {errors.type && <span style={styles.error}>{errors.type}</span>}

          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: { maxWidth: 400, margin: 'auto', padding: 20 },
  form: { display: 'flex', flexDirection: 'column', gap: '10px' },
  error: { color: 'red', fontSize: '0.8rem', marginBottom: '-5px' }
};

export default Register;
