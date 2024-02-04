
import Header from "../../components/header";
import SidebarMiDashboard from "../../components/SidebarMiDashboard";
import Rol from "./components/Rol";
import Tareas from "./components/TareasContador";
import ListaTareas from "./components/ListaTareas";
import { useEffect, useState } from "react";
import CommitStatsWidget from "../../components/GitHubActivityWidget";
import DiseñadorWidget from "../../components/DiseñadorWidget";
import EstadisticasWidget from "../../components/EstaditicasWidget";

function Dashboard() {
    const usuario = JSON.parse(sessionStorage.getItem('usuario'));
    const [usuarioPermisos, setUsuarioPermisos] = useState({})
    const [tareas, setTareas] = useState([]);
    const [tareasTipos, setTareasTipos] = useState({});
    const [reloadPage, setReloadPage] = useState(false); // Nuevo estado para forzar la recarga

    const obtenerTareas = async () => {
        await fetch(`https://localhost:4000/tareas/usuario/${usuario.id}`)
            .then(response => response.json())
            .then(data => {
                setTareas(data.tareas);
                setTareasTipos(data.cantidades)
                console.log(data)
            })
            .catch(error => {
                console.error(error);
            });
    }

    const obtenerUsuario = async () => {
        await fetch(`https://localhost:4000/usuarios/${usuario.id}`)
            .then(response => response.json())
            .then(data => {
                console.log(data.permisos)
                setUsuarioPermisos(data.permisos)
            })
            .catch(error => console.error(error));
    }

    useEffect(() => {
        obtenerTareas();
        obtenerUsuario();
    }, [reloadPage])

    // Datos de ejemplo
    const totalClientes = 150;
    const ingresosMensuales = 5000;
    const productosVendidos = 200;

    return (
        <div className='w-full h-auto bg-slate-200'>
            <Header area={"Mi dashboard"} />
            <div className="flex h-full">
                <SidebarMiDashboard />
                <div className="w-full h-full">
                    <div className="w-full">
                        <Rol rol={usuario.rol_id} />
                    </div>
                    <div className="w-full h-auto">
                        <Tareas misTareas={tareas} tiposTareas={tareasTipos} />
                    </div>
                    <div className="w-full h-auto">
                        <ListaTareas misTareas={tareas} reload={reloadPage} setReload={setReloadPage} />
                    </div>
                    <div className="w-full mx-auto rounded-2xl h-auto mb-20">
                        {usuarioPermisos.ver_commits === true ? (
                            <CommitStatsWidget />
                        ) : usuarioPermisos.ver_diseños === true ? (
                            <DiseñadorWidget />
                        ) : usuarioPermisos.ver_estadisticas === true ? (
                            <EstadisticasWidget
                                totalClientes={totalClientes}
                                ingresosMensuales={ingresosMensuales}
                                productosVendidos={productosVendidos}
                            />
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Dashboard