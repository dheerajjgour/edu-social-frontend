import { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { login } = useContext(UserContext);
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const stored = JSON.parse(localStorage.getItem('edu-user'));
if (stored && stored.email === form.email && stored.password === form.password) {
  login(stored);

  if (stored.role === 'college') navigate('/dashboard');
  else if (stored.role === 'teacher') navigate('/dashboard');
  else navigate('/dashboard');
}

  };

  return (
    <div style={styles.container}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

const styles = {
  container: { maxWidth: 400, margin: 'auto', padding: 20 },
  form: { display: 'flex', flexDirection: 'column', gap: '10px' },
};

export default Login;
