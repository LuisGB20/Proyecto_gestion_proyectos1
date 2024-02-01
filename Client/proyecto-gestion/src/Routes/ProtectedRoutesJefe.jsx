
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutesJefe = ( {canActivate, redirectPath} ) => {
  if (canActivate === 'Programador' || canActivate === 'Analista' || canActivate === 'Diseñador') {
    return <Navigate to={redirectPath} replace />;
  }
  return <Outlet />;
};

export default ProtectedRoutesJefe;