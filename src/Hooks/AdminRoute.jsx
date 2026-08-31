import { Navigate, useLocation } from "react-router";
import Forbidden from "../Componets/Forbidden";
import useAuth from "./useAuth";
import useRole from "./useRole";
import Loading from "../Componets/Loading/Loading";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, roleLoading } = useRole();
  const location = useLocation();

  if (loading || roleLoading) {
    return <Loading></Loading>;
  }

  if (!user) {
    return <Navigate to="/login" state={location.pathname} replace />;
  }

  if (role !== "admin") {
    return <Forbidden />;
  }

  return children;
};

export default AdminRoute;
