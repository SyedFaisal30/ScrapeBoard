import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = ({ user }) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if not logged in
    if (!user) {
      navigate("/login");
      return;
    }

    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [user, navigate]);

  // Optional: render null if redirecting
  if (!user) return null;

  return (
    <div className="min-h-[80vh] px-6 py-10 bg-gray-50 text-gray-800">
      {loading ? (
        <div className="flex flex-col items-center justify-center mt-20">
          <Loader2 className="animate-spin text-blue-600" size={48} />
          <p className="mt-4 text-lg font-medium">Preparing your dashboard...</p>
        </div>
      ) : (
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-2">Hi, {user.name} 👋</h2>
          <p className="text-gray-600 text-lg">
            Welcome to your personalized dashboard. Your data tools and insights will appear here soon.
          </p>

          <div className="mt-10 bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <p className="text-gray-500">
              📊 Dashboard features (fetch, analyze, and display data) coming soon.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
