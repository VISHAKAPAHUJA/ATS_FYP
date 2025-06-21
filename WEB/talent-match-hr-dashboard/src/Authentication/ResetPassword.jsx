import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const ResetPassword = () => {
    const [formData, setFormData] = useState({
        email: '',
        resetCode: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [message, setMessage] = useState({ text: '', type: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [passwordRules, setPasswordRules] = useState({
        length: false,
        uppercase: false,
        number: false,
        special: false,
    });
    const [showPasswordRules, setShowPasswordRules] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    // Get email from URL params if available
    useState(() => {
        const queryParams = new URLSearchParams(location.search);
        const urlEmail = queryParams.get('email');
        if (urlEmail) {
            setFormData(prev => ({ ...prev, email: decodeURIComponent(urlEmail) }));
        }
    }, [location]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Handle password validation display
        if (name === 'newPassword') {
            setShowPasswordRules(value.length > 0);
            setPasswordRules({
                length: value.length >= 8,
                uppercase: /[A-Z]/.test(value),
                number: /[0-9]/.test(value),
                special: /[^A-Za-z0-9]/.test(value),
            });
        }
    };

    const showMessage = (text, type) => {
        setMessage({ text, type });
        setTimeout(() => {
            setMessage({ text: '', type: '' });
        }, 5000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Validate inputs
        if (formData.resetCode.length !== 6) {
            showMessage('Please enter a valid 6-digit code', 'error');
            setIsLoading(false);
            return;
        }

        if (formData.newPassword !== formData.confirmPassword) {
            showMessage('Passwords do not match', 'error');
            setIsLoading(false);
            return;
        }

        if (!passwordRules.length || !passwordRules.uppercase || 
            !passwordRules.number || !passwordRules.special) {
            showMessage('Password does not meet requirements', 'error');
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/auth/verify-reset-code', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    email: formData.email, 
                    code: formData.resetCode, 
                    newPassword: formData.newPassword 
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Reset failed');
            }

            showMessage('Password reset successfully! Redirecting to login...', 'success');
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (error) {
            console.error('Reset error:', error);
            showMessage(error.message || 'Network error. Please try again.', 'error');
        } finally {
            setIsLoading(false);
        }
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
                        Reset Your Password
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Email Field */}
                        <div className="text-left">
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-white mb-2"
                            >
                                Email:
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Your email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-3 text-base bg-white bg-opacity-90 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-300 outline-none transition"
                            />
                        </div>

                        {/* Reset Code Field */}
                        <div className="text-left">
                            <label
                                htmlFor="resetCode"
                                className="block text-sm font-medium text-white mb-2"
                            >
                                6-Digit Reset Code:
                            </label>
                            <input
                                type="text"
                                id="resetCode"
                                name="resetCode"
                                placeholder="Enter 6-digit code"
                                required
                                maxLength="6"
                                value={formData.resetCode}
                                onChange={handleChange}
                                className="w-full px-4 py-3 text-base bg-white bg-opacity-90 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-300 outline-none transition text-center tracking-widest"
                                style={{ letterSpacing: '5px' }}
                            />
                        </div>

                        {/* New Password Field */}
                        <div className="text-left">
                            <label
                                htmlFor="newPassword"
                                className="block text-sm font-medium text-white mb-2"
                            >
                                New Password:
                            </label>
                            <input
                                type="password"
                                id="newPassword"
                                name="newPassword"
                                placeholder="New password"
                                required
                                value={formData.newPassword}
                                onChange={handleChange}
                                className="w-full px-4 py-3 text-base bg-white bg-opacity-90 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-300 outline-none transition"
                            />
                        </div>

                        {/* Password Rules */}
                        {showPasswordRules && (
                            <div className="text-left p-4 bg-white bg-opacity-20 rounded-lg border-l-4 border-blue-500 border-opacity-50 transition-all space-y-2">
                                <p className={`flex items-center text-sm mb-1 ${passwordRules.length ? "text-green-500" : "text-white"}`}>
                                    <span className="mr-2">{passwordRules.length ? "✓" : "✗"}</span>
                                    At least 8 characters
                                </p>
                                <p className={`flex items-center text-sm mb-1 ${passwordRules.uppercase ? "text-green-500" : "text-white"}`}>
                                    <span className="mr-2">{passwordRules.uppercase ? "✓" : "✗"}</span>
                                    At least one uppercase letter
                                </p>
                                <p className={`flex items-center text-sm mb-1 ${passwordRules.number ? "text-green-500" : "text-white"}`}>
                                    <span className="mr-2">{passwordRules.number ? "✓" : "✗"}</span>
                                    At least one number
                                </p>
                                <p className={`flex items-center text-sm ${passwordRules.special ? "text-green-500" : "text-white"}`}>
                                    <span className="mr-2">{passwordRules.special ? "✓" : "✗"}</span>
                                    At least one special character
                                </p>
                            </div>
                        )}

                        {/* Confirm Password Field */}
                        <div className="text-left">
                            <label
                                htmlFor="confirmPassword"
                                className="block text-sm font-medium text-white mb-2"
                            >
                                Confirm Password:
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                placeholder="Confirm new password"
                                required
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="w-full px-4 py-3 text-base bg-white bg-opacity-90 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-300 outline-none transition"
                            />
                        </div>

                        {/* Verification Message */}
                        {message.text && (
                            <div className={`p-3 rounded-lg ${
                                message.type === 'error' 
                                    ? 'bg-red-500 bg-opacity-20 border-l-4 border-red-500' 
                                    : 'bg-green-500 bg-opacity-20 border-l-4 border-green-500'
                            }`}>
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
                                {isLoading ? "Resetting Password..." : "Reset Password"}
                            </span>
                        </button>
                    </form>

                    {/* Back to Login Link */}
                    <p className="text-base text-white mt-8">
                        Remember your password?{' '}
                        <Link
                            to="/login"
                            className="text-yellow-400 font-medium hover:text-yellow-500 hover:underline"
                        >
                            Log in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;