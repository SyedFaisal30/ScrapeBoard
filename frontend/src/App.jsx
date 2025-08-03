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
  const [checkingAuth, setCheckingAuth] = useState(true); // To delay render
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = Cookies.get("user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Invalid user cookie:", error);
      }
    }
    setCheckingAuth(false);
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    navigate("/dashboard");
  };

  const handleLogout = () => {
    Cookies.remove("user");
    Cookies.remove("token");
    Cookies.remove("email");
    Cookies.remove("google_id");

    setUser(null);
    navigate("/");
  };

  // ⏳ While checking auth from cookies
  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">🔒 Checking authentication...</p>
      </div>
    );
  }

  return (
  <div className="flex flex-col min-h-screen">
    <Header user={user} onLogout={handleLogout} />

    <div className="flex-grow">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route
          path="/dashboard"
          element={
            user ? (
              <Dashboard user={user} />
            ) : (
              <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 text-center px-4">
                <h1 className="text-3xl font-bold text-red-600 mb-2">
                  Unauthorized Access
                </h1>
                <p className="text-gray-700 mb-4 text-lg max-w-md">
                  You must be logged in to view the dashboard.
                </p>
                <a
                  href="/login"
                  className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all shadow"
                >
                  Go to Login
                </a>
              </div>
            )
          }
        />
      </Routes>
    </div>
    <Footer />
  </div>
);
}

export default App;
