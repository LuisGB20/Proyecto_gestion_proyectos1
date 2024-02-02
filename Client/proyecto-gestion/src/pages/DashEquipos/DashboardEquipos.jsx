
import Header from "../../components/header";
import SidebarMiDashboard from "../../components/SidebarMiDashboard";
import Rol from "./components/RolEquipos";
import Tareas from "./components/TareasContadorEquipos";
import ListaTareas from "./components/ListaTareasEquipos";

function DashboardEquipos() {
    const usuario = JSON.parse(sessionStorage.getItem('usuario'));

    return (
        <div className=' h-screen bg-slate-200'>
            <Header />
            <div className="flex h-[88.6%] w-full">
                <SidebarMiDashboard />
                <div className="w-full">
                    <div className="w-full">
                        <Rol rol={usuario.rol_id} />
                    </div>
                    <div className="w-full">
                        <Tareas />
                    </div>
                    <div>
                        <ListaTareas />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default DashboardEquipos