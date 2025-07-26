import React, { useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import StudentDashboard from '../components/StudentDashboard';
import TeacherDashboard from '../components/TeacherDashboard';
import CollegeDashboard from '../components/CollegeDashboard';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();


  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  // 🚪 Handle logout function
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // If user is still loading
  if (!user) return null;

  
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2>Welcome, {user.name}</h2>
        <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
      </div>
      <div style={styles.roleLabel}>You are logged in as: <strong>{user.role}</strong></div>
      
      <div style={styles.dashboardArea}>
        {user.role === 'student' && <StudentDashboard/>}
        {user.role === 'teacher' && <TeacherDashboard />}
        {user.role === 'college' && <CollegeDashboard />}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial',
    backgroundColor: '#f9f9f9',
    minHeight: '100vh',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoutBtn: {
    padding: '8px 16px',
    backgroundColor: '#e74c3c',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  roleLabel: {
    marginTop: '10px',
    fontSize: '16px',
    color: '#555',
  },
  dashboardArea: {
    marginTop: '30px',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  }
};

export default Dashboard;
