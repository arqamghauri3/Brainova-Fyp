import React from "react";
import { Button } from "@/components/ui/button";
import { Brain } from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const toggleDarkMode = () => {
    const html = document.documentElement;
    if (html.classList.contains("dark")) {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  };

  const navbarLinks = [
    { title: "Home", href: "/" },
    { title: "Contact Us", href: "/contact" },
    { title: "How It Works", href: "/how-it-works" },
    { title: "FAQs", href: "/faq" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full  dark:bg-background/95 backdrop-blur dark:supports-[backdrop-filter]:bg-background/25 bg-white/95 supports-[backdrop-filter]:bg-white/25">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Brain className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">Brainova</span>
        </Link>
        <nav className="flex items-center space-x-6">
          {navbarLinks.map((navbarLink) => {
            return (
              <Link
                to={navbarLink.href}
                className="text-sm font-medium hover:text-gray-600 dark:hover:text-white"
              >
                {navbarLink.title}
              </Link>
            );
          })}
          <div className="flex gap-1">
            {isAuthenticated ? (
              <>
              <Button>
                  <Link to="/dashboard">Dashboard</Link>
                </Button>
              </>
            ) : (
              <>
                <Button>
                  <Link to="/register">Sign Up</Link>
                </Button>
                <Button>
                  <Link to="/login">Sign In</Link>
                </Button>
              </>
            )}
          </div>
          <div>
            <Button
              className="h-9 w-9 p-0 rounded-full"
              onClick={toggleDarkMode}
              variant="outline"
            >
              <span className="sr-only">Toggle Dark Mode</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
