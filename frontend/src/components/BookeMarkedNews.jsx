import { useEffect, useState } from "react";
import axios from "axios";

const BookmarkedNews = ({ user }) => {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        if (!user?.email) return;

        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/bookmark/${user.email}`
        );

        setBookmarks(response.data);
      } catch (error) {
        console.error("Failed to load bookmarks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarks();
  }, [user?.email]);

  if (loading) return <p>Loading your bookmarked articles...</p>;

  if (bookmarks.length === 0) return <p>No bookmarks yet.</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Your Bookmarked Articles</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {bookmarks.map((article, index) => (
          <div
            key={index}
            className="border rounded-xl shadow-md p-4 bg-white hover:shadow-lg transition"
          >
            <img
              src={article.img_url}
              alt={article.headline}
              className="w-full h-40 object-cover rounded-md mb-3"
            />
            <h3 className="text-lg font-semibold">{article.headline}</h3>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline mt-2 block"
            >
              Read more
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookmarkedNews;
