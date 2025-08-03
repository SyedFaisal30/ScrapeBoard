import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = ({ user }) => {
  const [loading, setLoading] = useState(true);
  const [scrapedData, setScrapedData] = useState(null);
  const [visibleCount, setVisibleCount] = useState(6);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/scrape`
        );
        setScrapedData(response.data.scraped_data);
      } catch (error) {
        console.error("Error fetching scraped data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, navigate]);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  if (!user) return null;

  return (
    <div className="min-h-[80vh] px-4 sm:px-6 py-10 bg-gray-100 text-gray-900">
      {loading ? (
        <div className="flex flex-col items-center justify-center mt-20">
          <Loader2 className="animate-spin text-blue-600" size={48} />
          <p className="mt-4 text-lg font-medium">
            Loading latest news data...
          </p>
        </div>
      ) : (
        <div className="w-full max-w-[95%] lg:max-w-[1400px] mx-auto">
          {/* User Info */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-4 mb-10 text-center sm:text-left">
  <img
    src={user.picture}
    alt="User Profile"
    className="w-20 h-20 sm:w-24 sm:h-24 rounded-full shadow-lg mx-auto sm:mx-0"
  />
  <div>
    <h2 className="text-2xl sm:text-3xl font-bold">Hi, {user.name} 👋</h2>
    <p className="text-gray-500 text-sm sm:text-base">{user.email}</p>
  </div>
</div>


          {/* News Section */}
          <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-xl transition-all">
            {scrapedData?.articles?.length > 0 ? (
              <>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {scrapedData.articles
                    .slice(0, visibleCount)
                    .map((article, idx) => (
                      <div
                        key={idx}
                        className="bg-white border border-gray-100 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
                      >
                        {article.image && (
                          <img
                            src={article.image}
                            alt={`News ${idx}`}
                            className="w-full h-48 object-cover"
                          />
                        )}
                        <div className="p-4 flex-1 flex flex-col">
                          <h4 className="text-lg font-semibold mb-2 text-gray-800 line-clamp-2">
                            {article.headline}
                          </h4>
                          <div className="mt-auto">
                            <a
                              href={article.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 font-medium hover:underline"
                            >
                              Read full article →
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>

                {visibleCount < scrapedData.articles.length && (
                  <div className="mt-10 text-center">
                    <button
                      onClick={handleShowMore}
                      className="px-6 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-md"
                    >
                      Show More
                    </button>
                  </div>
                )}
              </>
            ) : (
              <p className="text-gray-600 text-center">No articles found.</p>
            )}

            <div className="mt-8 text-center">
              <a
                href={scrapedData.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline text-sm"
              >
                Visit Times of India Website →
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
