import React, { useEffect, useState } from 'react';
import Header from '../../components/header';
import SidebarMiDashboard from '../../components/SidebarMiDashboard';
import Mensaje from './components/Mensaje';
import Modal from 'react-modal';
import Swal from 'sweetalert2';

function TableroMiembros() {
    const [actualizar, setActualizar] = useState(false)
    const [mensaje, setMensaje] = useState("");
    const [nuevoMensaje, setNuevoMensaje] = useState('');
    const [mensajes, setMensajes] = useState([]);
    const usuario = JSON.parse(sessionStorage.getItem('usuario'));
    const id = usuario.id;
    const equipo = usuario.equipo;

    const [isModalOpen, setModalOpen] = useState(false);

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const obtenerMensajes = () => {
        fetch(`https://localhost:4000/comentarios/${equipo}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setMensajes(data);
            })
            .catch(error => {console.log(error)})
    };


    const handleAgregarMensaje = () => {
        fetch('https://localhost:4000/comentarios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                usuario: id,
                equipo: equipo,
                mensaje: mensaje,
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setMensaje({ mensaje: '' }); // Limpiar el input de mensaje después de agregar el mensaje.
                Swal.fire({
                    icon: 'success',
                    title: 'Mensaje agregado correctamente',
                    showConfirmButton: true,
                    confirmButtonText: 'Ok',

                })
                setActualizar(!actualizar)
                obtenerMensajes()
            })
            .catch(error => {
                console.error(error);
                alert('Error al agregar el mensaje.'); // Mostrar un mensaje de error.
            })
        handleCloseModal();
    };

    const handleEditarMensaje = (id, mensaje) => {
        console.log(id)
        console.log(mensaje)
        fetch(`https://localhost:4000/comentarios/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({
                mensaje: mensaje,
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                Swal.fire({
                    icon: 'success',
                    title: 'Mensaje editado correctamente',
                    showConfirmButton: true,
                    confirmButtonText: 'Ok',

                })
                setActualizar(!actualizar)
                obtenerMensajes()
            })
            .catch(error => {
                console.error(error);
            })
        handleCloseModal();
    };

    const handleEliminarMensaje = (id) => {
        console.log(id)
        fetch(`https://localhost:4000/comentarios/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            Swal.fire({
                icon: 'success',
                title: 'Mensaje eliminado correctamente',
                showConfirmButton: true,
                confirmButtonText: 'Ok',
            })
            setActualizar(!actualizar)
            obtenerMensajes()
        })
        .catch(error => {
            console.error(error);
        })
    };

    useEffect(() => {
        obtenerMensajes();
    }, [actualizar]);

    return (
        <div className='w-full h-full bg-slate-200'>
            <Header area={'Mi dashboard'} />
            <div className='w-full h-full flex'>
                <SidebarMiDashboard />
                <div className='w-full h-full'>
                    <div className='bg-white my-3 w-full h-20 flex justify-between'>
                        <h1 className='text-2xl font-semibold italic p-5 my-auto'>Tablero de miembros</h1>
                        <button
                            className='bg-gradient-to-r from-[#1E4C6A] to-[#1B7FC5] text-white rounded p-2 mx-5 h-16 my-auto'
                            onClick={handleOpenModal}
                        >
                            Agregar Mensaje
                        </button>
                    </div>
                    <div className='w-11/12 h-full rounded-2xl bg-white mx-auto'>
                        <h1 className='m-5 p-5 font-semibold italic text-xl'>Chat del equipo</h1>
                        <div className='w-full h-[515px] m-5 overflow-auto'>
                            {mensajes.length > 0 ? (
                                mensajes.map(mensaje => (
                                    <Mensaje
                                        key={mensaje.id}
                                        mensaje={mensaje}
                                        handleEditarMensaje={handleEditarMensaje}
                                        handleEliminarMensaje={handleEliminarMensaje}
                                        setearNuevoMensaje={setNuevoMensaje}
                                    />
                                ))
                            ) : (
                                <h1 className='font-semibold text-2xl mx-auto text-center'>No hay mensajes disponibles.</h1>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <Modal
                isOpen={isModalOpen}
                onRequestClose={handleCloseModal}
                contentLabel='Agregar, Editar o Eliminar Mensaje'
                className='bg-white rounded-lg shadow-lg p-6 w-96 sm:w-1/2 m-auto my-52 flex flex-col justify-center align-middle'
            >
                <div className='bg-white rounded-lg'>
                    <div className='w-full flex justify-end'>
                        <button
                            className='bg-red-500 text-white rounded px-4 py-2'
                            onClick={handleCloseModal}
                        >
                            X
                        </button>
                    </div>
                    <h1 className='text-2xl font-semibold mb-4'>Editar Mensaje</h1>
                    <textarea
                        className='w-full h-32 border-2 rounded-md p-2 mb-4'
                        placeholder='Escribe tu mensaje...'
                        value={mensaje}
                        onChange={(e) => setMensaje(e.target.value)}
                    ></textarea>
                    <div className='flex justify-end'>
                        <button
                            className='bg-gradient-to-r from-[#1E4C6A] to-[#1B7FC5] text-white rounded px-4 py-2 mr-2'
                            onClick={handleAgregarMensaje}
                        >
                            Agregar
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default TableroMiembros;
