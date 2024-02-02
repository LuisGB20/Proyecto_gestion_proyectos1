import React, { useState } from 'react';
import rectangulo from '../../../IMG/Rectangle413481.png';
import Modal from 'react-modal';

function Mensaje(props) {
    const { mensaje, handleEditarMensaje, handleEliminarMensaje, setearNuevoMensaje } = props;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [nuevoMensaje, setNuevoMensaje] = useState(mensaje.mensaje);

    const handleOpenModal = () => {
        setearNuevoMensaje(mensaje.mensaje);
        setIsModalOpen(true);
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
    }

    const handleGuardarMensaje = () => {
        handleEditarMensaje(mensaje.id, nuevoMensaje);
        handleCloseModal();
    }

    return (
        <div className='border-2 w-11/12 mx-auto rounded-lg flex my-3'>
            <img src={rectangulo} className='w-1/6 h-28 m-auto' alt='Rectangulo' />
            <p className='text-center text-md w-1/6 mx-auto font-semibold italic my-auto'>
                {mensaje.nombre + ' ' + mensaje.apellido}
            </p>
            <p className='text-center text-md w-4/6 mx-auto font-semibold italic my-auto'>{mensaje.mensaje}</p>
            <button
                className='bg-yellow-500 text-white rounded h-16 p-4 my-auto mr-2'
                onClick={handleOpenModal}
            >
                Editar
            </button>
            <button
                className='bg-red-500 text-white rounded h-16 p-4 my-auto mr-2'
                onClick={() => handleEliminarMensaje(mensaje.id)}
            >
                Eliminar
            </button>
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
                        value={nuevoMensaje}
                        onChange={(e) => setNuevoMensaje(e.target.value)}
                    ></textarea>
                    <div className='flex justify-end'>
                        <button
                            className='bg-gradient-to-r from-[#1E4C6A] to-[#1B7FC5] text-white rounded px-4 py-2 mr-2'
                            onClick={handleGuardarMensaje}
                        >
                            Guardar
                        </button>
                        <button
                            className='bg-gradient-to-r from-[#1E4C6A] to-[#1B7FC5] text-white rounded px-4 py-2 mr-2'
                            onClick={handleCloseModal}
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default Mensaje;
