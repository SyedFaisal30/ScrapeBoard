import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import Login from "./pages/Login";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = Cookies.get("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const handleLogin = (userData) => {
    Cookies.set("user", JSON.stringify(userData), { expires: 1 });
    setUser(userData);
    navigate("/dashboard");
  };

  const handleLogout = () => {
    Cookies.remove("user");
    Cookies.remove("token");
    setUser(null);
    navigate("/");
  };

  return (
    <>
      <Header user={user} onLogout={handleLogout} />

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/dashboard" element={<Dashboard user={user} />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
