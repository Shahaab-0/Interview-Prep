import { Navigate, Outlet } from "react-router-dom";
import { useAuth, UserRole } from "../context/AuthContext";

interface RoleRouteProps {
  allowedRoles: UserRole[];
}

const RoleRoute = ({ allowedRoles }: RoleRouteProps) => {
  const { user, loading } = useAuth();

  if (loading) return <p>Checking permissions...</p>;

  if (!user) return <Navigate to="/login" replace />;
    
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default RoleRoute;