import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.brand}>EduCircle</Link>
      <div style={styles.links}>
        {!user ? (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/register" style={styles.registerBtn}>Register</Link>
          </>
        ) : (
          <>
            <span style={styles.user}>Hi, {user.name}</span>
            <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    padding: '12px 24px',
    background: '#007bff',
    color: '#fff',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
  },
  brand: {
    fontSize: '22px',
    fontWeight: 'bold',
    color: '#fff',
    textDecoration: 'none',
  },
  links: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '16px',
    padding: '6px 12px',
    transition: 'background 0.2s ease',
    borderRadius: '4px',
  },
  registerBtn: {
    color: '#007bff',
    backgroundColor: '#fff',
    textDecoration: 'none',
    fontSize: '16px',
    padding: '6px 12px',
    borderRadius: '4px',
    transition: 'all 0.3s ease',
  },
  user: {
    marginRight: '10px',
    fontSize: '16px',
  },
  logoutBtn: {
    backgroundColor: '#fff',
    color: '#007bff',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
};

export default Navbar;
