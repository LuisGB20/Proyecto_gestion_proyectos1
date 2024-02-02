
import Header from "../../components/header";
import SidebarMiDashboard from "../../components/SidebarMiDashboard";
import Rol from "./components/Rol";
import Tareas from "./components/TareasContador";
import ListaTareas from "./components/ListaTareas";

function Dashboard(){
        const usuario = JSON.parse(sessionStorage.getItem('usuario'));

        return(
        <>
            <div className=' h-screen bg-slate-200'>
                <Header area={"Mi dashboard"}/>
                <div className="flex h-[88.6%]">
                    <SidebarMiDashboard/>
                    <div className="w-full">
                        <div className="w-full">
                            <Rol rol={usuario.rol_id}/>
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