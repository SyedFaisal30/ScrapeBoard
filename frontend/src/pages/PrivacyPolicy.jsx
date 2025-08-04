import React from "react";

const PrivacyPolicy = () => {
  return (
    <section className="max-w-full mx-auto px-4 bg-gradient-to-br from-blue-100 to-white sm:px-8 py-12">
      <div className="bg-white rounded-2xl shadow-md p-8 border border-gray-200 max-w-full mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-10">
          Privacy Policy
        </h1>

        <div className="space-y-8 text-gray-700 leading-relaxed text-base sm:text-lg">
          <p>
            Your privacy is important to us. This policy explains how we collect,
            use, and protect your personal information when you use our app (
            <span className="font-medium text-gray-900">ScrapeBoard</span>).
          </p>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">1. Information We Collect</h2>
            <p>
              We collect your name, email, and Google ID when you sign in using Google OAuth.
              We do not store any passwords or sensitive data.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">2. How We Use Your Data</h2>
            <p>
              Your data is used solely for authentication and personalization (e.g., managing bookmarks).
              We do not sell or share your data with third parties.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">3. Cookies</h2>
            <p>
              We use cookies to store your session information securely in your browser.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">4. Data Security</h2>
            <p>
              We implement industry-standard security measures to protect your information.
              However, no system is 100% secure.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">5. Third-Party Services</h2>
            <p>
              This app uses Google Sign-In, subject to Google’s privacy policy.
              Please review Google’s terms and privacy policies separately.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">6. Contact</h2>
            <p>
              For any questions regarding this policy, contact us at: <br />
              <a
                href="mailto:sfarz172320@gmail.com"
                className="text-blue-600 underline hover:text-blue-700 transition"
              >
                sfarz172320@gmail.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
