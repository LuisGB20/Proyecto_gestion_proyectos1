import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Header from '../../components/header';
import SidebarAdmin from '../../components/SidebarAdmin';
import Modal from 'react-modal';
import Swal from 'sweetalert2';
import TarjetaRecursoProyecto from './components/TarjetaRecursoProyecto';

function RecursosProyecto() {
    const { proyectoId } = useParams();
    const [recursosActivos, setRecursosActivos] = useState([]);
    const [recursoActivoSeleccionado, setRecursoActivoSeleccionado] = useState(null);

    // Función para obtener recursos y activos
    const obtenerRecursosActivos = () => {
        fetch(`https://localhost:4000/recursos/proyecto/${proyectoId}`)
            .then((response) => response.json())
            .then((data) => {
                if(data.message === "No hay recursos disponibles"){
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'No hay recursos disponibles',
                        confirmButtonText: 'OK'
                    })
                    return;
                } else {
                    setRecursosActivos(data)
                }
                console.log(data)
            })
            .catch((error) => console.error(error));
    };

    const eliminarRecurso = () => {
        fetch(`https://localhost:4000/recursos/${recursoActivoSeleccionado.Idrecurso}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                if (response.ok) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Recurso eliminado',
                        text: 'El recurso ha sido eliminado correctamente',
                        confirmButtonText: 'OK'
                    })
                    obtenerRecursosActivos();
                    cerrarModal();
                } else {
                    console.error('Error al eliminar el recurso');
                }
            }
            )
            .catch((error) => {
                console.error('Error al eliminar el recurso:', error);
            })
    }

    useEffect(() => {
        obtenerRecursosActivos();
    }, []);

    return (
        <div className='w-full h-auto bg-slate-200'>
            <Header />
            <div className='w-full flex'>
                <SidebarAdmin />
                {recursosActivos.length === 0 ? (
                    <div className='w-full h-[715px] flex justify-center align-middle'>
                        <h1 className='text-2xl font-semibold italic p-5 m-auto'>No hay recursos o activos para mostrar</h1>
                    </div>
                ) : (
                    <div className='w-full h-full'>

                        <div className='bg-white my-3 w-full h-20 flex justify-between align-middle'>
                            <h1 className='text-2xl font-semibold italic p-5'>Recursos y Activos del proyecto: {recursosActivos[0].nombreProyecto}</h1>
                            {/* <button className='font-medium text-center text-lg italic bg-gradient-to-r from-[#1E4C6A]  to-[#1B7FC5] p-2 mx-5 my-5 rounded-lg text-white' onClick={() => mostrarModalAgregar()}>
                                Agregar nuevo recurso o activo
                            </button> */}
                        </div>
                        <div className='w-11/12 h-full rounded-2xl bg-white mx-auto'>
                            <div className='w-full h-[560px] m-10 mb-6 overflow-auto'>
                                {recursosActivos.map((recursoActivo) => (
                                    <TarjetaRecursoProyecto
                                        key={recursoActivo.Idrecurso} // Asegúrate de proporcionar un identificador único para cada recurso/activo
                                        recurso={recursoActivo}
                                        onEditar={() => mostrarModalEdicion(recursoActivo)}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default RecursosProyecto;
