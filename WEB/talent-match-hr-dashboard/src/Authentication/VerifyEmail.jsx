import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const VerifyEmail = () => {
    const [verificationCode, setVerificationCode] = useState('');
    const [message, setMessage] = useState({ text: '', type: '', show: false });
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [resendDisabled, setResendDisabled] = useState(false);
    const [resendTimer, setResendTimer] = useState(30);
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

    useEffect(() => {
        if (resendDisabled) {
            const timer = setInterval(() => {
                setResendTimer((prev) => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        setResendDisabled(false);
                        return 30;
                    }
                    return prev - 1;
                });
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [resendDisabled]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        // Basic validation
        if (verificationCode.length !== 6 || !/^\d+$/.test(verificationCode)) {
            showMessage('Please enter a valid 6-digit code', 'error');
            setIsLoading(false);
            return;
        }

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
                navigate('/');
            }, 1500);
            
        } catch (error) {
            console.error('Verification error:', error);
            showMessage(error.message || 'Network error. Please try again.', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    const handleResendCode = async (e) => {
        e.preventDefault();
        setResendDisabled(true);
        setResendTimer(30);
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
        setTimeout(() => {
            setMessage({ text: '', type: '', show: false });
        }, 5000);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-black to-blue-600 p-4">
            <div className="flex w-[1000px] min-h-[650px] bg-white bg-opacity-15 backdrop-blur-lg rounded-xl shadow-2xl border-2 border-white border-opacity-20 p-8">
                {/* Image Container */}
                <div className="w-[45%] flex justify-center items-center p-4 rounded-xl">
                    <img
                        src="poster-vector.jpg"
                        alt="We are hiring"
                        className="max-w-full h-auto rounded-lg object-cover"
                    />
                </div>

                {/* Form Container */}
                <div className="w-[55%] flex flex-col justify-center text-center pl-8">
                    <h2 className="text-3xl font-semibold text-white mb-4">
                        Verify Your Email
                    </h2>

                    <p className="text-white text-left mb-6">
                        We've sent a 6-digit code to <span className="font-medium text-yellow-400">{email}</span>.
                        Please enter it below to verify your email address.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Verification Code Field */}
                        <div className="text-left">
                            <label
                                htmlFor="verificationCode"
                                className="block text-sm font-medium text-white mb-2"
                            >
                                Verification Code:
                            </label>
                            <input
                                type="text"
                                id="verificationCode"
                                placeholder="Enter 6-digit code"
                                required
                                maxLength="6"
                                value={verificationCode}
                                onChange={(e) => setVerificationCode(e.target.value)}
                                className="w-full px-4 py-3 text-base bg-white bg-opacity-90 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-300 outline-none transition text-center tracking-widest"
                                style={{ letterSpacing: '5px' }}
                            />
                        </div>

                        {/* Verification Message */}
                        {message.show && (
                            <div
                                className={`p-3 rounded-lg ${
                                    message.type === 'error'
                                        ? 'bg-red-500 bg-opacity-20 border-l-4 border-red-500'
                                        : message.type === 'success'
                                        ? 'bg-green-500 bg-opacity-20 border-l-4 border-green-500'
                                        : 'bg-blue-500 bg-opacity-20 border-l-4 border-blue-500'
                                }`}
                            >
                                <p className="text-white text-sm">{message.text}</p>
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full py-4 px-4 rounded-lg text-white font-medium text-base transition ${
                                isLoading
                                    ? "bg-gradient-to-r from-blue-600 to-black"
                                    : "bg-gradient-to-r from-black to-blue-600 hover:from-blue-600 hover:to-black"
                            } relative`}
                        >
                            {isLoading ? (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-6 h-6 border-2 border-white border-opacity-30 rounded-full border-t-white animate-spin"></div>
                                </div>
                            ) : null}
                            <span className={isLoading ? "invisible" : ""}>
                                {isLoading ? "Verifying..." : "Verify Email"}
                            </span>
                        </button>

                        {/* Resend Code Button */}
                        <div className="text-center">
                            <button
                                type="button"
                                onClick={handleResendCode}
                                disabled={resendDisabled}
                                className={`text-yellow-400 font-medium hover:text-yellow-500 hover:underline ${
                                    resendDisabled ? "opacity-50 cursor-not-allowed" : ""
                                }`}
                            >
                                {resendDisabled ? `Resend code in ${resendTimer}s` : "Resend verification code"}
                            </button>
                        </div>
                    </form>

                    {/* Back to Signup Link */}
                    <p className="text-base text-white mt-8">
                        Didn't mean to create an account?{' '}
                        <Link
                            to="http://localhost:3000/"
                            className="text-yellow-400 font-medium hover:text-yellow-500 hover:underline"
                        >
                            Go back
                        </Link>
                    </p>
                </div>
            </div>-
        </div>
    );
};

export default VerifyEmail;