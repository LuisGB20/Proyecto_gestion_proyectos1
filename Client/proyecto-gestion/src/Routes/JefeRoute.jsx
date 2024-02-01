import { Navigate, Outlet } from "react-router-dom";

function JefeRoute() {
  let token = sessionStorage.getItem("token");
  let usuario = JSON.parse(sessionStorage.getItem("usuario"));
console.log(usuario)
console.log(token)
  let logueado = token && usuario;

  if (!logueado) {
    console.log("No está logueado");
    return <Navigate to="/" />;
  }
  if (usuario.rol_id === 2 || usuario.rol_id === 3 || usuario.rol_id === 4) {
    console.log("No es jefe");
    return <Navigate to="/Dashboard" />;
  }
  return <Outlet />;
}

export default JefeRoute;