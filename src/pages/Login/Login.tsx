import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Login/Auth.css";
import { useAuth } from "../../context/AuthContext";

interface loginProps{
  theme:"light" | "dark";
}
const Login:React.FC<loginProps> = ({theme}) => {
  const [username, setUsername] = useState(""); // ✅ useState for username
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
    const { login } = useAuth();
  const [name, setName] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
      if (name.trim() !== "") {
      login(name, password);

      navigate("/"); // back to home
    }
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      alert("No user found! Please sign up first.");
      return;
    }
    

    const parsedUser = JSON.parse(storedUser);
    
    if (parsedUser.username === username && parsedUser.password === password) {
      alert("Login Successful!");
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("loggedInUser", parsedUser.username);
      navigate("/");
      window.location.reload(); // 👈 add this
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className={theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}>
      <div className="auth-container">
      <form onSubmit={handleLogin} className="auth-form">
        <h2>Login</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <input
          type="text"
          placeholder="Enter Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        <p>
          Don’t have an account?{" "}
          <span onClick={() => navigate("/signup")} className="link">
            Sign Up
          </span>
        </p>
      </form>
    </div>
    </div>
    
  );
};

export default Login;
