import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/header';
import SidebarAdmin from '../../components/SidebarAdmin';
import Modal from 'react-modal';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';

function TareasProyecto() {

    const fechaAhora = new Date();
    const fechaActual = fechaAhora.toISOString().slice(0, 10);
    const { proyectoId } = useParams();
    const [tareas, setTareas] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisibleAgregar, setModalVisibleAgregar] = useState(false);
    const [tareaSeleccionada, setTareaSeleccionada] = useState(null);

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
    const [proyecto, setProyecto] = useState(null);
    const obtenerEquipo = async () => {
        await fetch(`https://localhost:4000/proyectos/${proyectoId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(data => {
                setProyecto(data);
            })
            .catch(error => {
                console.error('Error al obtener el equipo:', error);
            })
    }

    // Función para obtener las tareas del equipo
    const obtenerTareas = async () => {
        await fetch(`https://localhost:4000/tareas/asignaciones/proyecto/${proyectoId}`, {
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

    useEffect(() => {
        obtenerTareas();
        obtenerEquipo();
    }, []);


    return (
        <div className='w-full h-auto bg-slate-200'>
            <Header />
            <div className='w-full flex'>
                <SidebarAdmin />
                <div className='w-full h-full'>
                    <div className='bg-white my-3 w-full h-20 flex justify-between align-middle'>
                        <h1 className='text-2xl font-semibold italic p-5'>Tareas del proyecto: {proyecto === null ? null : proyecto.nombre}</h1>
                        {/* <button className='font-medium text-center text-lg italic bg-gradient-to-r from-[#1E4C6A]  to-[#1B7FC5] p-2 mx-5 my-5 rounded-lg text-white' onClick={mostartModalAgregar}>
                            Agregar nueva tarea
                        </button> */}
                    </div>
                    <div className='w-11/12 h-full rounded-2xl bg-white mx-auto'>
                        <div className='w-full h-[500px] m-10 mb-6 overflow-auto'>
                            {tareas.length > 0 ? (tareas.map((tarea) => (
                                <Link to={``} key={tarea.id} className='border-2 w-11/12 h-40 mx-auto rounded-lg flex my-5 hover:cursor-pointer'>
                                    <p className='text-center text-md w-1/4 mx-auto font-semibold italic my-auto'>Nombre: {tarea.nombre}</p>
                                    <p className='text-center text-md w-1/4 mx-auto font-semibold italic my-auto'>Descripción: {tarea.descripcion}</p>
                                    <p className='text-center text-md w-1/4 mx-auto font-semibold italic my-auto'>Fecha Limite: {formatearFecha2(tarea.fecha_fin)}</p>
                                    <p className='text-center text-md w-1/4 mx-auto font-semibold italic my-auto'>Estado: {tarea.estado}</p>
                                    <p className='text-center text-md w-1/4 mx-auto font-semibold italic my-auto'>Equipo: {tarea.equipo_id}</p>
                                    <div className='flex flex-col justify-center align-middle mx-3'>
                                    </div>
                                </Link>
                            ))) : (
                                    <p className='text-center text-2xl font-semibold italic my-40'>No hay tareas disponibles</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TareasProyecto;
