import { GoogleLogin } from "@react-oauth/google";
import Cookies from "js-cookie";
import logo from "../assets/logo.png";
import axios from "axios";
const Login = ({ onLogin }) => {
  const handleSuccess = async (credentialResponse) => {
  const token = credentialResponse.credential;

  try {
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/verify`,
      null,
      {
        params: { token },
      }
    );

    const userData = res.data.user;

    Cookies.set("token", token, { expires: 1 });
    Cookies.set("user", JSON.stringify(userData), { expires: 1 });
    Cookies.set("email", userData.email, { expires: 1 });

    onLogin(userData);
  } catch (error) {
    console.error("Token verification failed:", error);
    alert("Token verification failed. Please try again.");
  }
};


  const handleError = () => {
    console.error("Login Failed");
    alert("Login failed. Please try again.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-5xl">
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Welcome to <span className="text-blue-600">ScrapeBoard</span>
          </h1>
          <p className="text-gray-500 mb-8">
            Securely log in to start scraping and exploring data in one place.
          </p>

          <div className="flex items-center justify-center mb-6">
            <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
          </div>

          <p className="text-xs text-gray-400 mt-6 text-center">
            By continuing, you agree to our{" "}
            <span className="text-blue-600 underline cursor-pointer">
              Terms
            </span>{" "}
            and{" "}
            <span className="text-blue-600 underline cursor-pointer">
              Privacy Policy
            </span>
            .
          </p>
        </div>

        <div className="hidden md:flex w-1/2 bg-blue-600 text-white items-center justify-center p-10 relative">
          <div className="z-10 text-center">
            <img
              src={logo}
              alt="scraping illustration"
              className="w-64 mx-auto mb-6 rounded-lg shadow-lg"
            />
            <h2 className="text-2xl font-semibold mb-2">Why Sign In?</h2>
            <p className="text-white/90 text-sm">
              Personalize your experience, save progress, and unlock live data
              insights. ScrapeBoard keeps your data safe and fresh — all in one
              place.
            </p>
          </div>
          <div className="absolute top-0 left-0 w-full h-full bg-blue-900 opacity-10"></div>
        </div>
      </div>
    </div>
  );
};

export default Login;
