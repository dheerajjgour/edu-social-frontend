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
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 flex items-center justify-center">
      <Toaster position="top-right" />
      <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-10 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          {step === 1 && 'Forgot Password'}
          {step === 2 && 'Verify Reset Code'}
          {step === 3 && 'Set New Password'}
        </h2>

        {step === 1 && (
          <form onSubmit={handleEmailSubmit} className="space-y-5">
            <input
              type="email"
              placeholder="Enter your registered email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md disabled:opacity-50"
            >
              {isSubmitting ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleCodeVerify} className="space-y-5">
            <input
              type="text"
              placeholder="Enter the reset code"
              value={resetCode}
              onChange={(e) => setResetCode(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md disabled:opacity-50"
            >
              {isSubmitting ? 'Verifying...' : 'Verify Code'}
            </button>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handlePasswordReset} className="space-y-5">
            <input
              type="password"
              placeholder="Enter your new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md disabled:opacity-50"
            >
              {isSubmitting ? 'Resetting...' : 'Reset Password'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
