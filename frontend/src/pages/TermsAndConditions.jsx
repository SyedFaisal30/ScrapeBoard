import React from "react";

const TermsAndConditions = () => {
  return (
    <section className="min-h-screen bg-gradient-to-b from-blue-100 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-full mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-10 border border-gray-200">
          <h1 className="text-3xl sm:text-4xl font-bold text-center text-blue-700 mb-8">
            Terms & Conditions
          </h1>

          <div className="space-y-6 text-gray-700 text-base sm:text-lg leading-relaxed">
            <p>
              By accessing or using this application (<strong>ScrapeBoard</strong>), you agree to be
              bound by these Terms and Conditions. If you disagree with any part of the terms, you may
              not access the application.
            </p>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">1. Use of Service</h2>
              <p>
                You may use this app only for lawful purposes and in accordance with these Terms.
                You are responsible for maintaining the confidentiality of your account credentials.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">2. Google OAuth</h2>
              <p>
                We use Google Sign-In for authentication. By logging in, you agree to allow us to
                collect your basic public profile information (e.g., name, email, Google ID).
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">3. Intellectual Property</h2>
              <p>
                All original content provided on this app, unless scraped from public sources, is
                the intellectual property of the app creators and protected under applicable
                copyright and trademark laws.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">4. Termination</h2>
              <p>
                We reserve the right to suspend or terminate access to the app at any time without
                prior notice if you violate any of these terms or engage in any harmful behavior.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">5. Modifications</h2>
              <p>
                We may update these Terms and Conditions from time to time. Continued use of the app
                after any changes indicates your acceptance of the updated terms.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TermsAndConditions;
