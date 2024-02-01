
import Header from "../../components/header";
import SidebarMiDashboard from "../../components/SidebarMiDashboard";
import Rol from "./components/Rol";
import Tareas from "./components/TareasContador";
import ListaTareas from "./components/ListaTareas";

function Dashboard(){
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
export default Dashboard