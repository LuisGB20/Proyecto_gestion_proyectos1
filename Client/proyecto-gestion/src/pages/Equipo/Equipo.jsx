
import Header from '../../components/header'
import TeamProyecto from '../../Img/team.png'
import EquipoPortada from '../../Img/equipoPortada.jpg'
import Miembro1 from '../../Img/miembro1.jpg'
import RolesEquipo from '../../Img/rolesEquipo.png'
import AsignacionEquipo from '../../Img/asignacion.png'
import SidebarAdmin from '../../components/SidebarAdmin'
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Modal from 'react-modal';
import Swal from 'sweetalert2'


function Equipo() {
    const { equipoId } = useParams();
    const [miembros, setMiembros] = useState([])
    const [equipo, setEquipo] = useState();
    const [editado, setEditado] = useState(false)
    const [nuevoNombre, setNuevoNombre] = useState('');
    const [nuevaDescripcion, setNuevaDescripcion] = useState('');
    const [nuevoProyecto, setNuevoProyecto] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false);



    const handleEliminarEquipo = async () => {
        try {
            const response = await fetch(`https://localhost:4000/equipos/${equipoId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (response.ok) {
                console.log(response)
            } else {
                console.error('Error al obtener los detalles del equipo');
            }
        } catch (error) {
            console.error('Error de red al obtener los detalles del equipo', error);
        }
    };

    const closeModal = () => {
        // Cierra el modal
        setModalIsOpen(false);
    };

    const handleGuardarCambios = () => {
        console.log(equipo);
        console.log('Editar equipo:', equipoId);
        setNuevoNombre(equipo[0].equipoNombre);
        setNuevaDescripcion(equipo[0].equipoDescripcion);
        console.log(nuevoNombre, nuevaDescripcion);
        // Lógica para guardar los cambios
        setModalIsOpen(true);
        // Cierra el modal
        setEditado(!editado)

    };

    const fetchEquipoDetails = async () => {
        try {
            const response = await fetch(`https://localhost:4000/equipos/${equipoId}`);
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setEquipo(data);
                // Directamente asigna la lista de miembros al estado
                setMiembros(data.map(item => ({ miembro: item.miembros, idUsuario: item.idUsuario })));

            } else {
                console.error('Error al obtener los detalles del equipo');
            }
        } catch (error) {
            console.error('Error de red al obtener los detalles del equipo', error);
        }
    };


    useEffect(() => {
                fetchEquipoDetails()
    }, []);

    const handleEditarEquipo = async () => {
        if (nuevoNombre.trim() === "" || nuevaDescripcion.trim() === "") {
            Swal.fire({
                icon: 'warning',
                title: 'Por favor, complete todos los campos',
                confirmButtonText: 'Aceptar',
            }
            )
            return;
        }
        try {
            const response = await fetch(`https://localhost:4000/equipos/${equipoId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nombre: nuevoNombre,
                    descripcion: nuevaDescripcion,
                }),
            });
            if (response.ok) {
                console.log('Equipo editado con éxito:', equipoId);
                // Cierra el modal después de que la solicitud PUT sea exitosa
                setModalIsOpen(false);

            } else {
                console.error('Error al editar el equipo');
            }
        } catch (error) {
            console.error('Error de red al editar el equipo', error);
        }
    };


    //Formatear como yyyy-mmm-dd
    function formatearFecha2(fecha) {
        const date = new Date(fecha);
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2); // Months are zero-based
        const day = ('0' + date.getDate()).slice(-2);
        const fechaFormateada = `${year}-${month}-${day}`;
        return fechaFormateada;
    }

    return (

        <div className='bg-slate-50'>
            {!equipo ? (
                <div className='bg-slate-50 min-h-screen flex flex-col items-center justify-center'>
                    {/* Mostrar que no se ha encontrado el elemento solicitado */}
                    <p className='text-3xl font-semibold italic text-gray-800'>
                        ¡Ups! No se encontró el elemento solicitado
                    </p>
                    <Link to="/equipos">
                        <button className='bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md mt-6 focus:outline-none focus:ring focus:border-blue-300'>
                            Volver al listado
                        </button>
                    </Link>
                </div>
            ) : (
                <div>
                    <Header area={`Información del equipo`} />
                    <div className='flex'>
                        <SidebarAdmin />
                        <div className='w-full h-full'>
                            <div className='w-full h-full'>
                                <div className='bg-white my-3 w-full h-20 flex justify-between shadow'>
                                    <h1 className='text-2xl font-semibold  p-5'>EQUIPO: {equipo[0].equipoNombre}</h1>
                                    <div className='flex space-x-4 p-5'>
                                        <button onClick={handleGuardarCambios} className='bg-blue-500 text-white px-4 py-2 rounded-md'>
                                            Editar
                                        </button>
                                        <button onClick={handleEliminarEquipo} className='bg-red-500 text-white px-4 py-2 rounded-md'>
                                            Eliminar
                                        </button>
                                    </div>
                                </div>
                            </div>
                            {/*todo el body  */}
                            <div className='flex'>
                                {/* ladoIzquiero */}
                                <div className='w-1/2'>

                                    <div className='flex items-center'>
                                        <div className="mb-4 ml-8 mt-4">
                                            <img
                                                src={EquipoPortada}
                                                className="h-120 w-full  object-cover rounded-lg shadow-[0_10px_20px_rgba(39,_245,146,_0.8)]"
                                            />
                                        </div>
                                    </div>
                                    <div className='ml-8 mb-4 mt-4 font-semibold'>Miembros</div>
                                    <div className='flex items-center'>
                                        <div className='ml-8 mr-4'>
                                            <div className="flex">
                                                {(miembros.length > 0 || !miembros) ? (miembros.map((miembro) => (
                                                    <Link to={`/miembro/${miembro.idUsuario}`}>
                                                        <img
                                                            src={Miembro1}
                                                            alt="Imagen 1"
                                                            className="w-32 h-auto object-cover  rounded-lg shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]"
                                                        />
                                                    </Link>

                                                ))) : (
                                                    null
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                {/* ladoDerecho */}

                                <div className='w-1/2'>

                                    <div className='ml-8 mb-4 mr-12 mt-6 '>
                                        <p className="text-2xl font-semibold italic">Descripción del Equipo</p>
                                        <p className="text-xl text-justify font-light">
                                            {equipo[0].equipoDescripcion}
                                        </p>

                                        <p className="text-lg font-bold mt-8">Información </p>
                                        <ul className='list-none font-light text-2xl'>
                                            <li>Proyecto: {equipo[0].proyectoNombre}</li>
                                            <li>Miembros:</li>
                                            {
                                                (miembros[0].idUsuario !== null ) ? (miembros.map((miembro, index) => (
                                                    <h2 key={index} className='italic'>
                                                        -{miembro.miembro}
                                                    </h2>
                                                ))) : (
                                                    <p>No hay miembros</p>
                                                )
                                            }
                                            <li>Fecha de Inicio: {formatearFecha2(equipo[0].fecha_inicio)}</li>
                                        </ul>
                                    </div>
                                    <Link to={`/Tareas/${equipoId}`} className=" flex my-8 h-20 p-4  mr-8 ml-8 shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.20)] hover:scale-105 transition duration-300">
                                        <div>
                                            <img src={AsignacionEquipo} className='ml-2 w-12 h-12' />
                                        </div>
                                        <div className='flex items-center ml-8 text-2xl font-normal italic'>Asignaciones</div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={closeModal}
                        contentLabel="Editar Equipo"
                        className="bg-white rounded-lg shadow-lg p-6 w-96 sm:w-1/2 m-auto my-52 flex flex-col justify-center align-middle"
                        overlayClassName="modal-overlay fixed inset-0 bg-gray-500 bg-opacity-75"
                    >
                        {/* Contenido del Modal de Edición */}
                        <div className="modal-inner p-6 bg-white rounded-lg shadow-lg">
                            <h2 className="text-2xl font-semibold mb-4">Editar Equipo</h2>
                            {/* Campos de edición */}
                            <div className="form-group mb-4">
                                <label className="text-sm text-gray-600">Nuevo Nombre del Equipo:</label>
                                <input
                                    type="text"
                                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                    value={nuevoNombre}
                                    onChange={(e) => setNuevoNombre(e.target.value)}
                                />
                            </div>
                            <div className="form-group mb-4">
                                <label className="text-sm text-gray-600">Nueva Descripción:</label>
                                <textarea
                                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                    value={nuevaDescripcion}
                                    onChange={(e) => setNuevaDescripcion(e.target.value)}
                                />
                            </div>
                            <button
                                onClick={handleEditarEquipo}
                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                            >
                                Guardar Cambios
                            </button>
                            {/* Botón de cerrar modal */}
                            <button
                                onClick={closeModal}
                                className="ml-4 bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                            >
                                Cerrar
                            </button>
                        </div>
                    </Modal>
                </div>
            )}
        </div>
    )
}

export default Equipo
