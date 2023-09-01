import "./App.css";
import Registration from "./components/Registration";
import Login from "./components/Login";
import Article from "./components/Article";
import Home from "./components/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/article" element={<Article />} />
        <Route
          path="*"
          element={
            <div
              style={{
                background: "papayawhip",
                height: "100vh",
                display: "grid",
                placeItems: "center",
                color: "red",
                width: "100vw",
              }}
            >
              <h1>Wrong URL!</h1>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
