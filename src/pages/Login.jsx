import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import "../styles/auth.css";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { setAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", form);

      console.log("Status:", res.status);
      console.log("Data:", res.data);

      const token = res.data.token;
      const role = res.data.role;

      // ✅ store properly
      localStorage.setItem("accessToken", token);
      localStorage.setItem("role", role);
      localStorage.setItem("usermail", form.email);

      setAuthenticated(true);

      // ✅ ROLE BASED NAVIGATION
      if (role === "ROLE_ADMIN" || role === "ADMIN") {
        navigate("/admindashboard");
      } else {
        navigate("/dashboard");
      }

    } catch (error) {
      if (error.response) {
        console.log("Error Status:", error.response.status);
        console.log("Error Message:", error.response.data);
        alert(`Login failed: ${error.response.data}`);
      } else if (error.request) {
        console.log("No response from server");
        alert("Server not responding. Try again later.");
      } else {
        console.log("Error:", error.message);
        alert("Something went wrong");
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login</h2>

        <form onSubmit={handleSubmit}>
          <input
            name="email"
            placeholder="Email"
            onChange={handleChange}
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
          />

          <button type="submit">Login</button>
        </form>

        <div className="auth-link">
          <span onClick={() => navigate("/register")}>
            Don't have an account? Register
          </span>
        </div>
      </div>
    </div>
  );
}

export default Login;