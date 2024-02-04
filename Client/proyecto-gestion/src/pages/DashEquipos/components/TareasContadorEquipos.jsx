import React from "react";

function Tareas() {
    
    return (
        <div className="flex p-10 justify-between">
            <div className="bg-gradient-to-r from-blue-900 to-blue-500 h-32 w-72 text-white rounded-2xl p-6">
                <h1 className="flex justify-start">Miembros Del Equipo</h1>
                <p className="text-3xl justify-start flex">4</p>
            </div>
            <div className="bg-gradient-to-r from-blue-900 to-blue-500 text-white  h-32 w-72 rounded-2xl p-6 ml-5">
                <h1 className="flex justify-start">Diseñadores</h1>
                <p className="text-3xl justify-start flex">2</p>
            </div>
            <div className="bg-gradient-to-r from-blue-900 to-blue-500 text-white  h-32 w-72 rounded-2xl p-6 ml-5">
                <h1 className="flex justify-start">Desarrolladores</h1>
                <p className="text-3xl justify-start flex">2</p>
            </div>
            <div className="bg-gradient-to-r from-blue-900 to-blue-500 text-white  h-32 w-72 rounded-2xl p-6 ml-5">
                <h1 className="flex justify-start">Analistas</h1>
                <p className="text-3xl justify-start flex">1</p>
            </div>
        </div>
    )
}
export default Tareas