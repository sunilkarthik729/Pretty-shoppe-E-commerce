import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Login/Auth.css";
import { useAuth } from "../../context/AuthContext";

  interface SignupProps {
    theme: "light" | "dark";
  }

const Signup:React.FC<SignupProps> = ({theme}) => {
    const {signup} = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();
  const [username, setUsername] = useState("");



  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    signup(username, password);
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    

    const user = { username, password };
    localStorage.setItem("user", JSON.stringify(user));
    alert("Account Created Successfully!");
    navigate("/login");
  };

  return (
    <div className={theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}>
      <div className="auth-container">
      <form onSubmit={handleSignup} className="auth-form">
        <h2>Create Account</h2>
        
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter username"
        />
        
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
        <p>
          Already have an account?{" "}
          <span onClick={() => navigate("/login")} className="link">
            Login
          </span>
        </p>
      </form>
    </div>  
    </div>
    
  );
};

export default Signup;
