import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post("http://localhost:5050/login", {
      email,
      password,
    });
    console.log("response-->", response);
    if (response.status === 200 && response.data.data.length > 0) {
      localStorage.setItem("userId", response.data.data[0]._id);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("tokenType", response.data.type);
      navigate("/article");
      setEmail("");
      setPassword("");
    } else {
      console.log(response);
      console.log("No user found!");
    }
  };
  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <section>
          <label htmlFor="email">Email Address:</label>
          <input
            id="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </section>
        <section>
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </section>
        <button>Login</button>
      </form>
      <div
        style={{
          display: "flex",
          gap: "5px",
          marginTop: "10px",
          alignItems: "center",
        }}
      >
        <p>Don't have account?</p>{" "}
        <span>
          <button
            onClick={() => {
              navigate("/registration");
            }}
          >
            Register
          </button>
        </span>
      </div>
    </div>
  );
};

export default Login;
