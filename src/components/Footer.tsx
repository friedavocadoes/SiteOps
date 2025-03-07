import Link from "next/link";
import { FaTwitter, FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-6 px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start text-center md:text-left space-y-4 md:space-y-0">
        {/* Logo & Description */}
        <div>
          <h2 className="text-xl font-semibold">SiteOps</h2>
          <p className="text-gray-400 text-sm md:w-30 max-w-sm">
            A simple and smart way to manage your needs efficiently.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col justify-center text-center space-y-2">
          <Link href="/about" className="text-gray-300 hover:text-white">
            About the Dev
          </Link>
          <Link href="/support" className="text-gray-300 hover:text-white">
            Contact
          </Link>
          <Link href="/privacy" className="text-gray-300 hover:text-white">
            Privacy Policy
          </Link>
        </div>

        {/* Social Media Links */}
        <div className="flex space-x-4 text-xl">
          <a
            href="https://instagram.com/gnawthm"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-500"
          >
            <FaInstagram />
          </a>
          <a
            href="https://github.com/friedavocadoes"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/gautham-madhu/"
            target="_blank"
            className="hover:text-gray-400"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://x.com/friedavocadoes"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400"
          >
            <FaTwitter />
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-gray-500 text-sm text-center mt-4">
        &copy; {new Date().getFullYear()} SiteOps. All rights reserved.
      </div>
    </footer>
  );
}
