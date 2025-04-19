
import { BookOpenText, Github, Mail, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <BookOpenText className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">Lingua Launchpad</span>
            </div>
            <p className="text-gray-600 max-w-md">
              Elevate your language learning experience with our interactive lessons,
              quizzes, and practical exercises. Start your language journey today!
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-gray-500 hover:text-primary">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-primary">Home</Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-gray-600 hover:text-primary">Dashboard</Link>
              </li>
              <li>
                <Link to="/lessons" className="text-gray-600 hover:text-primary">Lessons</Link>
              </li>
              <li>
                <Link to="/quizzes" className="text-gray-600 hover:text-primary">Quizzes</Link>
              </li>
              <li>
                <Link to="/practice" className="text-gray-600 hover:text-primary">Practice</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-primary">Help Center</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-primary">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-primary">Terms of Service</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-primary">Contact Us</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-gray-500 text-sm text-center">
            © {new Date().getFullYear()} Lingua Launchpad Academy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
