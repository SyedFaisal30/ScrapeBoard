import { Github, Mail, Twitter, Linkedin, Globe, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-600 text-sm py-6 px-4">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <p>&copy; 2025 ScrapeBoard. All rights reserved.</p>

        <div className="flex gap-4 mt-2 md:mt-0">
          <a
            href="https://github.com/SyedFaisal30"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600"
          >
            <Github size={18} />
          </a>
          <a
            href="https://linkedin.com/in/syedfaisal30"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600"
          >
            <Linkedin size={18} />
          </a>
          <a
            href="https://wa.me/919892996342"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-green-600"
          >
            <Phone size={18} />
          </a>
          <a
            href="https://syedfaisal30.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600"
          >
            <Globe size={18} />
          </a>
          <a
            href="mailto:sfarz172320@gmail.com"
            className="hover:text-blue-600"
          >
            <Mail size={18} />
          </a>
          <a
            href="https://x.com/SyedFaisal30" // replace with your actual X username
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600"
          >
            <Twitter size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
