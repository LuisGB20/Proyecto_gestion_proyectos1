import { Navigate, Outlet } from "react-router-dom";

function MiembroRoute() {
  let token = sessionStorage.getItem("token");
  let usuario = JSON.parse(sessionStorage.getItem("usuario"));
console.log(usuario)
  let logueado = token && usuario;

  if (!logueado) {
    console.log("No está logueado");
    return <Navigate to="/" />;
  }
  if (usuario.rol_id === 1) {
    console.log("No es miembro");
    return <Navigate to="/NoAutorizado" />;
  }
  return <Outlet />;
}

export default MiembroRoute;