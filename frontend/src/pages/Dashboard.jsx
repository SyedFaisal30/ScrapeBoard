import { useEffect, useState } from "react";
import { Loader2, Info, ExternalLink, Newspaper } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = ({ user }) => {
  const [loading, setLoading] = useState(true);
  const [scrapedData, setScrapedData] = useState(null);
  const [visibleCount, setVisibleCount] = useState(6);
  const [searchTopic, setSearchTopic] = useState("");
  const [showTopicTip, setShowTopicTip] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    fetchNews();
  }, [user, navigate]);

  const fetchNews = async (customTopic = "") => {
    setLoading(true);
    try {
      const endpoint = customTopic
        ? `${import.meta.env.VITE_BACKEND_URL}/api/search/${customTopic}`
        : `${import.meta.env.VITE_BACKEND_URL}/api/scrape`;

      const response = await axios.get(endpoint);
      const data = customTopic ? response.data : response.data.scraped_data;

      setScrapedData(data);
      setVisibleCount(6);
    } catch (error) {
      console.error("Error fetching scraped data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTopic.trim()) {
      fetchNews(searchTopic.trim());
    }
  };

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  if (!user) return null;

  return (
    <div className="min-h-[80vh] w-fullpx-4 sm:px-6 py-10 bg-gray-100 text-gray-900">
      {loading ? (
        <div className="flex flex-col items-center justify-center mt-20">
          <Loader2 className="animate-spin text-blue-600" size={48} />
          <p className="mt-4 text-lg font-medium">
            Loading latest news data...
          </p>
        </div>
      ) : (
        <div className="w-full max-w-[95%] lg:max-w-full mx-auto">
          {/* User Info */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-4 mb-10 text-center sm:text-left">
            <img
              src={user.picture}
              alt="User Profile"
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full shadow-lg mx-auto sm:mx-0"
            />
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold">
                Hi, {user.name} 👋
              </h2>
              <p className="text-gray-500 text-sm sm:text-base">{user.email}</p>
            </div>
          </div>

          <form
            onSubmit={handleSearch}
            className="flex flex-wrap sm:flex-nowrap items-center justify-center gap-4 mb-8 relative"
          >
            <input
              type="text"
              value={searchTopic}
              onChange={(e) => setSearchTopic(e.target.value)}
              placeholder="Search news by topic (e.g. sports, business)..."
              className="w-[50%] sm:w-[30%] px-4 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="submit"
              className="w-[25%] sm:w-[8%] px-5 py-1 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
            >
              Search
            </button>
            <div className="relative w-[5%] sm:w-[5%] flex">
              <Info
                size={20}
                className="text-gray-500 hover:text-blue-600 cursor-pointer"
                onClick={() => setShowTopicTip(!showTopicTip)}
              />

              {showTopicTip && (
                <div className="absolute top-full right-1 mt-3 p-3 bg-white border border-gray-300 shadow-md rounded-md text-sm w-72 z-10">
                  Enter a topic like <strong>sports</strong>,{" "}
                  <strong>tech</strong>, <strong>politics</strong>, etc. to
                  fetch specific news.
                </div>
              )}
            </div>
          </form>

          <div className="mb-6 text-center sm:text-left">
            <h3 className="text-gray-800 text-lg sm:text-xl font-semibold">
              <span
                onClick={() => fetchNews("")}
                className="text-blue-600 cursor-pointer hover:underline"
              >
                Latest News
              </span>
              {searchTopic?.trim() ? (
                <span className="text-blue-600"> &gt; {searchTopic}</span>
              ) : (
                <span className="text-blue-600"> &gt; All</span>
              )}
            </h3>
          </div>

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
                          <h4 className="text-lg font-semibold mb-2 text-gray-800 line-clamp-2 flex items-start gap-2">
                            <Newspaper
                              className="text-blue-500 mt-[2px]"
                              size={18}
                            />
                            {article.headline}
                          </h4>
                          <div className="mt-auto">
                            <a
                              href={article.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 text-blue-600 font-medium hover:underline"
                            >
                              Read full article
                              <ExternalLink size={16} />
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

            {scrapedData?.url && (
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
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
