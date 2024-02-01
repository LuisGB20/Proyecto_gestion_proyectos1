
import Header from "../../components/header";
import SidebarMiDashboard from "../../components/SidebarMiDashboard";
import Rol from "./components/RolEquipos";
import Tareas from "./components/TareasContadorEquipos";
import ListaTareas from "./components/ListaTareasEquipos";

function DashboardEquipos(){
    return(
        <>
            <div className=' h-screen bg-slate-200'>
                <Header/>
                <div className="flex h-[88.6%]">
                    <SidebarMiDashboard/>
                    <div>
                        <div>
                            <Rol/>
                        </div>
                        <div>
                            <Tareas/>
                        </div>
                        <div>
                            <ListaTareas/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default DashboardEquipos