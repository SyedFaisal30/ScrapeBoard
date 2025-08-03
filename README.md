<h1 align="center">
  <img src="frontend/src/assets/logo.png" alt="ScrapeBoard Logo" width="40" style="border-radius: 6px; vertical-align: middle; margin-right: 12px;" />
  <span><strong style="font-size: 40px;">ScrapeBoard – News Intelligence Dashboard</strong></span>
</h1>

<p align="center"><strong>📰 Real-time • Smart • Personalized</strong></p>

<p align="center">
  ScrapeBoard is a full-stack web application that allows users to <strong>scrape, search, and bookmark real-time news articles</strong>. Built using <strong>FastAPI</strong>, <strong>MongoDB</strong>, and <strong>React</strong>, it offers an intelligent and secure dashboard experience powered by <strong>Google OAuth</strong>.
</p>
Live: [https://scrapeboard.vercel.app](https://scrapeboard.vercel.app)

---

## 📌 Features

- 🔍 **Real-Time Web Scraping**: Get the latest news from public sources using FastAPI + BeautifulSoup.
- 🔑 **Secure Google OAuth Login**: User authentication via Google Sign-In.
- 🧠 **Smart Search**: Filter and explore news based on keywords/topics.
- 📌 **Bookmark Manager**: Save your favorite articles for later.
- 💾 **MongoDB Backend**: Efficient document storage and query handling.
- 📈 **Responsive Dashboard**: Built with React + TailwindCSS for all screen sizes.

---

## 🖥️ Tech Stack

| Frontend     | Backend      | Database | Auth          | Web Scraping | Styling       |
| ------------ | ------------ | -------- | ------------- | -------------| -------------- |
| React        | FastAPI      | MongoDB  | Google OAuth  | BeautifulSoup| Tailwind CSS   |
| Vite + Axios | Pydantic     | ODMantic | JWT + Cookies | httpx (async)| ShadCN UI      |

---

## 🚀 Getting Started

### 🧱 Prerequisites

- Node.js (v18+)
- Python (v3.10+)
- MongoDB (Local or Atlas)
- Google Cloud Console Project (for OAuth)

---

### 🔧 Backend Setup (FastAPI)

1. **Go to backend directory**:
   ```bash
   cd backend
Create virtual environment:


```
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
Install dependencies:
```

```
pip install -r requirements.txt
Set up environment variables in .env:
```
```
MONGO_URI=<your_mongodb_uri>
GOOGLE_CLIENT_ID=<from google console>
GOOGLE_CLIENT_SECRET=<from google console>
FRONTEND_URL=http://localhost:5173
```

Run FastAPI server:
```
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```
🌐 Frontend Setup (React + Vite)
Go to frontend directory:

```
cd frontend
Install dependencies:
```

```
npm install
Set up environment variables in .env:
```

```
VITE_BACKEND_URL=http://localhost:8000
Start development server:
```

```
npm run dev
```
🔐 Google OAuth Setup
Go to Google Cloud Console.

Create a new project > Enable OAuth consent screen.

Add Authorized JavaScript origins:
```
http://localhost:5173
https://scrapeboard.vercel.app
Add Authorized redirect URIs:
```

```
http://localhost:5173
https://scrapeboard.vercel.app
Generate client credentials and update .env.
```

🧪 API Endpoints (Backend)
Method	Endpoint	Description
GET	/scrape-news	Fetch latest articles
POST	/bookmark	Save article for user
GET	/bookmarks/{user}	Get user’s bookmarks
POST	/auth/google-login	Google login via token

🙌 Author
Syed Faisal Abdul Rahman Zulfequar
📧 sfarz172320@gmail.com
🌐 Portfolio
💼 LinkedIn
💻 GitHub

🏷️ License
This project is licensed under the MIT License.

❤️ Contributing
Pull requests and stars are welcome!
If you have suggestions, feel free to open an issue.
