import { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const { register } = useContext(UserContext);
  const [form, setForm] = useState({
  name: '',
  email: '',
  password: '',
  role: 'student'  // default role
});

  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    register(form);
    navigate('/login');
  };

  return (
    <div style={styles.container}>
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input type="text" name="name" placeholder="Full Name" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <select name="role" onChange={handleChange} required>
  <option value="student">Student</option>
  <option value="teacher">Teacher</option>
  <option value="college">College</option>
</select>

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

const styles = {
  container: { maxWidth: 400, margin: 'auto', padding: 20 },
  form: { display: 'flex', flexDirection: 'column', gap: '10px' },
};

export default Register;
