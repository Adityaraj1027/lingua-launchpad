
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { BookOpenText, LogOut, Menu, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <BookOpenText className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-primary hidden sm:block">Lingua Launchpad</span>
            </Link>
          </div>

          {/* Desktop menu */}
          <nav className="hidden md:flex items-center space-x-4">
            <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary">
              Home
            </Link>
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary">
                  Dashboard
                </Link>
                <Link to="/lessons" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary">
                  Lessons
                </Link>
                <Link to="/quizzes" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary">
                  Quizzes
                </Link>
                <Link to="/practice" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary">
                  Practice
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <User className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user?.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user?.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => {
                        logout();
                        navigate("/");
                      }}
                      className="cursor-pointer"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" className="mr-2">
                    Log in
                  </Button>
                </Link>
                <Link to="/register">
                  <Button>Sign up</Button>
                </Link>
              </>
            )}
          </nav>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <Button variant="ghost" size="sm" onClick={toggleMobileMenu}>
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg py-2">
          <Link to="/" className="block px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={toggleMobileMenu}>
            Home
          </Link>
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="block px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={toggleMobileMenu}>
                Dashboard
              </Link>
              <Link to="/lessons" className="block px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={toggleMobileMenu}>
                Lessons
              </Link>
              <Link to="/quizzes" className="block px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={toggleMobileMenu}>
                Quizzes
              </Link>
              <Link to="/practice" className="block px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={toggleMobileMenu}>
                Practice
              </Link>
              <div className="border-t border-gray-200 my-2"></div>
              <div className="px-4 py-2 text-gray-700">
                <div className="font-medium">{user?.name}</div>
                <div className="text-sm text-gray-500">{user?.email}</div>
              </div>
              <button
                onClick={() => {
                  logout();
                  navigate("/");
                  toggleMobileMenu();
                }}
                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Log out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="block px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={toggleMobileMenu}>
                Log in
              </Link>
              <Link to="/register" className="block px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={toggleMobileMenu}>
                Sign up
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}
