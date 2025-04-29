import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const UnAuthenticatedRoute = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return isAuthenticated ? <Navigate to="/dashboard" /> : <Outlet />;
};

export default UnAuthenticatedRoute;
