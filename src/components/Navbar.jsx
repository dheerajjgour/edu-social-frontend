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
      <Link to="/" style={styles.brand}>EduSocial</Link>
      <div>
        {!user ? (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/register" style={styles.link}>Register</Link>
          </>
        ) : (
          <>
            <span style={styles.user}>Hi, {user.name}</span>
            <button onClick={handleLogout} style={styles.button}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    padding: '10px 20px',
    background: '#007bff',
    color: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  brand: { fontSize: '20px', fontWeight: 'bold', color: 'white', textDecoration: 'none' },
  link: { marginLeft: '15px', color: 'white', textDecoration: 'none' },
  user: { marginRight: '10px' },
  button: { background: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px' }
};

export default Navbar;
