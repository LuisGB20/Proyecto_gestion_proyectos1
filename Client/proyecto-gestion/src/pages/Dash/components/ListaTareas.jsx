import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import Swal from "sweetalert2";

Modal.setAppElement("#root");

function ListaTareas({ misTareas, reload, setReload }) {
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    const openModal = (task) => {
        setSelectedTask(task);
        setModalOpen(true);
    };

    const closeModal = () => {
        setSelectedTask(null);
        setModalOpen(false);
    };

    const confirmFinishTask = (task) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: `¿Quieres marcar la tarea "${task.nombre}" como terminada?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, marcar como terminada',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                console.log(task)
                fetch(`https://localhost:4000/tareas/estado/${task.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        estado: 'Terminado'
                    })
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        setReload(!reload);
                    })
                    .catch(error => {
                        console.log(error);
                    })
                Swal.fire('¡Tarea Terminada!', '', 'success');
                closeModal();
            }
        });
    };

    // Filtrar las últimas 5 tareas en proceso
    const ultimasTareasEnProceso = misTareas.filter((tarea) => tarea.estado === 'En proceso').slice(-5);

    // Filtrar las últimas 5 tareas terminadas
    const ultimasTareasTerminadas = misTareas.filter((tarea) => tarea.estado === 'Terminado').slice(-5);



    return (
        <div className="p-10 flex justify-between h-auto">
            <div className="bg-white p-5 rounded-2xl mx-10 w-1/2">
                <h1 className="text-2xl mb-5 font-bold mx-auto text-center">Mis tareas pendientes</h1>
                <table className="w-full border">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border px-4 py-2 text-xl font-semibold">Tarea</th>
                            <th className="border px-4 py-2 text-xl font-semibold">Fecha de entrega</th>
                            <th className="border px-4 py-2 text-xl font-semibold">Estatus</th>
                            <th className="border px-4 py-2 text-xl font-semibold">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ultimasTareasEnProceso.map((tarea, index) => (
                            <tr key={index} className="bg-white">
                                <td className="border px-4 py-2">{tarea.nombre}</td>
                                <td className="border px-4 py-2 text-center">{formatDate(tarea.fecha_fin)}</td>
                                <td className="border px-4 py-2 pl-10">{tarea.estado}</td>
                                <td className="border px-4 py-2 text-center">
                                    <button
                                        className="bg-blue-500 text-white px-4 py-2 rounded"
                                        onClick={() => openModal(tarea)}
                                    >
                                        Detalles
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="bg-white p-5 rounded-2xl mx-10 w-1/2">
                <h1 className="text-2xl mb-5 font-bold text-center">Tareas Realizadas</h1>
                <table className="w-full border">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border px-4 py-2">Tarea</th>
                            <th className="border px-4 py-2 pl-14">Fecha de entrega</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ultimasTareasTerminadas.map((tarea, index) => (
                            <tr key={index} className="bg-white">
                                <td className="border px-4 py-2 text-center">{tarea.nombre}</td>
                                <td className="border px-4 py-2 text-center">{formatDate(tarea.fecha_fin)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Modal
                isOpen={modalOpen}
                onRequestClose={closeModal}
                contentLabel="Detalles de la tarea"
                className="w-1/4 h-screen m-auto my-60 border-none outline-none "

            >
                <div className="bg-white p-8 rounded-2xl">
                    <h1 className="text-3xl mb-5 font-bold text-gray-800">Detalles de la tarea</h1>
                    <div className="grid grid-cols-2 gap-4">
                        <p className="text-gray-600"><strong>Tarea:</strong></p>
                        <p className="text-gray-800">{selectedTask?.nombre}</p>

                        <p className="text-gray-600"><strong>Descripción:</strong></p>
                        <p className="text-gray-800">{selectedTask?.descripcion}</p>

                        <p className="text-gray-600"><strong>Fecha de entrega:</strong></p>
                        <p className="text-gray-800">{formatDate(selectedTask?.fecha_fin)}</p>

                        <p className="text-gray-600"><strong>Estatus:</strong></p>
                        <p className="text-gray-800">{selectedTask?.estado}</p>
                    </div>
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded mt-5"
                        onClick={() => confirmFinishTask(selectedTask)}
                    >
                        Marcar como terminada
                    </button>
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded ml-2 mt-5"
                        onClick={closeModal}
                    >
                        Cerrar
                    </button>
                </div>
            </Modal>
        </div>
    );
}

export default ListaTareas;
