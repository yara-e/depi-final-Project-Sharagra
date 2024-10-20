import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styleLogin from "./AdminLogin.module.css";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const emailRegex = /^[A-Za-z]\w+@\w+\.\w+$/;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!emailRegex.test(email)) {
      setError("Invalid email format.");
      return;
    }

    const payload = {
      email,
      password,
    };

    try {
      const response = await fetch("http://localhost:4000/user/loginAdmin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "An unknown error occurred.");
      }

      const result = await response.json();
        localStorage.setItem("adminId", result.user._id);
      setError("");
      setSuccess("Welcome back!");


      setEmail("");
      setPassword("");


      navigate("/admin/profile/dashboard");
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  return (
    <div className={styleLogin.pageWrapper}>
      <div className={styleLogin.container}>
        <h1 className={styleLogin.header}>Admin Login</h1>
        <form onSubmit={handleSubmit} className={styleLogin.form}>
          <label className={styleLogin.label}>
            Email:
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={styleLogin.input}
            />
          </label>
          <br />
          <label className={styleLogin.label}>
            Password:
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={styleLogin.input}
            />
          </label>
          <br />
          <button type="submit" className={styleLogin.button}>
            Login
          </button>
          {error && <div className={styleLogin.error}>{error}</div>}
          {success && <div className={styleLogin.success}>{success}</div>}
        </form>
      </div>
    </div>
  );
}
