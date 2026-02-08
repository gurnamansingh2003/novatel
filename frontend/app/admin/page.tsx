"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import "./admin.css";



export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Store token in localStorage
      localStorage.setItem("adminToken", data.token);
      localStorage.setItem("adminEmail", data.admin.email);
      localStorage.setItem("adminName", data.admin.name);

      // Redirect to dashboard
      router.push("/admin/dashboard");
    } catch (error: any) {
      setError(error.message || "An error occurred during login");
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-container">
      {/* Left Side - Blue Panel */}
      <div className="admin-login-left">
        <h1 className="admin-login-title">Welcome Back!</h1>
        <p className="admin-login-subtitle">
          Login to access your dashboard and manage all services.
        </p>

        <div className="admin-features">
          <div className="admin-feature">
            <div className="feature-icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
            <span>Secure JWT authentication</span>
          </div>

          <div className="admin-feature">
            <div className="feature-icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="3" y="4" width="18" height="16" rx="2" />
                <path d="M7 8h10M7 12h10M7 16h6" />
              </svg>
            </div>
            <span>Encrypted password storage</span>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="admin-login-right">
        <button className="back-to-home" onClick={() => router.push("/")}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to Home
        </button>

        <div className="login-form-wrapper">
          <h2 className="form-title">Welcome back</h2>
          <p className="form-subtitle">Please enter your credentials to login</p>

          <form onSubmit={handleLogin} className="login-form">
            {error && <div className="error-message">{error}</div>}

            <div className="form-group">
              <div className="input-wrapper">
                <svg
                  className="input-icon"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="3" y="4" width="18" height="16" rx="2" />
                  <path d="M3 8l9 6 9-6" />
                </svg>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group">
              <div className="input-wrapper">
                <svg
                  className="input-icon"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="form-input"
                />
              </div>
            </div>

            <button type="submit" disabled={loading} className="login-button">
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}