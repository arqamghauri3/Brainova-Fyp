import { DashboardContext } from "@/contexts/DashboardContext";
import { Menu } from "lucide-react";
import React, { useContext } from "react";
import { Button } from "@/components/ui/button";

function Navbar() {
  const { setIsSidebarOpen } = useContext(DashboardContext);
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

  return (
    <div className="md:hidden border-b border-b-slate-200 dark:border-b-slate-800 w-full h-16 flex items-center px-5 justify-between">
      <Button onClick={() => setIsSidebarOpen(true)}>
        <Menu className="w-6 h-6" />
      </Button>
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
    </div>
  );
}

export default Navbar;
