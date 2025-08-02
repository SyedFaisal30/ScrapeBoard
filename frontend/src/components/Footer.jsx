import { Github, Mail, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-600 text-sm py-6 px-4 mt-10">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <p>&copy; 2025 ScrapeBoard. All rights reserved.</p>
        <div className="flex gap-4 mt-2 md:mt-0">
          <a href="#" className="hover:text-blue-600"><Github size={18} /></a>
          <a href="#" className="hover:text-blue-600"><Twitter size={18} /></a>
          <a href="mailto:support@scrapeboard.io" className="hover:text-blue-600"><Mail size={18} /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
    