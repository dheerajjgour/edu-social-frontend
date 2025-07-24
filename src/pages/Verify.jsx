import { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom'; 

import axios from 'axios';


const Verify = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
   const location = useLocation(); // ✅ add this
  const queryParams = new URLSearchParams(location.search); // ✅ parse query
  const userType = queryParams.get('type'); // ✅ get the role (type)
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleVerify = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://education.jmbliss.com/api/verify', {
        user_id: userId,
        verification_code: code
      });

     if (response.data.status === true) {
  alert('Email verified successfully!');

  if (userType === 'student') navigate('/studentDashboard');
  else if (userType === 'teacher') navigate('/teacherDashboard');
  else if (userType === 'college') navigate('/collegeDashboard');
  else navigate('/login');
}
 else {
        setError('Verification failed. Please check the code.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
      <h2>Email Verification</h2>
      <form onSubmit={handleVerify} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input
          type="text"
          placeholder="Enter verification code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        />
        {error && <span style={{ color: 'red' }}>{error}</span>}
        <button type="submit">Verify</button>
      </form>
      {success && <p style={{ color: 'green' }}>Verification successful!</p>}
    </div>
  );
};

export default Verify;
