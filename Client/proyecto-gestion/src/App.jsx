import { BrowserRouter, Route, Routes } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';
import Home from '../src/pages/Home/Home'
import Login from "./pages/Login/Login";
import Register from './pages/Register/Register';
import ResourcesAndAssets from "./pages/Resources and Assets/Resources and assets";
import SolicitudActivos from "./pages/SolicitudActivos/SolicitudActivos";
import SolicitudRecursos from "./pages/SolicitudRecursos/SolicitudRecursos";
import TableroMiembros from "./pages/TableroMiembros/TableroMiembros";
import TodosEquipos from "./pages/equipos/TodosEquipos";
import Profile from "./pages/Profile/Profile"
import NuevoProyecto from "./pages/NuevoProyecto/NuevoProyecto";
import NuevoEquipo from "./pages/NuevoEquipo/NuevoEquipo";
import Proyecto from "./pages/Proyecto/Proyecto"
import Equipo from "./pages/Equipo/Equipo";
import Miembro from "./pages/Miembros/Miembro";
import TodosProyectos from "./pages/Proyectos/TodosProyectos";
import UsuarioMiembro from "./pages/UsuarioMiembro/UsuarioMiembro";
import NotFound from "./pages/NotFound/NotFound";
import Politicas from "./pages/Politicas/Politicas";
import PerfilMiembro from "./pages/perfilMiembro/PerfilMiembro";
import Dashboard from "./pages/Dash/Dashboard";
import DashboardEquipos from "./pages/DashEquipos/DashboardEquipos";
import Recuperar from './pages/RecuperarContraseña/Recuperar'
import MiembroRoute from './Routes/MiembroRoute.jsx'
import JefeRoute from "./Routes/JefeRoute.jsx";
import Nopermitido from "./pages/NoPermitido/Nopermitido.jsx";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* General */}
          
          <Route path='/Profile' element={<Profile />} />
          <Route path='/Politicas' element={<Politicas />} />
          <Route path='/NoAutorizado' element={<Nopermitido />} />
          <Route path='/*' element={<NotFound />} />
          <Route path='/RecuperarContraseña' element={<Recuperar />} /> {/* */}
          <Route path='/' element={<Home />} /> {/*  */}
          <Route path='/Login' element={<Login />} /> {/*  */}
          <Route path='/Register' element={<Register />} /> {/*  */}
          <Route path='/PerfilMiembro' element={<PerfilMiembro />} />

          {/* Miembros */}
          <Route element={<MiembroRoute />}>
            <Route path='/mensajeria' element={<TableroMiembros />} />
            <Route path='/SolicitudActivos' element={<SolicitudActivos />} />
            <Route path='/SolicitudRecursos' element={<SolicitudRecursos />} />
            <Route path='/Dashboard' element={<Dashboard />} />
            <Route path='/DashboardEquipos' element={<DashboardEquipos />} />
            <Route path='/ResourcesAndAssets' element={<ResourcesAndAssets />} />
          </Route>

          {/* Jefe */}
          <Route element={<JefeRoute />}>
            <Route path='/miembros' element={<UsuarioMiembro />} />
            <Route path='/miembros/:miembroId' element={<Miembro />} />
            <Route path='/equipos' element={<TodosEquipos />} is /> 
            <Route path='/equipos/:equipoId' element={<Equipo />} />
            <Route path='/NuevoEquipo' element={<NuevoEquipo />} />
            <Route path='/proyectos' element={<TodosProyectos />} />
            <Route path='/proyectos/:proyectoId' element={<Proyecto />} />
            <Route path='/NuevoProyecto' element={<NuevoProyecto />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
