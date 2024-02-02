import React, { useState, useEffect } from "react"
import Header from "../../components/header"
import SidebarMiDashboard from "../../components/SidebarMiDashboard"
import TarjetasActivas from "./components/TarjetasActivas"
import Modal from 'react-modal';



function SolicitudActivos() {
    const [recursos, setRecursos] = useState([]);
    const [recurso, setRecurso] = useState({});
    const [activos, setActivos] = useState([]);
    const usuario = JSON.parse(sessionStorage.getItem('usuario'))
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [agregarRecursoValores, setAgregarRecursoValores] = useState({
        nombre: "", 
        descripcion: "", 
        disponibilidad: null, 
        tipo: null, 
        categoria_id: null
    })

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const obtenerRecursos = () => {
        fetch('https://localhost:4000/recursos') // Reemplaza con la URL real de tu API
            .then(response => response.json())
            .then(data => {
                setRecursos(data);
            })
            .catch(error => {
                console.error('Error al obtener recursos:', error);
            });
    };

    const agregarRecurso = (recurso) => {
        setActivos([...activos, recurso]);
        console.log(activos);
        closeModal();
    }

    const crearRecurso = () => {
        fetch('https://localhost:4000/recursos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nombre: agregarRecursoValores.nombre,
                descripcion: agregarRecursoValores.descripcion,
                disponibilidad: agregarRecursoValores.disponibilidad,
                tipo: agregarRecursoValores.tipo,
                categoria_id: agregarRecursoValores.categoria_id
            }),
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                agregarRecurso(data);
                alert('Recurso agregado correctamente.');
                setAgregarRecursoValores({
                    nombre: "",
                    descripcion: "",
                    disponibilidad: null,
                    tipo: null,
                    categoria_id: null
                })
            })
            .catch(error => {
                console.error('Error al crear el recurso:', error);
            });
    }

    const handleSubmit = (e) => {
        console.log()
        e.preventDefault();
        console.log(recurso);

        fetch('https://localhost:4000/solicitudes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                miembro: usuario.id,
                equipo: usuario.equipo,
                recurso: recurso.nombre
            }),
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error('Error al enviar la solicitud:', error);
            });
    };


    useEffect(() => {
        obtenerRecursos();
    }, []);

    return (
        <div className='w-full h-full bg-slate-200'>
            <Header />
            <div className='flex w-full h-full'>
                <SidebarMiDashboard />
                <div className='w-full'>
                    <div className='bg-white my-3 w-full h-20 flex justify-between'>
                        <h1 className='text-2xl font-semibold italic p-5'>Recursos y Activos</h1>
                        <button
                            className='bg-gradient-to-r from-[#1E4C6A] to-[#1B7FC5] text-white rounded p-2 mx-5 h-16 my-auto'
                            onClick={openModal}
                        >
                            Agregar Mensaje
                        </button>                        </div>
                    <div className='flex w-full h-auto'>
                        <div className='w-1/2 m-5 bg-white rounded-2xl'>
                            <div className=" overflow-auto w-full my-5 flex justify-center align-middle">
                                {activos.length > 0 ? (
                                    <div className="w-full h-[33rem] m-auto">
                                        {activos.map((activo, index) => (
                                            <div key={index} className='flex flex-col w-11/12 mx-auto h-auto rounded-2xl bg-white'>
                                                <TarjetasActivas recurso={activo} />
                                            </div>
                                        ))}
                                        <div className="flex">
                                            <button onClick={handleSubmit} className='bg-blue-500 text-white font-semibold w-4/12 h-10 rounded-lg mx-auto mt-5'>Enviar Solicitud</button>
                                            <button onClick={() => setActivos([])} className='bg-red-500 text-white font-semibold w-4/12 h-10 rounded-lg mx-auto mt-5'>Limpiar Solicitud</button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="w-full mx-auto">
                                        <p className=" mx-auto text-center text-xl font-semibold my-20">No hay activos seleccionados.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className='w-1/2 h-full rounded-2xl m-5 bg-white'>
                            <h1 className='text-2xl font-semibold italic p-5'>Inventario de recursos</h1>
                            <div className='h-[515px] overflow-y-auto'>
                                {
                                    recursos.length > 0 ? (
                                        <div>
                                            {recursos.map((recurso, index) => (
                                                <div key={index} className='flex flex-col w-full h-auto my-5 mx-5 rounded-2xl bg-white'
                                                    onClick={(e) => {
                                                        agregarRecurso(recurso)
                                                        setRecurso({
                                                            nombre: recurso.id,
                                                        })
                                                    }}
                                                >
                                                    <TarjetasActivas recurso={recurso} setearActivos={setActivos} activos={activos} />
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p>No hay recursos disponibles.</p>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel='Agregar, Editar o Eliminar Mensaje'
                className='bg-white rounded-lg shadow-lg p-6 w-96 sm:w-1/2 m-auto my-52 flex flex-col justify-center align-middle'
            >
                <div className='bg-white rounded-lg'>
                    <div className='w-full flex justify-end'>
                        <button
                            className='bg-red-500 text-white rounded px-4 py-2'
                            onClick={closeModal}
                        >
                            X
                        </button>
                    </div>
                    <h1 className='text-2xl font-semibold mb-4'>Agregar recurso</h1>
                    <input
                        className='w-full border-2 rounded-md p-2 mb-4'
                        placeholder='Nombre del recurso'
                        value={agregarRecursoValores.nombre}
                        onChange={(e) => setAgregarRecursoValores({ ...agregarRecursoValores, nombre: e.target.value })}
                    />
                    <input
                        className='w-full border-2 rounded-md p-2 mb-4'
                        placeholder='Descripcion del recurso'
                        value={agregarRecursoValores.descripcion}
                        onChange={(e) => setAgregarRecursoValores({ ...agregarRecursoValores, descripcion: e.target.value })}
                    />
                    <input
                        className='w-full border-2 rounded-md p-2 mb-4'
                        placeholder='Disponibilidad del recurso'
                        value={agregarRecursoValores.disponibilidad}
                        onChange={(e) => setAgregarRecursoValores({ ...agregarRecursoValores, disponibilidad: e.target.value })}
                    />
                    <input
                        className='w-full border-2 rounded-md p-2 mb-4'
                        placeholder='Tipo del recurso'
                        value={agregarRecursoValores.tipo}
                        onChange={(e) => setAgregarRecursoValores({ ...agregarRecursoValores, tipo: e.target.value })}
                    />
                    <input
                        className='w-full border-2 rounded-md p-2 mb-4'
                        placeholder='Categoria del recurso'
                        value={agregarRecursoValores.categoria_id}
                        onChange={(e) => setAgregarRecursoValores({ ...agregarRecursoValores, categoria_id: e.target.value })}
                    />
                    <div className='flex justify-end'>
                        <button
                            className='bg-gradient-to-r from-[#1E4C6A] to-[#1B7FC5] text-white rounded px-4 py-2 mr-2'
                            onClick={crearRecurso}
                        >
                            Agregar
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default SolicitudActivos
