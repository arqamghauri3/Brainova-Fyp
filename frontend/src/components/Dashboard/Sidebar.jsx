import React, { useContext, useEffect, useRef, useCallback } from "react";
import { DashboardContext } from "@/contexts/DashboardContext";
import clsx from "clsx";
import {
  Brain,
  User,
  FileText,
  Upload,
  Settings,
  LogOut,
  LayoutDashboard,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "@/store/slices/authSlice";

function Sidebar() {
  const { isSidebarOpen, setIsSidebarOpen } = useContext(DashboardContext);
  const sidebarRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleDarkMode = () => {
    const html = document.documentElement;
    const isDark = html.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  };

  // Optimized outside click handler
  const handleClickOutside = useCallback(
    (event) => {
      if (isSidebarOpen && !event.target.closest(".sidebar-container")) {
        setIsSidebarOpen(false);
      }
    },
    [isSidebarOpen, setIsSidebarOpen]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

  const sidebarLinks = [
    { title: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { title: "Profile", href: "/dashboard/profile", icon: User },
    { title: "Upload EEG", href: "/dashboard/upload", icon: Upload },
    { title: "Reports", href: "/dashboard/reports", icon: FileText },
    { title: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  return (
    <nav
      ref={sidebarRef}
      className={clsx(
        "border-r border-slate-200 dark:border-slate-800 w-64 min-h-screen bg-white transition-transform duration-300 dark:bg-black dark:text-foreground",
        "fixed md:relative md:translate-x-0 z-50 shadow-lg md:shadow-none",
        {
          "translate-x-0": isSidebarOpen,
          "-translate-x-full md:translate-x-0": !isSidebarOpen,
        }
      )}
    >
      <div className="space-y-4 py-4 px-3">
        {/* Sidebar Header */}
        <div className="flex h-16 items-center space-x-2">
          <Brain className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">Brainova</span>
        </div>

        {/* Sidebar Links */}
        <div className="space-y-1">
          {sidebarLinks.map(({ title, href, icon: Icon }) => (
            <Link
              key={href}
              to={href}
              className="flex items-center space-x-3 p-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm font-medium">{title}</span>
            </Link>
          ))}
        </div>

        {/* Logout Button */}
        <div className="pt-4">
          <button
            className="flex items-center space-x-3 p-3 w-full text-left rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={() => {
              dispatch(logout());
              setIsSidebarOpen(false);
              navigate("/");
            }}
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm font-medium">Log out</span>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Sidebar;
