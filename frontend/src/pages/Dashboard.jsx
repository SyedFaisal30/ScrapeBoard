import {
  Loader2,
  Info,
  ExternalLink,
  Newspaper,
  Bookmark,
  BookmarkCheck,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useToast } from "../context/ToastContext";

const truncate = (text, max = 30) => {
  return text.length > max ? text.slice(0, max) + "..." : text;
};

const Dashboard = ({ user }) => {
  const [loading, setLoading] = useState(true);
  const [scrapedData, setScrapedData] = useState(null);
  const [visibleCount, setVisibleCount] = useState(6);
  const [searchTopic, setSearchTopic] = useState("");
  const [showTopicTip, setShowTopicTip] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);
  const [bookmarkedUrls, setBookmarkedUrls] = useState([]);
  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false);

  const navigate = useNavigate();
  const { showToast } = useToast();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchAll = async () => {
      await fetchNews();
      await fetchBookmarks(user.email);
    };

    fetchAll();
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
      showToast("error", "Failed to fetch news.");
    } finally {
      setLoading(false);
    }
  };

  const fetchBookmarks = async (email) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/bookmark/${email}`
      );
      const data = response.data.bookmarks;
      setBookmarks(data);
      setBookmarkedUrls(data.map((b) => b.url));
    } catch (err) {
      console.error("Error fetching bookmarks:", err);
      showToast("error", "Could not load bookmarks.");
    }
  };

  const handleBookmark = async (article) => {
    const isAlreadyBookmarked = bookmarkedUrls.includes(article.url);

    if (isAlreadyBookmarked) {
      const bookmark = bookmarks.find((b) => b.url === article.url);
      if (!bookmark) {
        showToast("error", "Bookmark not found.");
        return;
      }

      try {
        await axios.delete(
          `${import.meta.env.VITE_BACKEND_URL}/api/bookmark/${bookmark._id}`
        );
        showToast("success", "Bookmark removed!");
        fetchBookmarks(user.email);
      } catch (error) {
        console.error("Failed to remove bookmark:", error);
        showToast("error", "Something went wrong while removing bookmark.");
      }
    } else {
      try {
        await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/bookmark/`, {
          email: user.email,
          headline: article.headline,
          url: article.url,
          img_url: article.image,
        });
        showToast("success", "Article bookmarked!");
        fetchBookmarks(user.email);
      } catch (error) {
        if (error.response?.status === 409) {
          showToast("info", "You already bookmarked this article.");
        } else {
          console.error("Failed to bookmark article:", error);
          showToast("error", "Something went wrong while bookmarking.");
        }
      }
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTopic.trim()) {
      fetchNews(searchTopic.trim().toLowerCase());
      setShowBookmarksOnly(false);
    }
  };

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  if (!user) return null;

  const displayedArticles = showBookmarksOnly
    ? bookmarks.map((b) => ({
        headline: b.headline,
        url: b.url,
        image: b.img_url,
      }))
    : scrapedData?.articles;

  return (
    <div className="min-h-[80vh] w-full px-2 sm:px-3 py-10 bg-gray-100 text-gray-900">
      {loading ? (
        <div className="flex flex-col items-center justify-center mt-20">
          <Loader2 className="animate-spin text-blue-600" size={48} />
          <p className="mt-4 text-lg font-medium">
            Loading latest news data...
          </p>
        </div>
      ) : (
        <div className="w-full mx-auto">
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
                  <strong>tech</strong>, <strong>politics</strong>, etc.
                </div>
              )}
            </div>
          </form>

          <div className="mb-6 text-center sm:text-left">
            <h3 className="text-gray-800 text-lg sm:text-xl font-semibold flex justify-between items-center">
              <span
                onClick={() => {
                  fetchNews("");
                  setShowBookmarksOnly(false);
                }}
                className="text-blue-600 cursor-pointer hover:underline"
              >
                Latest News
                {searchTopic?.trim() ? ` > ${searchTopic}` : " > All"}
              </span>

              <button
                onClick={() => setShowBookmarksOnly(!showBookmarksOnly)}
                title="Toggle Bookmarks"
                className="flex items-center gap-1 hover:text-blue-600 transition p-1"
              >
                {showBookmarksOnly ? (
                  <>
                    <BookmarkCheck size={20} className="text-blue-600" />
                    <span className="text-sm font-medium text-blue-600">
                      All News
                    </span>
                  </>
                ) : (
                  <>
                    <Bookmark size={20} className="text-gray-500" />
                    <span className="text-sm font-medium text-gray-600">
                      All Bookmarks
                    </span>
                  </>
                )}
              </button>
            </h3>
          </div>

          <div className="w-full bg-white rounded-3xl border border-gray-200 p-2 sm:p-4 shadow-xl transition-all">
            {displayedArticles?.length > 0 ? (
              <>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {displayedArticles
                    .slice(0, visibleCount)
                    .map((article, idx) => (
                      <div
                        key={idx}
                        className="w-full bg-white border border-gray-100 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
                      >
                        {article.image && (
                          <img
                            src={article.image}
                            alt={`News ${idx}`}
                            className="w-full   h-48 object-cover"
                          />
                        )}
                        <div className="p-4 flex-1 flex flex-col">
                            <Newspaper
                              className="text-blue-500 mt-[2px]"
                              size={18}
                            />
                          <h4 className="text-lg font-semibold mb-2 text-gray-800 flex items-start gap-2">
                            {truncate(article.headline, 100)}
                          </h4>

                          <div className="mt-auto flex justify-between items-center">
                            <a
                              href={article.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 text-blue-600 font-medium hover:underline"
                            >
                              Read full article
                              <ExternalLink size={16} />
                            </a>

                            <button
                              onClick={() => handleBookmark(article)}
                              title="Bookmark"
                              className="hover:text-blue-600 transition"
                            >
                              {bookmarkedUrls.includes(article.url) ? (
                                <BookmarkCheck
                                  size={20}
                                  className="text-blue-600"
                                />
                              ) : (
                                <Bookmark size={20} className="text-gray-400" />
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>

                {!showBookmarksOnly &&
                  visibleCount < displayedArticles.length && (
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
              <p className="text-gray-600 text-center">
                {showBookmarksOnly
                  ? "No bookmarked articles found."
                  : "No articles found."}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
