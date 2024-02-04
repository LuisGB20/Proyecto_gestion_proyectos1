import React from "react";

function ListaTareas({ miembros, tareas }) {
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const MiembroEquipo = ({ nombre, apellido, rol }) => (
        <div className="my-4 flex justify-between">
            <h3 className="text-xl font-normal italic mx-auto">{nombre + " " + apellido}</h3>
            <p className="text-xl font-normal italic mx-auto">{rol}</p>
        </div>
    );

    const TareaProyecto = ({ nombre, descripcion, fechaEntrega }) => (
        <div className="my-4 flex justify-between">
            <h3 className="text-xl font-normal italic mx-auto">{nombre}</h3>
            <p className="text-xl font-normal italic mx-auto">{descripcion}</p>
            <p className="text-xl font-normal italic mx-auto">{fechaEntrega}</p>
        </div>
    );

    // Ordenar tareas por fecha
    const tareasOrdenadas = tareas.sort((a, b) => new Date(b.fecha_fin) - new Date(a.fecha_fin));

    return (
        <div className="flex w-full h-auto justify-between">
            <div className="bg-white h-auto w-1/2 m-10 p-5 rounded-2xl">
                <h1 className="text-2xl mb-5 font-bold">Miembros del equipo</h1>
                <div className="w-full flex justify-between">
                    <h1 className="text-xl font-semibold mb-2 mx-auto">Miembro:</h1>
                    <h1 className="text-xl font-semibold mb-2 mx-auto">Función:</h1>
                </div>
                {miembros.map((miembro) => (
                    <MiembroEquipo
                        key={miembro.id}
                        nombre={miembro.nombre}
                        apellido={miembro.apellido}
                        rol={miembro.rol}
                    />
                ))}
            </div>
            <div className="bg-white h-auto w-1/2 m-10 p-5 rounded-2xl">
                <h1 className="text-2xl mb-5 font-bold">Últimas tareas completadas del proyecto</h1>
                <div className="w-full flex justify-between">
                    <h1 className="text-xl font-semibold mb-2 mx-auto">Nombre:</h1>
                    <h1 className="text-xl font-semibold mb-2 mx-auto">Descripción:</h1>
                    <h1 className="text-xl font-semibold mb-2 mx-auto">Terminado:</h1>
                </div>
                {tareasOrdenadas.slice(0, 5).map((tarea) => (
                    <TareaProyecto
                        key={tarea.id}
                        nombre={tarea.nombre}
                        descripcion={tarea.descripcion}
                        fechaEntrega={formatDate(tarea.fecha_fin)}
                    />
                ))}
            </div>
        </div>
    );
}

export default ListaTareas;
