document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.querySelector('.login-form');
    const forgotPasswordLink = document.getElementById('forgotPasswordLink');

    // Modern notification function
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => notification.classList.add('show'), 10);
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 5000);
        
        // Click to dismiss
        notification.addEventListener('click', () => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        });
    }

    // Display any redirect messages (e.g., from verification)
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('verified')) {
        showNotification('Email verified successfully! Please log in.', 'success');
    }

    if (loginForm) {
        loginForm.addEventListener('submit', async function (event) {
            event.preventDefault();

            const email = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value.trim();

            // Clear previous errors
            document.querySelectorAll('.error-message').forEach(el => el.remove());

            if (!email || !password) {
                showError('Please fill in all fields.');
                return;
            }

            try {
                // Show loading state
                const submitBtn = loginForm.querySelector('button[type="submit"]');
                submitBtn.disabled = true;
                submitBtn.textContent = "Logging in...";

                const response = await fetch('http://localhost:5000/api/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password }),
                });

                const data = await response.json();
                
                if (!response.ok) {
                    throw new Error(data.message || 'Login failed');
                }

                // Store token in localStorage
                if (data.token) {
                    localStorage.setItem('authToken', data.token);
                }

                // Redirect based on role
                if (data.redirectUrl) {
                    window.location.href = data.redirectUrl;
                } else {
                    window.location.href = data.role === 'HRManager' 
                        ? "http://localhost:3000/" 
                        : "../home/homee.html";
                }

            } catch (error) {
                console.error('Login error:', error);
                showError(error.message || 'Something went wrong. Please try again.');
            } finally {
                // Reset button state
                const submitBtn = loginForm.querySelector('button[type="submit"]');
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = "Login";
                }
            }
        });
    }

    // Updated Forgot Password Logic
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', async (e) => {
            e.preventDefault();
            const email = document.getElementById('username')?.value.trim() || 
                         prompt("Enter your email:");
            
            if (!email) return;

            try {
                forgotPasswordLink.disabled = true;
                forgotPasswordLink.textContent = "Sending code...";
                
                const response = await fetch('http://localhost:5000/api/auth/request-reset-code', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email })
                });

                const data = await response.json();
                
                if (!response.ok) {
                    throw new Error(data.message || "Failed to send reset code");
                }

                if (data.success) {
                    showNotification("Check your email for the 6-digit reset code", 'success');
                    setTimeout(() => {
                        window.location.href = `reset-password.html?email=${encodeURIComponent(email)}`;
                    }, 1500);
                } else {
                    throw new Error(data.message || "Error sending reset code");
                }
            } catch (error) {
                console.error("Password reset error:", error);
                showNotification(error.message || "Network error. Please try again.", 'error');
            } finally {
                forgotPasswordLink.disabled = false;
                forgotPasswordLink.textContent = "Forgot Password?";
            }
        });
    }

    function showError(message) {
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.style.color = '#dc3545';
        errorElement.style.marginTop = '10px';
        errorElement.textContent = message;
        
        const submitBtn = loginForm.querySelector('button[type="submit"]');
        if (submitBtn) {
            submitBtn.insertAdjacentElement('beforebegin', errorElement);
        } else {
            loginForm.appendChild(errorElement);
        }
    }
});