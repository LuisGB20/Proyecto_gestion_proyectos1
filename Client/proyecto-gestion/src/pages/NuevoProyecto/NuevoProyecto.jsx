import  { useEffect, useState } from 'react';
import Header from '../../components/header'
import SidebarAdmin from '../../components/SidebarAdmin'
import NuevoEquipo from '../NuevoEquipo/NuevoEquipo';
import Swal from 'sweetalert2';

function NuevoProyecto() {
    const [nuevoProyecto, setNuevoProyecto] = useState({
        nombre: "",
        descripcion: "",
        fecha_inicio: "",
        fecha_fin: "",
        estado: null
    })

    const crearEquipo = async (e) => {
        e.preventDefault();
        if (!nuevoProyecto.nombre || !nuevoProyecto.descripcion || !nuevoProyecto.fecha_inicio || !nuevoProyecto.fecha_fin || nuevoProyecto.estado === null) {
            Swal.fire({
                title: 'Todos los campos son obligatorios',
                icon: 'warning',
                text: 'Por favor, completa todos los campos'
            })
        }
        console.log(nuevoProyecto)
        try {
            const response = await fetch('https://localhost:4000/proyectos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Agrega cualquier header necesario, como el token de autenticación
                },
                body: JSON.stringify(nuevoProyecto),
            });

            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    text: 'Equipo creado exitosamente'
                })
                // Redirigir al usuario a la página de inicio al hacer on click de la alerta
                window.location.href = '/proyectos'; // Cambia la ruta a la página de inicio
            } else {
                Swal.fire({
                    icon: 'error',
                    text: 'Hubo un problema al crear el proyecto'
                })
            }
        } catch (error) {
            console.error('Error al crear el equipo:', error);
        }
    };



    return (
        <div className='bg-slate-50'>
            <Header />
            <div className='flex w-full h-full'>
                <SidebarAdmin />
                <div className='w-full h-full'>
                    <div className='w-full h-full'>
                        <div className='bg-white my-3 w-full h-20 flex justify-between shadow'>
                            <h1 className='text-2xl font-semibold  p-3 my-auto'>NUEVO PROYECTO</h1>
                            <button className='font-medium text-center text-lg bg-gradient-to-r from-[#1E4C6A]  to-[#1B7FC5] p-2 mx-5 my-3 rounded-lg text-white ml-auto mr-12' onClick={crearEquipo}>Crear Proyecto</button>
                        </div>
                        <div className="w-full flex items-center m-auto">
                            <form className="bg-white shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] rounded px-10 pt-8 pb-12 md:w-96 lg:w-11/12  mx-auto my-24">
                                <div className="mb-4 ">
                                    <label className="block text-gray-500 text-sm font-bold mb-2" for="username">
                                        Nombre
                                    </label>
                                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Agrega un Nombre al Proyecto"
                                        value={nuevoProyecto.nombre} required
                                        onChange={(e) => setNuevoProyecto({ ...nuevoProyecto, nombre: e.target.value })}
                                    />
                                </div>
                                <div className="mb-4 ">
                                    <label className="block text-gray-500 text-sm font-bold mb-2" for="text">
                                        Descripción
                                    </label>
                                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="text" type="text" placeholder="¿De qué se trata el Proyecto?"
                                        value={nuevoProyecto.descripcion} required
                                        onChange={(e) => setNuevoProyecto({ ...nuevoProyecto, descripcion: e.target.value })}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-500 text-sm font-bold mb-2" for="date">
                                        Fecha de Inicio
                                    </label>
                                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="team" type="text" placeholder="¿Cuándo comenzará el Proyecto?" 
                                    value={nuevoProyecto.fecha_inicio} required
                                    onChange={(e) => setNuevoProyecto({ ...nuevoProyecto, fecha_inicio: e.target.value })}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-500 text-sm font-bold mb-2" for="date">
                                        Fecha de Finalización
                                    </label>
                                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="team" type="text" placeholder="¿Cuándo comenzará el Proyecto?" 
                                    value={nuevoProyecto.fecha_fin} required
                                    onChange={(e) => setNuevoProyecto({ ...nuevoProyecto, fecha_fin: e.target.value })}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-500 text-sm font-bold mb-2" for="text">
                                        Estado
                                    </label>
                                    <select className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                    value={nuevoProyecto.estado}
                                    onChange={(e) => setNuevoProyecto({ ...nuevoProyecto, estado: Number(e.target.value) })}
                                    >
                                        <option selected>Seleccionar Estado</option>
                                        <option value="1">En proceso</option>
                                        <option value="2">Terminado</option>
                                        <option value="3">Suspendido</option>
                                    </select>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default NuevoProyecto
