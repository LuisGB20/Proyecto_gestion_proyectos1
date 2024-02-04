import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/header';
import SidebarAdmin from '../../components/SidebarAdmin';
import Modal from 'react-modal';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';

function Tareas() {

    const fechaAhora = new Date();
    const fechaActual = fechaAhora.toISOString().slice(0, 10);
    const { equipoId } = useParams();
    const [tareas, setTareas] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisibleAgregar, setModalVisibleAgregar] = useState(false);
    const [tareaSeleccionada, setTareaSeleccionada] = useState(null);
    const [nuevaTarea, setNuevaTarea] = useState({
        nombre: "",
        descripcion: "",
        fecha_inicio: fechaActual,
        fecha_fin: fechaActual,
        equipoId: Number(equipoId),
        usuario: null,
        estado: "En proceso",
    })


    //Formatear como yyyy-mmm-dd
    function formatearFecha2(fecha) {
        const date = new Date(fecha);
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2); // Months are zero-based
        const day = ('0' + date.getDate()).slice(-2);
        const fechaFormateada = `${year}-${month}-${day}`;
        return fechaFormateada;
    }


    //Obtener equipo
    const [equipo, setEquipo] = useState(null);
    const obtenerEquipo = async () => {
        await fetch(`https://localhost:4000/equipos/${equipoId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(data => {
                setEquipo(data);
                console.log(data);
            })
            .catch(error => {
                console.error('Error al obtener el equipo:', error);
            })
    }

    //Obtener miembros
    const [miembros, setMiembros] = useState([]);
    const obtenerMiembros = async () => {
        await fetch(`https://localhost:4000/usuariosEquipos/${equipoId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(data => {
                setMiembros(data);
                console.log(data);
            })
            .catch(error => { console.log(error) })
    }



    // Función para obtener las tareas del equipo
    const obtenerTareas = async () => {
        await fetch(`https://localhost:4000/tareas/equipo/${equipoId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(data => {
                setTareas(data);
                console.log(data);
            })
            .catch(error => { console.log(error) })

    };

    // Función para abrir el modal de edición
    const mostrarModalEdicion = (tarea) => {
        setTareaSeleccionada(tarea);
        setModalVisible(true);
    };

    // Función para cerrar el modal de edición
    const cerrarModal = () => {
        setTareaSeleccionada(null);
        setModalVisible(false);
    };

    const mostartModalAgregar = () => {
        setModalVisibleAgregar(true);
    }

    const cerrarModalAgregar = () => {
        setModalVisibleAgregar(false)
    }

    // Función para eliminar una tarea
    const eliminarTarea = (tarea) => {
        fetch(`https://localhost:4000/tareas/${tarea.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => {
                if (response.ok) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Tarea eliminada',
                        text: 'La tarea ha sido eliminada correctamente',
                    })
                    obtenerTareas();
                    cerrarModal();
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error al eliminar la tarea',
                        text: 'Ha ocurrido un error al eliminar la tarea',
                    })
                }
            })
            .then(data => {
                console.log(data);
            })
            .catch(error => { console.log(error) })
    };

    // Función para actualizar una tarea
    const actualizarTarea = () => {
        console.log({
            nombre: tareaSeleccionada.nombre,
            descripcion: tareaSeleccionada.descripcion,
            fecha_inicio: formatearFecha2(tareaSeleccionada.fecha_inicio),
            fecha_fin: formatearFecha2(tareaSeleccionada.fecha_fin),
            equipoId: Number(tareaSeleccionada.equipo_id),
            miembroId: Number(tareaSeleccionada.usuario_id),
            estado: tareaSeleccionada.estado,
        })
        fetch(`https://localhost:4000/tareas/${tareaSeleccionada.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nombre: tareaSeleccionada.nombre,
                descripcion: tareaSeleccionada.descripcion,
                fecha_inicio: formatearFecha2(tareaSeleccionada.fecha_inicio),
                fecha_fin: formatearFecha2(tareaSeleccionada.fecha_fin),
                equipoId: Number(tareaSeleccionada.equipo_id),
                usuario: Number(tareaSeleccionada.usuario_id),
                estado: tareaSeleccionada.estado,
            })
        })
            .then(response => {
                if (response.ok) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Tarea actualizada',
                        text: 'La tarea ha sido actualizada correctamente',
                    })
                    obtenerTareas();
                    cerrarModal();
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error al actualizar la tarea',
                        text: 'Ha ocurrido un error al actualizar la tarea',

                    })
                }
            })
            .then(data => { console.log(data) })
            .catch(error => { console.log(error) })
    };

    const agrearTarea = () => {
        console.log({
            nombre: nuevaTarea.nombre,
            descripcion: nuevaTarea.descripcion,
            fecha_inicio: formatearFecha2(nuevaTarea.fecha_inicio),
            fecha_fin: formatearFecha2(nuevaTarea.fecha_fin),
            equipoId: Number(nuevaTarea.equipoId),
            usuario: Number(nuevaTarea.usuario),
            estado: nuevaTarea.estado,
            proyecto_id: Number(equipo[0].ProyectoId)
        })
        fetch(`https://localhost:4000/tareas`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({
                nombre: nuevaTarea.nombre,
                descripcion: nuevaTarea.descripcion,
                fecha_inicio: formatearFecha2(nuevaTarea.fecha_inicio),
                fecha_fin: formatearFecha2(nuevaTarea.fecha_fin),
                estado: nuevaTarea.estado,
                usuario: Number(nuevaTarea.usuario),
                equipo: Number(nuevaTarea.equipoId),
                proyecto_id: Number(tareas[0].proyecto_id)
            })
        })
            .then(response => {
                if (response.ok) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Tarea agregada',
                        text: 'La tarea ha sido agregada correctamente',
                    })
                    obtenerTareas();
                    cerrarModalAgregar();
                    setNuevaTarea({
                        nombre: '',
                        descripcion: '',
                        fecha_inicio: '',
                        fecha_fin: '',
                        equipoId: null,
                        usuario: null,
                        estado: '',
                        proyecto_id: null,
                    })
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error al agregar la tarea',
                        text: 'Ha ocurrido un error al agregar la tarea',
                    })
                }
            })
            .catch(error => { console.log(error) })
    }

    useEffect(() => {
        obtenerTareas();
        obtenerEquipo();
        obtenerMiembros();
    }, []);


    return (
        <div className='w-full h-auto bg-slate-200'>
            <Header />
            <div className='w-full flex'>
                <SidebarAdmin />
                <div className='w-full h-full'>
                    <div className='bg-white my-3 w-full h-20 flex justify-between align-middle'>
                        <h1 className='text-2xl font-semibold italic p-5'>Tareas del Equipo: {equipo === null ? null : equipo.equipoNombre}</h1>
                        <button className='font-medium text-center text-lg italic bg-gradient-to-r from-[#1E4C6A]  to-[#1B7FC5] p-2 mx-5 my-5 rounded-lg text-white' onClick={mostartModalAgregar}>
                            Agregar nueva tarea
                        </button>
                    </div>
                    <div className='w-11/12 h-full rounded-2xl bg-white mx-auto'>
                        <div className='w-full h-[500px] m-10 mb-6 overflow-auto'>
                            {tareas.length > 0 ? (tareas.map((tarea) => (
                                <div key={tarea.id} className='border-2 w-11/12 h-40 mx-auto rounded-lg flex my-5 hover:cursor-pointer'>
                                    <p className='text-center text-md w-1/4 mx-auto font-semibold italic my-auto'>Nombre: {tarea.nombre}</p>
                                    <p className='text-center text-md w-1/4 mx-auto font-semibold italic my-auto'>Descripción: {tarea.descripcion}</p>
                                    <p className='text-center text-md w-1/4 mx-auto font-semibold italic my-auto'>Fecha Limite: {formatearFecha2(tarea.fecha_fin)}</p>
                                    <p className='text-center text-md w-1/4 mx-auto font-semibold italic my-auto'>Estado: {tarea.estado}</p>
                                    <div className='flex flex-col justify-center align-middle mx-3'>
                                        <button className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mx-auto h-10 my-auto' onClick={() => mostrarModalEdicion(tarea)}>
                                            Editar
                                        </button>
                                        <button className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 mx-auto  h-10 my-auto' onClick={() => eliminarTarea(tarea)}>
                                            Eliminar
                                        </button>
                                    </div>
                                </div>
                            ))) : (
                                    <p className='text-center text-2xl font-semibold italic my-40'>No hay tareas disponibles</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {/* Modal de Edición */}
            {modalVisible && (
                <Modal
                    isOpen={true} // Puedes gestionar la visibilidad del modal con un estado si es necesario
                    onRequestClose={cerrarModal}
                    contentLabel="Modal de Edición de Tarea"
                    className="w-1/2 mx-auto my-20"
                >
                    <div className="bg-white p-8 rounded-lg shadow-lg overflow-auto h-[600px]">
                        {/* Contenido del modal de edición */}
                        <h2 className="text-3xl font-bold my-4">Editar Tarea</h2>

                        {/* Campos de edición para la tarea */}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="titulo">
                                Título:
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="titulo"
                                type="text"
                                placeholder="Ingrese el título"
                                value={tareaSeleccionada.nombre}
                                onChange={(e) => setTareaSeleccionada({ ...tareaSeleccionada, nombre: e.target.value })}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="descripcion">
                                Descripción:
                            </label>
                            <textarea
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="descripcion"
                                placeholder="Ingrese la descripción"
                                value={tareaSeleccionada.descripcion}
                                onChange={(e) => setTareaSeleccionada({ ...tareaSeleccionada, descripcion: e.target.value })}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fecha_limite">
                                Fecha Inicio:
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="date"
                                value={formatearFecha2(tareaSeleccionada.fecha_inicio)}
                                onChange={(e) => setTareaSeleccionada({ ...tareaSeleccionada, fecha_inicio: e.target.value })}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fecha_limite">
                                Fecha Final:
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="date"
                                value={formatearFecha2(tareaSeleccionada.fecha_fin)}
                                onChange={(e) => setTareaSeleccionada({ ...tareaSeleccionada, fecha_fin: e.target.value })}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fecha_limite">
                                Estado:
                            </label>
                            <select className='border-2 border-gray-300 rounded-md text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none' >
                                <option value="En proceso" className='text-gray-800 font-normal bg-white hover:bg-gray-100'>En proceso</option>
                                <option value="Terminado" className='text-gray-800 font-normal bg-white hover:bg-gray-100'>Terminado</option>
                                <option value="Suspendido" className='text-gray-800 font-normal bg-white hover:bg-gray-100'>Suspendido</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fecha_limite">
                                Usuario:
                            </label>
                            <select className='border-2 border-gray-300 rounded-md text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none'
                                value={tareaSeleccionada.usuario_id}
                                onChange={(e) => setTareaSeleccionada({ ...tareaSeleccionada, usuario_id: e.target.value })}
                            >
                                {miembros.length > 0 ? (
                                    miembros.map((miembro, index) => (
                                        <option key={index} value={miembro.idUsuario} className='text-gray-800 font-normal bg-white hover:bg-gray-100'>{miembro.nombre + " " + miembro.apellido}</option>
                                    ))
                                ) : (
                                    <option value="" disabled className='text-gray-800 font-normal bg-white hover:bg-gray-100'>No hay miembros para asignar tareas</option>
                                )}
                            </select>
                        </div>
                        <div className='w-full mx-auto flex justify-between'>
                            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mx-auto" onClick={() => actualizarTarea()}>
                                Guardar Cambios
                            </button>
                            <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 mx-auto" onClick={() => cerrarModal()}>
                                Cancelar
                            </button>
                        </div>
                    </div>
                </Modal>
            )}
            <Modal
                isOpen={modalVisibleAgregar} // Puedes gestionar la visibilidad del modal con un estado si es necesario
                onRequestClose={cerrarModal}
                contentLabel="Modal de Edición de Tarea"
                className="w-1/2 mx-auto my-20"
            >
                <div className="bg-white p-8 rounded-lg shadow-lg overflow-auto h-[600px]">
                    {/* Contenido del modal de edición */}
                    <h2 className="text-3xl font-bold my-4">Agregar Tarea</h2>

                    {/* Campos de edición para la tarea */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="titulo">
                            Título:
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="titulo"
                            type="text"
                            placeholder="Ingrese el título"
                            value={nuevaTarea.nombre}
                            onChange={(e) => setNuevaTarea({ ...nuevaTarea, nombre: e.target.value })}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="descripcion">
                            Descripción:
                        </label>
                        <textarea
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="descripcion"
                            placeholder="Ingrese la descripción"
                            value={nuevaTarea.descripcion}
                            onChange={(e) => setNuevaTarea({ ...nuevaTarea, descripcion: e.target.value })}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fecha_limite">
                            Fecha Inicio:
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="date"
                            value={formatearFecha2(nuevaTarea.fecha_inicio)}
                            onChange={(e) => setNuevaTarea({ ...nuevaTarea, fecha_inicio: e.target.value })}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fecha_limite">
                            Fecha Final:
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="date"
                            value={formatearFecha2(nuevaTarea.fecha_fin)}
                            onChange={(e) => setNuevaTarea({ ...nuevaTarea, fecha_fin: e.target.value })}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fecha_limite">
                            Estado:
                        </label>
                        <select className='border-2 border-gray-300 rounded-md text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none' 
                        value={nuevaTarea.estado}
                        onChange={(e) => setNuevaTarea({...nuevaTarea, estado: e.target.value})}
                        >
                            <option value="En proceso" className='text-gray-800 font-normal bg-white hover:bg-gray-100'>En proceso</option>
                            <option value="Terminado" className='text-gray-800 font-normal bg-white hover:bg-gray-100'>Terminado</option>
                            <option value="Suspendido" className='text-gray-800 font-normal bg-white hover:bg-gray-100'>Suspendido</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fecha_limite">
                            Usuario:
                        </label>
                        <select className='border-2 border-gray-300 rounded-md text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none'
                        value={nuevaTarea.usuario}
                        onChange={(e) => setNuevaTarea({...nuevaTarea, usuario: (e.target.value)})}                        
                        >
                            {miembros.length > 0 ? (
                                miembros.map((miembro, index) => (
                                    <option key={index} value={miembro.id} className='text-gray-800 font-normal bg-white hover:bg-gray-100'>{miembro.nombre + " " + miembro.apellido}</option>
                                ))
                            ) : (
                                <option value="" disabled className='text-gray-800 font-normal bg-white hover:bg-gray-100'>No hay miembros para asignar tareas</option>
                            )}
                        </select>
                    </div>
                    <div className='w-full mx-auto flex justify-between'>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mx-auto" onClick={() => agrearTarea()}>
                            Guardar Cambios
                        </button>
                        <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 mx-auto" onClick={() => cerrarModalAgregar()}>
                            Cancelar
                        </button>
                    </div>
                </div>
            </Modal>

        </div>
    );
}

export default Tareas;
