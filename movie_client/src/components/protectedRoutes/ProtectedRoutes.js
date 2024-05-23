import { Navigate, Outlet } from "react-router-dom";
const ProtectedRoutes = ({ auth }) => {
  return auth === true ? <Outlet /> : <Navigate to="/Error" replace />;
};
export default ProtectedRoutes;
