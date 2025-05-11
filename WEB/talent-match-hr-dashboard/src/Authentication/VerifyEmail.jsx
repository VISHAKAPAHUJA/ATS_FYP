import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css'; // Make sure to import your CSS

const VerifyEmail = () => {
    const [verificationCode, setVerificationCode] = useState('');
    const [message, setMessage] = useState({ text: '', type: '', show: false });
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Get email from localStorage or URL params
        const storedEmail = localStorage.getItem('tempEmail');
        const urlParams = new URLSearchParams(window.location.search);
        const urlEmail = urlParams.get('email');
        
        const userEmail = storedEmail || urlEmail;
        
        if (!userEmail) {
            navigate('/');
            return;
        }
        
        setEmail(userEmail);
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Basic validation
        if (verificationCode.length !== 6 || !/^\d+$/.test(verificationCode)) {
            showMessage('Please enter a valid 6-digit code', 'error');
            return;
        }

        showMessage('Verifying...', 'info');

        try {
            const response = await fetch('http://localhost:5000/api/auth/verify-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ email, code: verificationCode })
            });

            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'Verification failed');
            }

            showMessage('Email verified successfully! Redirecting...', 'success');
            localStorage.removeItem('tempEmail');
            setTimeout(() => {
                navigate('/login');
            }, 1500);
            
        } catch (error) {
            console.error('Verification error:', error);
            showMessage(error.message || 'Network error. Please try again.', 'error');
        }
    };

    const handleResendCode = async (e) => {
        e.preventDefault();
        showMessage('Sending new code...', 'info');

        try {
            const response = await fetch('http://localhost:5000/api/auth/resend-verification', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });

            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'Failed to resend code');
            }

            showMessage('New verification code sent!', 'success');
        } catch (error) {
            console.error('Resend error:', error);
            showMessage(error.message || 'Failed to resend code. Please try again.', 'error');
        }
    };

    const showMessage = (text, type) => {
        setMessage({ text, type, show: true });
    };

    return (
        <div className="container">
            <div className="verification-container" style={{
                maxWidth: '500px',
                margin: '2rem auto',
                padding: '2rem',
                background: 'white',
                borderRadius: '8px',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                textAlign: 'center'
            }}>
                <h2>Verify Your Email</h2>
                <p>We've sent a 6-digit code to your email address.</p>
                <p>Please enter it below:</p>
                
                <form id="verificationForm" onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        id="verificationCode" 
                        className="code-input" 
                        style={{
                            fontSize: '24px',
                            letterSpacing: '5px',
                            textAlign: 'center',
                            padding: '10px',
                            width: '200px',
                            margin: '20px auto'
                        }}
                        maxLength="6" 
                        placeholder="123456" 
                        required
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                    />
                    
                    {message.show && (
                        <div id="verification-message" style={{
                            margin: '15px 0',
                            padding: '10px',
                            borderRadius: '4px',
                            display: 'block'
                        }} className={`verification-message ${message.type}`}>
                            {message.text}
                        </div>
                    )}
                    
                    <button type="submit" className="create-account-btn">
                        Verify Email
                    </button>
                </form>
                
                <p className="resend-text">
                    Didn't receive the code?{' '}
                    <a href="#" id="resend-link" onClick={handleResendCode}>
                        Resend code
                    </a>
                </p>
            </div>
        </div>
    );
};

export default VerifyEmail;