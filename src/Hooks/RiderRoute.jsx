import { Navigate, useLocation } from "react-router";
import Loading from "../Componets/Loading/Loading";
import Forbidden from "../Componets/Forbidden";
import useRole from "./useRole";
import useAuth from "./useAuth";

const RiderRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, roleLoading } = useRole();
  const location = useLocation();

  if (loading || !user || roleLoading) {
    return <Loading></Loading>;
  }

  if (!user) {
    return <Navigate to="/login" state={location.pathname} replace />;
  }

  if (role !== "rider") {
    return <Forbidden />;
  }

  return children;
};

export default RiderRoute;
