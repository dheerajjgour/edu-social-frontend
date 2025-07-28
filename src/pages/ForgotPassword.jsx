import React, { useState } from 'react';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'; 

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [userId, setUserId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1); 
  const navigate = useNavigate();

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    toast.loading('Sending reset link...');
    try {
      const response = await axios.post('https://education.jmbliss.com/api/forgot-password', {
        email,
        token: 'web-react'
      });
      toast.dismiss();
      toast.success('Reset link sent!');
      setUserId(response.data?.user_id);
      setStep(2);
    } catch (error) {
      toast.dismiss();
      toast.error('Failed to send reset link.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCodeVerify = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    toast.loading('Verifying code...');
    try {
      await axios.post('https://education.jmbliss.com/api/verify-reset-code', {
        user_id: userId,
        reset_code: resetCode
      });
      toast.dismiss();
      toast.success('Code verified!');
      setStep(3);
    } catch (error) {
      toast.dismiss();
      toast.error('Invalid reset code.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    toast.loading('Resetting password...');
    try {
      await axios.post('https://education.jmbliss.com/api/reset-password', {
        user_id: userId,
        new_password: newPassword
      });

      toast.dismiss();
      toast.success('Password reset successfully!');
    
      setTimeout(() => navigate('/login'), 1500);
    } catch (error) {
      toast.dismiss();
      toast.error('Failed to reset password.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="forgot-container">
      <Toaster position="top-right" />
      <div className="forgot-box">
        <h2 className="forgot-title">
          {step === 1 && 'Forgot Password'}
          {step === 2 && 'Verify Reset Code'}
          {step === 3 && 'Set New Password'}
        </h2>

        {step === 1 && (
          <form onSubmit={handleEmailSubmit} className="forgot-form">
            <input
              type="email"
              placeholder="Enter your registered email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="forgot-input"
            />
            <button type="submit" disabled={isSubmitting} className="forgot-button blue">
              {isSubmitting ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleCodeVerify} className="forgot-form">
            <input
              type="text"
              placeholder="Enter the reset code"
              value={resetCode}
              onChange={(e) => setResetCode(e.target.value)}
              required
              className="forgot-input"
            />
            <button type="submit" disabled={isSubmitting} className="forgot-button green">
              {isSubmitting ? 'Verifying...' : 'Verify Code'}
            </button>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handlePasswordReset} className="forgot-form">
            <input
              type="password"
              placeholder="Enter your new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="forgot-input"
            />
            <button type="submit" disabled={isSubmitting} className="forgot-button purple">
              {isSubmitting ? 'Resetting...' : 'Reset Password'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
