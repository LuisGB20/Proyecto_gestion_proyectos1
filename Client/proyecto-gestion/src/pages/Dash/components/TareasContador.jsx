import React from "react";

function Tareas(){
    return(
        <>
            <div>
                <div className="flex p-10">
                    <div className="bg-gradient-to-r from-blue-900 to-blue-500 h-32 w-72 text-white rounded-2xl p-6">
                        <h1 className="flex justify-start">Tareas Asignadas</h1>
                        <p className="text-3xl justify-start flex">3</p>
                    </div>
                    <div className="bg-white h-32 w-72 rounded-2xl p-6 ml-5">
                        <h1 className="flex justify-start">Tareas Cumplidas</h1>
                        <p className="text-3xl justify-start flex">1</p>
                    </div>
                    <div className="bg-white h-32 w-72 rounded-2xl p-6 ml-5">
                        <h1 className="flex justify-start">Tareas Pendientes</h1>
                        <p className="text-3xl justify-start flex">2</p>
                    </div>
                    <div className="bg-white h-32 w-72 rounded-2xl p-6 ml-5">
                        <h1 className="flex justify-start">Proxima fecha de entrega</h1>
                        <p className="text-xl justify-start flex">30-Ene-24</p>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Tareas