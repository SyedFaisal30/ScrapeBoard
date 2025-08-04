import { GoogleLogin } from "@react-oauth/google";
import Cookies from "js-cookie";
import logo from "../assets/logo1.png";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const Login = ({ onLogin }) => {
  // ---------------------- Google OAuth Success Handler ----------------------
  const handleSuccess = async (credentialResponse) => {
    const token = credentialResponse.credential;

    try {
      // Decode token to extract Google user ID
      const decoded = jwtDecode(token);
      const google_id = decoded.sub;

      // Verify token with backend
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/verify`,
        null,
        { params: { token } }
      );

      const userData = res.data.user;

      // Store auth data in cookies
      Cookies.set("token", token, { expires: 1 });
      Cookies.set("user", JSON.stringify(userData), { expires: 1 });
      Cookies.set("email", userData.email, { expires: 1 });
      Cookies.set("google_id", String(google_id), { expires: 1 });

      // Trigger login state in app
      onLogin({ ...userData, google_id });
    } catch (error) {
      console.error("Token verification failed:", error);
      alert("Token verification failed. Please try again.");
    }
  };

  // ---------------------- Google OAuth Error Handler ----------------------
  const handleError = () => {
    console.error("Login Failed");
    alert("Login failed. Please try again.");
  };

  // ---------------------- UI ----------------------
  return (
    <div className="h-[90vh] flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Card Container */}
      <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-2xl overflow-hidden w-[95%] sm:w-full max-w-5xl">

        {/* Left: Login Section */}
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
          {/* Logo + Heading */}
          <div className="flex items-center justify-center mb-4 gap-3">
            <img
              src={logo}
              alt="scraping logo"
              className="w-24 h-36 sm:w-12 sm:h-18 rounded-lg shadow-md"
            />

            <h1 className="text-4xl sm:text-4xl font-bold text-gray-800">
              Welcome to <span className="text-blue-600">ScrapeBoard</span>
            </h1>
          </div>

          {/* Description */}
          <p className="text-gray-500 mb-8">
            Securely log in to start scraping and exploring data in one place.
          </p>

          {/* Google Login Button */}
          <div className="flex items-center justify-center mb-6">
            <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
          </div>

          {/* Terms & Privacy */}
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

        {/* Right: Info/Marketing Section (Only on Medium+ screens) */}
        <div className="hidden md:flex w-1/2 bg-blue-600 text-white items-center justify-center p-10 relative">
          {/* Foreground Content */}
          <div className="z-10 w-full flex items-center gap-6">
            <img
              src={logo}
              alt="scraping illustration"
              className="w-32 h-46 object-contain rounded-lg shadow-lg"
            />

            <div className="flex flex-col">
              <h2 className="text-4xl font-bold mb-2">Why Sign In?</h2>
              <p className="text-white/90 text-xl max-w-sm">
                Personalize your experience, save progress, and unlock live data
                insights. ScrapeBoard keeps your data safe and fresh — all in
                one place.
              </p>
            </div>
          </div>

          {/* Transparent Overlay for Styling */}
          <div className="absolute top-0 left-0 w-full h-full bg-blue-900 opacity-10"></div>
        </div>
      </div>
    </div>
  );
};

export default Login;
