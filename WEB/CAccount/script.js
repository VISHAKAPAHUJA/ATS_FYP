document.addEventListener("DOMContentLoaded", function() {
    const signupForm = document.getElementById("signupForm");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirm-password");
    const verificationMessage = document.getElementById("verification-message");
    const submitBtn = document.getElementById("submit-btn");

    // Initialize password rules as hidden
    document.getElementById("password-rules").style.display = "none";

    // Professional password visibility toggle
    window.togglePasswordVisibility = function(fieldId, toggleBtn) {
        const field = document.getElementById(fieldId);
        const icon = toggleBtn.querySelector('.material-icons');
        
        if (field.type === "password") {
            field.type = "text";
            icon.textContent = "visibility";
            toggleBtn.setAttribute('aria-label', 'Hide password');
        } else {
            field.type = "password";
            icon.textContent = "visibility_off";
            toggleBtn.setAttribute('aria-label', 'Show password');
        }
        
        // Add visual feedback
        toggleBtn.classList.add('active');
        setTimeout(() => toggleBtn.classList.remove('active'), 200);
    };

    // Real-time password validation
    passwordInput.addEventListener("input", function() {
        const password = passwordInput.value;
        const rulesContainer = document.getElementById("password-rules");
        
        rulesContainer.style.display = password.length > 0 ? "block" : "none";

        // Update individual rules
        updateRuleStatus("length-rule", password.length >= 8);
        updateRuleStatus("uppercase-rule", /[A-Z]/.test(password));
        updateRuleStatus("number-rule", /[0-9]/.test(password));
        updateRuleStatus("special-rule", /[^A-Za-z0-9]/.test(password));
    });

    // Update the updateRuleStatus function
function updateRuleStatus(ruleId, isValid) {
    const ruleElement = document.getElementById(ruleId);
    
    if (isValid) {
        ruleElement.style.display = "none"; // Hide when valid
    } else {
        ruleElement.style.display = "flex"; // Show when invalid
        ruleElement.classList.add('invalid');
        ruleElement.classList.remove('valid');
        ruleElement.querySelector('.status-icon').textContent = '✗';
    }
}

// Update the password input event listener
passwordInput.addEventListener("input", function() {
    const password = passwordInput.value;
    const rulesContainer = document.getElementById("password-rules");
    
    // Show container only if there's input and not all rules are met
    const allRulesMet = password.length >= 8 && 
                       /[A-Z]/.test(password) && 
                       /[0-9]/.test(password) && 
                       /[^A-Za-z0-9]/.test(password);
    
    rulesContainer.style.display = password.length > 0 && !allRulesMet ? "block" : "none";

    // Update individual rules
    updateRuleStatus("length-rule", password.length >= 8);
    updateRuleStatus("uppercase-rule", /[A-Z]/.test(password));
    updateRuleStatus("number-rule", /[0-9]/.test(password));
    updateRuleStatus("special-rule", /[^A-Za-z0-9]/.test(password));
});

    // Form submission
    signupForm.addEventListener("submit", async function(e) {
        e.preventDefault();
        
        const email = document.getElementById("email").value;
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        // Basic validation
        if (!email || !password || !confirmPassword) {
            showMessage("Please fill in all fields", "error");
            return;
        }

        if (password !== confirmPassword) {
            showMessage("Passwords do not match", "error");
            return;
        }

        // Password strength validation
        if (password.length < 8 || !/[A-Z]/.test(password) || 
            !/[0-9]/.test(password) || !/[^A-Za-z0-9]/.test(password)) {
            showMessage("Password does not meet requirements", "error");
            return;
        }

        // Show loading state
        submitBtn.disabled = true;
        submitBtn.classList.add("loading");
        document.getElementById("btn-text").textContent = "Creating Account...";

        try {
            const response = await fetch("http://localhost:5000/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });
            
            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('tempEmail', email);
                window.location.href = `verify-email.html?email=${encodeURIComponent(email)}`;
            } else {
                showMessage(data.message || "Failed to create account", "error");
            }
        } catch (error) {
            console.error("Signup error:", error);
            showMessage("An error occurred. Please try again.", "error");
        } finally {
            submitBtn.disabled = false;
            submitBtn.classList.remove("loading");
            document.getElementById("btn-text").textContent = "Create your account";
        }
    });

    function showMessage(message, type) {
        verificationMessage.textContent = message;
        verificationMessage.className = `verification-message ${type}`;
        verificationMessage.style.display = "block";
        
        setTimeout(() => {
            verificationMessage.style.display = "none";
        }, 5000);
    }
});