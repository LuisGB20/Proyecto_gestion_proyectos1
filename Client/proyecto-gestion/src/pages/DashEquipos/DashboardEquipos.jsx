import React, { useState, useEffect } from 'react';
import Header from "../../components/header";
import SidebarMiDashboard from "../../components/SidebarMiDashboard";
import Rol from "./components/RolEquipos";
import Tareas from "./components/TareasContadorEquipos";
import ListaTareas from "./components/ListaTareasEquipos";

function DashboardEquipos() {
    const usuario = JSON.parse(sessionStorage.getItem('usuario'));
    const [equipoInfo, setEquipoInfo] = useState({});
    const [proyectoInfo, setProyectoInfo] = useState({});
    const [usuarioInfo, setUsuarioInfo] = useState({});
    const [cantidades, setCantidades] = useState({});
    const [miembrosEquipos, setMiembrosEquipos] = useState([]);
    const [tareasEquipo, setTareasEquipo] = useState([]);

    const obtenerTareasEquipo = async (idEquipo, idProyecto) => {
        await fetch(`https://localhost:4000/tareas/${idEquipo}/${idProyecto}`)
            .then(response => response.json())
            .then(data => {
                setTareasEquipo(data);
                console.log(data)
            })
            .catch(error => console.error(error));
    }

    const obtenerMiembrosEquipos = async (id) => {
        await fetch(`https://localhost:4000/usuariosEquipos/${id}`)
            .then(response => response.json())
            .then(data => {
                setMiembrosEquipos(data);
                console.log(data)
            })
            .catch(error => console.error(error));
    }

    const obtenerUsuario = async () => {
        await fetch(`https://localhost:4000/InformacionDash/${usuario.id}`)
            .then(response => response.json())
            .then(data => {
                setUsuarioInfo(data.usuario);
                setEquipoInfo(data.equipo);
                setProyectoInfo(data.proyecto);
                setCantidades(data.cantidades);
                console.log(data)
                obtenerMiembrosEquipos(data.usuario.equipo_id);
                obtenerTareasEquipo(data.equipo.id, data.proyecto.id);
            })
            .catch(error => console.error(error));
    }


    const obtenerTareas = () => {

    }

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
        return formattedDate;
    };


    useEffect(() => {
        obtenerUsuario();
    }, []);

    return (
        <div className=' h-auto bg-slate-200 '>
            <Header area={"Mi equipo"} />
            <div className="flex h-screen w-full">
                <SidebarMiDashboard />
                <div className="w-full h-screen bg-slate-200">
                    {/* <div className="w-full">
                        <Tareas />
                    </div> */}
                    <div className='flex w-full h-auto'>
                        <div className="m-10 w-1/2">
                            {/* Sección de información del equipo */}
                            <div className="bg-white p-4 mb-4 rounded-md shadow h-full">
                                <h1 className="text-2xl font-bold mb-2">Información del Equipo</h1>
                                <h2 className='text-xl font-semibold'>Nombre: <span className='text-xl font-normal italic'> {equipoInfo.nombre}</span></h2>
                                <h2 className='text-xl font-semibold'>Descripción: <span className='text-xl font-normal italic'> {equipoInfo.descripcion}</span></h2>
                                <h2 className='text-xl font-semibold'>Cantidad de miembros del equipo: <span className='text-xl font-normal italic'> {cantidades.cantidadMiembros}</span></h2>
                                <h2 className='text-xl font-semibold'>Diseñadores: <span className='text-xl font-normal italic'> {cantidades.cantidadDiseñadores}</span></h2>
                                <h2 className='text-xl font-semibold'>Programadores: <span className='text-xl font-normal italic'> {cantidades.cantidadProgramadores}</span></h2>
                                <h2 className='text-xl font-semibold'>Analistas: <span className='text-xl font-normal italic'>{cantidades.cantidadAnalistas}</span></h2>
                            </div>
                        </div>
                        <div className="m-10 w-1/2">
                            {/* Sección de información del proyecto */}
                            <div className="bg-white p-4 mb-4 rounded-md shadow h-full">
                            <h1 className="text-2xl font-bold mb-2">Información del Proyecto</h1>
                                <h2 className='text-xl font-semibold'>Nombre: <span className='text-xl font-normal italic'> {proyectoInfo.nombre}</span></h2>
                                <h2 className='text-xl font-semibold'>Descripción: <span className='text-xl font-normal italic'> {proyectoInfo.descripcion}</span></h2>
                                <h2 className='text-xl font-semibold'>Fecha Inicio: <span className='text-xl font-normal italic'> {formatDate(proyectoInfo.fecha_inicio)}</span></h2>
                                <h2 className='text-xl font-semibold'>Fecha Fin: <span className='text-xl font-normal italic'> {formatDate(proyectoInfo.fecha_fin)}</span></h2>
                                <h2 className='text-xl font-semibold'>Estado: <span className='text-xl font-normal italic'> {proyectoInfo.estado}</span></h2>
                            </div>
                        </div>
                    </div>
                    <div className="w-full">
                        <ListaTareas miembros={miembrosEquipos} tareas={tareasEquipo}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardEquipos;
