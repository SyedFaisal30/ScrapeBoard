import { Link } from "react-router-dom";
import { Globe, ShieldCheck, Sparkles } from "lucide-react";
import logo from "../assets/logo1.png";

const Landing = () => {
  return (
    <section className="bg-gradient-to-b from-white via-blue-50 to-white py-20 px-6">
      <div className="mw-full mx-auto text-center">
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-10">
          <img
            src={logo}
            alt="ScrapeBoard Logo"
            className="w-12 h-16 drop-shadow-md"
          />
          <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text text-center md:text-left">
            Scrape Smarter. Stay Informed.
          </h1>
        </div>

        <p className="text-gray-700 text-lg md:text-xl mb-8 leading-relaxed">
          ScrapeBoard helps you extract, organize, and access real-time news
          data — all in one seamless, secure dashboard.
        </p>
        <Link
          to="/login"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-3 rounded-xl shadow-md transition"
        >
          Get Started with Google
        </Link>
      </div>

      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div className="bg-white p-6 rounded-2xl shadow-md border hover:shadow-xl transition">
          <div className="flex items-center gap-4 mb-4">
            <Globe size={34} className="text-blue-600" />
            <h3 className="text-xl font-semibold text-gray-800">
              Live Data Feeds
            </h3>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed">
            Continuously updated news & articles from public sources — ready to
            explore anytime.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md border hover:shadow-xl transition">
          <div className="flex items-center gap-4 mb-4">
            <ShieldCheck size={34} className="text-blue-600" />
            <h3 className="text-xl font-semibold text-gray-800">
              End-to-End Security
            </h3>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed">
            Backed by Google OAuth and secure token handling to protect your
            personalized data access.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md border hover:shadow-xl transition">
          <div className="flex items-center gap-4 mb-4">
            <Sparkles size={34} className="text-blue-600" />
            <h3 className="text-xl font-semibold text-gray-800">
              Bookmark & Discover
            </h3>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed">
            Quickly search, bookmark, and revisit insightful news with a clean
            dashboard interface.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Landing;
