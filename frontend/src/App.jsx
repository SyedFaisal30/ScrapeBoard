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

  // Load user from cookie
  useEffect(() => {
    const savedUser = Cookies.get("user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Invalid user cookie:", error);
      }
    }
    setCheckingAuth(false); // Auth check done
  }, []);

  // Called after Google login success
  const handleLogin = (userData) => {
    Cookies.set("user", JSON.stringify(userData), { expires: 1 });
    Cookies.set("email", userData.email, { expires: 1 });
    Cookies.set("google_id", userData.sub, { expires: 1 });

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
    <>
      <Header user={user} onLogout={handleLogout} />

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route
          path="/dashboard"
          element={
            user ? (
              <Dashboard user={user} />
            ) : (
              <p className="text-center mt-10 text-red-500 text-lg">
                Unauthorized. Please{" "}
                <a href="/login" className="underline text-blue-600">
                  login
                </a>{" "}
                to access the dashboard.
              </p>
            )
          }
        />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
