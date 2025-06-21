import React, { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const CreateAccount = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState(""); // New state for username
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswordRules, setShowPasswordRules] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState({
    password: false,
    confirmPassword: false,
  });

  const togglePasswordVisibility = (field) => {
    setPasswordVisibility((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };
  const navigate = useNavigate();

  const [passwordRules, setPasswordRules] = useState({
    length: false,
    uppercase: false,
    number: false,
    special: false,
  });

  useEffect(() => {
    setShowPasswordRules(false);
  }, []);

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setShowPasswordRules(newPassword.length > 0);

    setPasswordRules({
      length: newPassword.length >= 8,
      uppercase: /[A-Z]/.test(newPassword),
      number: /[0-9]/.test(newPassword),
      special: /[^A-Za-z0-9]/.test(newPassword),
    });

    if (
      newPassword.length >= 8 &&
      /[A-Z]/.test(newPassword) &&
      /[0-9]/.test(newPassword) &&
      /[^A-Za-z0-9]/.test(newPassword)
    ) {
      setShowPasswordRules(false);
    }
  };

  const showMessage = (text, type) => {
    setMessage({ text, type });
    setTimeout(() => {
      setMessage({ text: "", type: "" });
    }, 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || !confirmPassword || !username) {
      showMessage("Please fill in all fields", "error");
      return;
    }

    if (password !== confirmPassword) {
      showMessage("Passwords do not match", "error");
      return;
    }

    if (
      !passwordRules.length ||
      !passwordRules.uppercase ||
      !passwordRules.number ||
      !passwordRules.special
    ) {
      showMessage("Password does not meet requirements", "error");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, username }), // Added username
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("tempEmail", email);
        navigate(`/verify-email?email=${encodeURIComponent(email)}`);
      } else {
        showMessage(data.message || "Failed to create account", "error");
      }
    } catch (error) {
      console.error("Signup error:", error);
      showMessage("An error occurred. Please try again.", "error");
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
            Create your account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
             {/* Username Field - New */}
            <div className="text-left">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-white mb-2"
              >
                Username:
              </label>
              <input
                type="text"
                id="username"
                placeholder="Choose a username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 text-base bg-white bg-opacity-90 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-300 outline-none transition"
              />
            </div>
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
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 text-base bg-white bg-opacity-90 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-300 outline-none transition"
              />
            </div>

            {/* Password Field */}
            <div className="text-left">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-white mb-2"
              >
                Password:
              </label>
              <div className="relative">
                <input
                  type={passwordVisibility.password ? "text" : "password"}
                  id="password"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-3 text-base bg-white bg-opacity-90 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-300 outline-none transition"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  onClick={() => togglePasswordVisibility("password")}
                >
                  {/* {passwordVisibility.password ? <FaEyeSlash /> : <FaEye />} */}
                </button>
              </div>
            </div>

            {/* Password Rules */}
            {showPasswordRules && (
              <div className="text-left p-4 bg-white bg-opacity-20 rounded-lg border-l-4 border-blue-500 border-opacity-50 transition-all space-y-2">
                <p
                  className={`flex items-center text-sm mb-1 ${
                    passwordRules.length ? "text-green-500" : "text-white"
                  }`}
                >
                  <span className="mr-2">
                    {passwordRules.length ? "✓" : "✗"}
                  </span>
                  At least 8 characters
                </p>
                <p
                  className={`flex items-center text-sm mb-1 ${
                    passwordRules.uppercase ? "text-green-500" : "text-white"
                  }`}
                >
                  <span className="mr-2">
                    {passwordRules.uppercase ? "✓" : "✗"}
                  </span>
                  At least one uppercase letter
                </p>
                <p
                  className={`flex items-center text-sm mb-1 ${
                    passwordRules.number ? "text-green-500" : "text-white"
                  }`}
                >
                  <span className="mr-2">
                    {passwordRules.number ? "✓" : "✗"}
                  </span>
                  At least one number
                </p>
                <p
                  className={`flex items-center text-sm ${
                    passwordRules.special ? "text-green-500" : "text-white"
                  }`}
                >
                  <span className="mr-2">
                    {passwordRules.special ? "✓" : "✗"}
                  </span>
                  At least one special character
                </p>
              </div>
            )}

            {/* Confirm Password Field */}
            <div className="text-left">
              <label
                htmlFor="confirm-password"
                className="block text-sm font-medium text-white mb-2"
              >
                Confirm Password:
              </label>
              <div className="relative">
                <input
                  type={passwordVisibility.confirmPassword ? "text" : "password"}
                  id="confirm-password"
                  placeholder="Confirm password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 text-base bg-white bg-opacity-90 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-300 outline-none transition"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  onClick={() => togglePasswordVisibility("confirmPassword")}
                >
                  {/* {passwordVisibility.confirmPassword ? <FaEyeSlash /> : <FaEye />} */}
                </button>
              </div>
            </div>

            {/* Verification Message */}
            {message.text && (
              <div
                className={`p-3 rounded-lg ${
                  message.type === "error"
                    ? "bg-red-500 bg-opacity-20 border-l-4 border-red-500"
                    : "bg-green-500 bg-opacity-20 border-l-4 border-green-500"
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
                {isLoading ? "Creating Account..." : "Create your account"}
              </span>
            </button>

            {/* Google Button */}
            <button
              type="button"
              className="w-full py-4 px-4 bg-white bg-opacity-90 text-black rounded-lg font-medium text-base flex items-center justify-center hover:bg-opacity-100 transition"
            >
              <img
                src="google-icon.png"
                alt="Google Logo"
                className="w-5 h-5 mr-3"
              />
              Continue with Google
            </button>
          </form>

          {/* Policy Links */}
          <p className="text-sm text-white mt-6">
            By creating an account you agree to our{" "}
            <a
              href="#"
              className="text-yellow-400 font-medium hover:text-yellow-500 hover:underline"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="#"
              className="text-yellow-400 font-medium hover:text-yellow-500 hover:underline"
            >
              Privacy Policy
            </a>
            .
          </p>

          {/* Login Link */}
          <p className="text-base text-white mt-4">
            Already have an account?{" "}
            <Link
              to="/"
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

export default CreateAccount;