import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = ({ user }) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [user, navigate]);

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
          <div className="flex flex-col items-center gap-4 mb-6">
            <img
              src={user.picture}
              alt="User Profile"
              className="w-24 h-24 rounded-full shadow-md"
            />
            <h2 className="text-3xl font-bold">Hi, {user.name} 👋</h2>
            <p className="text-gray-500">{user.email}</p>
          </div>

          <p className="text-gray-600 text-lg mb-8">
            Welcome to your personalized dashboard. Your data tools and insights will appear here soon.
          </p>

          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
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
