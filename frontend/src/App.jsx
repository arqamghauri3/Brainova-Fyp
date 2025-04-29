import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";

import Dashboard from "./pages/Dashboard/Dashboard";
import Register from "./pages/FrontPage/Register";
import Login from "./pages/FrontPage/Login";
import LandingPage from "./pages/FrontPage/LandingPage";
import Profile from "./pages/Dashboard/Profile";
import UploadPage from "./pages/Dashboard/UploadPage";
import ContactUs from "./pages/FrontPage/ContactUs";
import HowItWorks from "./pages/FrontPage/HowItWorks";
import AccountSettings from "./components/Dashboard/AccountSettings";
import ReportPage from "./pages/Dashboard/ReportPage";
import FaqPage from "./pages/FrontPage/FaqPage";
import ResetPasswordForm from "./components/LandingPage/ResetPasswordForm";
import ResetPassword from "./pages/FrontPage/ResetPassword";
import ConfirmReset from "./pages/FrontPage/ConfirmReset";
import ActivateEmail from "./pages/FrontPage/ActivateEmail";
import Layout from "./Layout";
import ProtectedRoute from "./router/ProtectedRoute";
import store from "./store/store";
import UnAuthenticatedRoute from "./router/UnAuthenticatedRoute";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/reset/password" element={<ResetPassword />} />
            <Route
              path="/dj-rest-auth/registration/account-confirm-email/:key/"
              element={<ActivateEmail />}
            />
            <Route
              path="reset/password/confirm/:uid/:token"
              element={<ConfirmReset />}
            />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/faq" element={<FaqPage />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/profile" element={<Profile />} />
              <Route path="/dashboard/upload" element={<UploadPage />} />
              <Route path="/dashboard/settings" element={<AccountSettings />} />
              <Route path="/dashboard/reports" element={<ReportPage />} />
            </Route>
          </Routes>
        </Layout>
      </Router>
    </Provider>
  );
}

export default App;
