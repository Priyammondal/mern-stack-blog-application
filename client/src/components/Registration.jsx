import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post("http://localhost:5050/registration", {
      name,
      email,
      password,
    });
    console.log("Registration Response-->", response);
    if (response.status === 200) {
      navigate("/login");
      setName("");
      setEmail("");
      setPassword("");
    } else {
      console.log("Registration Error Response--->", response.data.message);
    }
  };
  return (
    <div className="registration">
      <form onSubmit={handleSubmit}>
        <section>
          <label htmlFor="name">User Name:</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </section>
        <section>
          <label htmlFor="email">Email Address:</label>
          <input
            id="email"
            type="email"
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
        <section>
          <button type="button" onClick={() => navigate("/login")}>
            Login
          </button>
          <button>Signup</button>
        </section>
      </form>
    </div>
  );
};

export default Registration;
