
import Header from '../../components/header'
import SpotifyProyecto from '../../Img/spotifyProyecto.jpg'
import TeamProyecto from '../../Img/team.png'
import SnapchatProyecto from '../../Img/snapchat.jpg'
import GooglePlay from '../../Img/googleplay.png'
import Instagram from '../../Img/instagram.png'
import ServidorProyecto from '../../Img/servidor.png'
import Financiamiento from '../../Img/financiamiento.png'
import SidebarAdmin from '../../components/SidebarAdmin'
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Modal from 'react-modal';
import Swal from 'sweetalert2'


function Proyecto() {
    const { proyectoId } = useParams();
    const [proyecto, setProyecto] = useState(null);
    const [editado, setEditado] = useState(false)
    const [nuevoNombre, setNuevoNombre] = useState('');
    const [nuevaDescripcion, setNuevaDescripcion] = useState('');
    const [nuevaFechaFin, setNuevaFechaFin] = useState(null)
    const [nuevoEstado, setNuevoEstado] = useState()
    const [modalIsOpen, setModalIsOpen] = useState(false);

    //Para mostrar
    const formatearFecha = (fecha) => {
        const fechaOriginal = new Date(fecha);
        const opcionesDeFormato = {
            year: "numeric",
            month: "long",
            day: "numeric"
        };
        const fechaFormateada = fechaOriginal.toLocaleDateString("es-ES", opcionesDeFormato);
        return fechaFormateada;
    }

    //Formatear como yyyy-mmm-dd
    function formatearFecha2(fecha) {
        const date = new Date(fecha);

        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2); // Months are zero-based
        const day = ('0' + date.getDate()).slice(-2);

        const fechaFormateada = `${year}-${month}-${day}`;
        return fechaFormateada;
    }

    const handleEliminarProyecto = async () => {
        alert("Haz eliminado este proeycto");
        try {
            const response = await fetch(`https://localhost:4000/proyectos/${proyectoId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (response.ok) {
                console.log(response)
            } else {
                console.error('Error al obtener los detalles del proyecto');
            }
        } catch (error) {
            console.error('Error de red al obtener los detalles del proyecto', error);
        }
    };

    const closeModal = () => {
        // Cierra el modal
        setModalIsOpen(false);
    };

    const handleGuardarCambios = () => {
        console.log('Editar proyecto:', proyectoId);
        setNuevoNombre(proyecto.nombre);
        setNuevaDescripcion(proyecto.descripcion);
        setNuevaFechaFin(formatearFecha2(proyecto.fecha_fin));
        (proyecto.estado === "En proceso") ? setNuevoEstado(1) : (proyecto.estado === "Terminado") ? setNuevoEstado(2) : (proyecto.estado === "Suspendido")
        console.log(nuevoNombre, nuevaDescripcion, nuevaFechaFin, nuevoEstado)
        // Lógica para guardar los cambios
        setModalIsOpen(true);
        // Cierra el modal
        setEditado(!editado)
    };



    useEffect(() => {
        const fetchProyectoDetails = async () => {
            try {
                const response = await fetch(`https://localhost:4000/proyectos/${proyectoId}`);
                if (response.ok) {
                    const data = await response.json();
                    setProyecto(data);
                } else {
                    console.error('Error al obtener los detalles del equipo');
                }
            } catch (error) {
                console.error('Error de red al obtener los detalles del equipo', error);
            }
        };
        fetchProyectoDetails();
    }, [proyectoId]);

    const handleEditarproyecto = async () => {
        console.log(nuevoNombre);
        console.log(nuevaDescripcion);
        console.log(nuevaFechaFin);
        console.log(nuevoEstado);
        if (nuevoNombre.trim() === "" || nuevaDescripcion.trim() === "" || nuevaFechaFin.trim() === "" || nuevoEstado.trim() === "") {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Por favor, complete todos los campos.',
            })
            return;
        }
        try {
            const response = await fetch(`https://localhost:4000/proyectos/${proyectoId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nombre: nuevoNombre,
                    descripcion: nuevaDescripcion,
                    fecha_fin: nuevaFechaFin,
                    estado: nuevoEstado,
                }),
            });

            if (response.ok) {
                console.log('Proyecto editado con éxito:', proyectoId);
                alert('Proyecto editado con éxito');
                // Cierra el modal después de que la solicitud PUT sea exitosa
                setModalIsOpen(false);
            } else {
                console.error('Error al editar el equipo');
            }
        } catch (error) {
            console.error('Error de red al editar el equipo', error);
        }
    };


    if (!proyecto) {
        return (
            <div className='bg-slate-50 min-h-screen flex flex-col items-center justify-center'>
                {/* Mostrar que no se ha encontrado el elemento solicitado */}
                <p className='text-3xl font-semibold italic text-gray-800'>
                    ¡Ups! No se encontró el elemento solicitado
                </p>
                <Link to="/proyectos">
                    <button className='bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md mt-6 focus:outline-none focus:ring focus:border-blue-300'>
                        Volver al listado
                    </button>
                </Link>
            </div>

        );
    }

    return (
        <div className='bg-slate-50'>
            <Header area={"Editanto proyecto"} />
            <div className='flex'>
                <SidebarAdmin />
                <div className='w-full h-full'>
                    <div className='w-full h-full'>
                        <div className='bg-white my-3 w-full h-20 flex justify-between shadow'>
                            <h1 className='text-2xl font-semibold  p-5'>PROYECTO: {proyecto.nombre}</h1>
                            <div className='flex space-x-4 p-5'>
                                <button onClick={handleGuardarCambios} className='bg-blue-500 text-white px-4 py-2 rounded-md'>
                                    Editar
                                </button>
                                <button onClick={handleEliminarProyecto} className='bg-red-500 text-white px-4 py-2 rounded-md'>
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
                                        src={SpotifyProyecto}
                                        className="h-82 w-full  object-cover rounded-lg shadow-[0_10px_20px_rgba(39,_245,_62,_0.8)]"
                                    />
                                </div>


                            </div>

                            <div className='flex items-center'>
                                <div className='ml-8 mr-4'>
                                    <div className="flex">
                                        <img
                                            src={SnapchatProyecto}
                                            alt="Imagen 1"
                                            className="w-1/3 h-auto object-cover  rounded-lg shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]"
                                        />
                                        <img
                                            src={Instagram}
                                            alt="Imagen 2"
                                            className="w-1/3 h-auto object-cover ml-2 rounded-lg shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]"
                                        />
                                        <div className='ml-2 relative'>
                                            <img
                                                src={GooglePlay}
                                                alt="Imagen 3"
                                                className="h-36 w-64 rounded-lg shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]"
                                            />
                                            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center opacity-55 bg-black rounded-lg">
                                                <p className="text-white text-center p-2">More</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* ladoDerecho */}
                        <div className='w-1/2'>
                            <div className='ml-8 mb-4 mr-12 mt-6 '>
                                <p className="text-lg font-bold">Nombre: {proyecto.nombre}</p>
                                <p className="text-sm text-justify font-light"> Descripción:
                                    {" " + proyecto.descripcion}
                                </p>

                                <p className="text-lg font-bold mt-8">Información </p>
                                <ul className='list-none font-light'>
                                    <li>Equipos:</li>
                                    <li>Miembros:</li>
                                    <li>Fecha de Entrega: {formatearFecha(proyecto.fecha_fin)}</li>
                                    <li>Recursos y Activos:</li>
                                </ul>
                            </div>
                            <div className=" flex mb-8 p-4  mr-8 ml-8 shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.20)]">
                                <div>
                                    <img src={TeamProyecto} className='ml-2' />
                                </div>

                                <div className='flex items-center ml-8 '>Equipo de Computo</div>

                            </div>

                            <div className=" flex mb-8  p-4  mr-8 ml-8 shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.20)]">
                                <div>
                                    <img src={ServidorProyecto} className='ml-2' />
                                </div>

                                <div className='flex items-center ml-8 '>Servidor</div>

                            </div>
                            <div className=" flex mb-8  p-4  mr-8 ml-8 shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.20)]">
                                <div>
                                    <img src={Financiamiento} className='ml-2' />
                                </div>
                                <div className='flex items-center ml-8 '>Financiamiento de $1000 MXN</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Editar Proyecto"
                className="bg-white rounded-lg shadow-lg p-6 w-96 sm:w-1/2 m-auto my-52 flex flex-col justify-center align-middle"
                overlayClassName="modal-overlay fixed inset-0 bg-gray-500 bg-opacity-75"
            >
                {/* Contenido del Modal de Edición */}
                <div className="modal-inner p-6 bg-white rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold mb-4">Editar Proyecto</h2>
                    {/* Campos de edición */}
                    <div className="form-group mb-4">
                        <label className="text-sm text-gray-600">Nuevo Nombre del proyecto:</label>
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
                    <div className="form-group mb-4">
                        <label className="text-sm text-gray-600">Nueva Fecha de Entrega:</label>
                        <input
                            type="date"
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                            value={nuevaFechaFin}
                            onChange={(e) => setNuevaFechaFin(e.target.value)}
                        />
                    </div>
                    <div className="form-group mb-4">
                        <select className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            value={nuevoEstado}
                            onChange={(e) => setNuevoEstado(Number(e.target.value))}
                        >
                            <option selected>Seleccionar Estado</option>
                            <option value="1">En proceso</option>
                            <option value="2">Terminado</option>
                            <option value="3">Suspendido</option>
                        </select>
                    </div>

                    {/* <div className="form-group mb-6">
                        <label className="text-sm text-gray-600">Nuevo Proyecto:</label>
                        <input
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                            value={nuevoProyecto}
                            onChange={(e) => setNuevoProyecto(e.target.value)}
                        />
                    </div> */}
                    {/* Botón de guardar cambios */}
                    <button
                        onClick={handleEditarproyecto}
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

    )
}

export default Proyecto
