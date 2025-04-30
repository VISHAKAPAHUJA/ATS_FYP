document.addEventListener("DOMContentLoaded", function() {
    const email = localStorage.getItem("tempEmail");
    const resendBtn = document.getElementById("resend-btn");
    const resendStatus = document.getElementById("resend-status");

    // Display the email being verified
    if (email) {
        document.getElementById("user-email").textContent = email;
    } else {
        // No email found, redirect to signup
        window.location.href = "index.html";
    }

    // Resend verification email
    resendBtn.addEventListener("click", async function() {
        if (!email) {
            showResendStatus("Email not found. Please sign up again.", "error");
            return;
        }

        resendBtn.disabled = true;
        resendBtn.textContent = "Sending...";

        try {
            const response = await fetch("http://localhost:5000/api/auth/resend-verification", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email })
            });

            const data = await response.json();

            if (response.ok) {
                showResendStatus("Verification email resent! Check your inbox.", "success");
            } else {
                showResendStatus(data.message || "Failed to resend email", "error");
            }
        } catch (error) {
            console.error("Resend error:", error);
            showResendStatus("An error occurred. Please try again.", "error");
        } finally {
            resendBtn.disabled = false;
            resendBtn.textContent = "Resend Verification Email";
            
            // Hide status after 5 seconds
            setTimeout(() => {
                resendStatus.style.display = "none";
            }, 5000);
        }
    });

    function showResendStatus(message, type) {
        resendStatus.textContent = message;
        resendStatus.className = `resend-status ${type}`;
        resendStatus.style.display = "block";
    }
});