import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom"; 
import Alert from "./components/LandingPage/Alert";
import Navbar from "./components/LandingPage/Navbar";
import DashboardLayout from "./components/Dashboard/DashboardLayout";
import queryString from "query-string";
import { getUser, googleLogin, verify } from "./store/slices/authSlice";

function Layout(props) {

  
  const [message, setMessage] = useState(null);
  const dispatch = useDispatch();
  const alert = useSelector((state) => state.auth.message);
  const location = useLocation(); 

  const isDashboard = location.pathname.startsWith("/dashboard");

  useEffect(() => {
    const values = queryString.parse(location.search);
    const code = values.code;
    if (code) {
      dispatch(googleLogin({code}));
    }else{
      dispatch(verify())
      dispatch(getUser())
    }

  },[location])

  useEffect(() => {
    setMessage(alert);
  }, [alert]);

  return isDashboard ? (
    <DashboardLayout>{props.children}</DashboardLayout>
  ) : (
    <div className="min-h-screen dark:bg-black dark:text-foreground px-4 md:px-0 lg:px-0 xl:px-0">
      <Navbar />
      {message && (
        <div className="flex justify-end">
          <Alert className="alert alert-danger" message={message} />
        </div>
      )}
      {props.children}
    </div>
  );
}

export default Layout;
