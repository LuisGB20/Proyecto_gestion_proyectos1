import React, { useEffect, useState } from "react";
import Modal from "react-modal";

function Tareas(props) {
    const { misTareas, tiposTareas } = props;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tipo, setTipo] = useState("");

    console.log(misTareas);
    console.log(tiposTareas);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };


    const proximaEntrega = (tareas) => {
        let fechaActual = new Date();
        console.log(fechaActual)
        const tareasFiltradas = tareas.filter(tarea => new Date(tarea.fecha_fin) > fechaActual);
        console.log(tareasFiltradas)
        const tareasOrdenadas = tareasFiltradas.sort((a, b) => new Date(a.fecha_entrega) - new Date(b.fecha_entrega));
        console.log(tareasOrdenadas)
        return tareasOrdenadas.length > 0 ? tareasOrdenadas[0] : null;
    }

    const handleOpenModal = (Tipo) => {
        setIsModalOpen(true);
        setTipo(Tipo);
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setTipo("");
    }

    return (
        <div className="flex justify-between w-full my-10 h-32">
            <div className="bg-gradient-to-r from-blue-900 to-blue-500 text-white rounded-2xl p-6 mx-auto"
                onClick={() => handleOpenModal("Todas")}
            >
                <h1 className="text-xl text-start font-semibold ">Tareas Asignadas</h1>
                <p className="text-4xl text-start font-semibold italic">{tiposTareas.todas}</p>
            </div>
            <div className="bg-gradient-to-r from-blue-900 to-blue-500 text-white rounded-2xl p-6  mx-auto"
                onClick={() => handleOpenModal("Terminado")}
            >
                <h1 className="text-xl text-start font-semibold">Tareas Cumplidas</h1>
                <p className="text-4xl text-start font-semibold italic">{tiposTareas.completadas}</p>
            </div>
            <div className="bg-gradient-to-r from-blue-900 to-blue-500 text-white rounded-2xl p-6  mx-auto"
                onClick={() => handleOpenModal("En proceso")}
            >
                <h1 className="text-xl text-start font-semibold">Tareas Pendientes</h1>
                <p className="text-4xl text-start font-semibold italic">{tiposTareas.enProceso}</p>
            </div>
            <div className="bg-gradient-to-r from-blue-900 to-blue-500  text-white rounded-2xl p-6  mx-auto"
                onClick={() => handleOpenModal("Suspendido")}
            >
                <h1 className="text-xl text-start font-semibold">Tareas Suspendidas</h1>
                <p className="text-4xl text-start font-semibold italic">{tiposTareas.suspendidas}</p>
            </div>
            <div className="bg-gradient-to-r from-blue-900 to-blue-500  text-white rounded-2xl p-6  mx-auto">
                <h1 className="text-xl text-start font-semiboldt">Proxima fecha de entrega</h1>
                <p className="text-4xl text-start font-semibold italic">{proximaEntrega(misTareas) ? `${formatDate(proximaEntrega(misTareas).fecha_fin)}` : "No hay entregas proximas"}</p>
            </div>
            <Modal
                isOpen={isModalOpen}
                onRequestClose={handleCloseModal}
                contentLabel="Tareas"
                className="w-8/12 h-[750px] m-auto bg-white my-10  overflow-auto rounded-3xl"
            >
                <h1 className="text-3xl text-center font-bold italic pt-5">Tareas</h1>
                <div className=" w-full h-full  flex flex-col  align-middle">
                    {
                        tipo === "Todas" ? (
                                misTareas.map((tarea) => (
                                    <div className="border rounded-2xl w-11/12 h-auto mx-auto my-5 p-3 bg-slate-200">
                                        <h3 className="text-2xl font-semibold">{tarea.nombre}</h3>
                                        <p className="text-xl italic">Descripcion: {tarea.descripcion}</p>
                                        <p className="text-xl italic">Estatus: {tarea.estado}</p>
                                        <p className="text-xl italic">Fecha de entrega: {formatDate(tarea.fecha_inicio)}</p>
                                        <p className="text-xl italic">Fecha de entrega: {formatDate(tarea.fecha_fin)}</p>
                                    </div>))
                        ) : (
                            misTareas.filter(tarea => tarea.estado === tipo).map((tarea, index) => (
                                <div key={index} className="border rounded-2xl w-11/12 h-auto mx-auto my-5 p-3 bg-slate-200">
                                    <h3 className="text-2xl font-semibold">{tarea.nombre}</h3>
                                    <p className="text-xl italic">Descripción: {tarea.descripcion}</p>
                                    <p className="text-xl italic">Estatus: {tarea.estado}</p>
                                    <p className="text-xl italic">Fecha de inicio: {formatDate(tarea.fecha_inicio)}</p>
                                    <p className="text-xl italic">Fecha de entrega: {formatDate(tarea.fecha_fin)}</p>
                                </div>
                            ))
                        )
                    }
                        <button
                            className='bg-gradient-to-r from-[#1E4C6A] to-[#1B7FC5] text-white rounded p-4 px-8 mx-auto h-16 text-center my-auto '
                            onClick={handleCloseModal}
                        >
                            Cerrar
                        </button>
                </div>
            </Modal>
        </div>
    )
}
export default Tareas