import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { DashboardProvider } from "@/contexts/DashboardContext";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import {
  getPatient,
  getUser,
  refreshToken,
  verify,
} from "@/store/slices/authSlice";
import Alert from "../LandingPage/Alert";

function DashboardLayout({ children }) {
  const dispatch = useDispatch();
  const alert = useSelector((state) => state.auth.message);
  const [message, setMessage] = useState(null);
  const user = useSelector((state) => state.auth.user);

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  useEffect(() => {
    dispatch(verify()).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        dispatch(getUser());
      }
    });
  }, [dispatch]);

  useEffect(() => {
    
    if (user && user.pk) {
      dispatch(getPatient({ userId: user.pk }));
    }
  }, [user]);

  useEffect(() => {
    setMessage(alert);
  }, [alert]);

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
    <DashboardProvider>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 min-h-screen dark:bg-black dark:text-foreground ">
          <Navbar />
          <div className="p-10 ">
            {message && (
              <div className="flex justify-end">
                <Alert className="alert alert-danger" message={message} />
              </div>
            )}
            <div className="container ">{children}</div>
          </div>
        </div>
      </div>
    </DashboardProvider>
  );
}

export default DashboardLayout;
