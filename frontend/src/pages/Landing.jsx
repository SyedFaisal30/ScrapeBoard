import { Link } from 'react-router-dom';
import { Globe, ShieldCheck, Sparkles } from 'lucide-react';

const Landing = () => {
  return (
    <section className="text-center py-20 px-6 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-3xl mx-auto mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Welcome to <span className="text-blue-600">ScrapeBoard</span>
        </h2>
        <p className="text-gray-600 text-lg mb-8">
          All your scraped data in one secure, real-time dashboard.
        </p>

        <Link
          to="/login"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium shadow-lg transition"
        >
          Get Started
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-10 text-left">
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition border border-blue-100">
          <div className="flex items-center gap-4 mb-4">
            <Globe className="text-blue-600 glow-icon" size={32} />
            <h3 className="text-xl font-semibold text-gray-800">Public Web Data</h3>
          </div>
          <p className="text-gray-600 text-sm">
            Scrape real-time information from trusted public sources using ethical scraping methods.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition border border-blue-100">
          <div className="flex items-center gap-4 mb-4">
            <ShieldCheck className="text-blue-600 glow-icon" size={32} />
            <h3 className="text-xl font-semibold text-gray-800">Secure Access</h3>
          </div>
          <p className="text-gray-600 text-sm">
            Protected by Google OAuth 2.0 — ensuring your data stays safe and private at all times.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition border border-blue-100">
          <div className="flex items-center gap-4 mb-4">
            <Sparkles className="text-blue-600 glow-icon" size={32} />
            <h3 className="text-xl font-semibold text-gray-800">One-Click Insights</h3>
          </div>
          <p className="text-gray-600 text-sm">
            Instantly view, refresh, and explore your data with an intuitive and responsive UI.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Landing;
