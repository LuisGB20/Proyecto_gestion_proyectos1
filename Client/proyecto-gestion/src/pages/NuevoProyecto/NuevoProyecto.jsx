import React from 'react'
import Header from '../../components/header'
import SidebarAdmin from '../../components/SidebarAdmin'

function NuevoProyecto() {
    return (
        <div className='bg-slate-50'>
            <Header />
            <div className='flex'>
                <SidebarAdmin/>
                <div className='w-full h-full'>
                    <div className='w-full h-full'>
                        <div className='bg-white my-3 w-full h-20 flex justify-between shadow'>
                            <h1 className='text-2xl font-semibold  p-5'>NUEVO PROYECTO</h1>
                        </div>


                        <div className="w-full flex items-center ">
                            <form className="bg-white shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] rounded px-10 pt-8 pb-12 md:w-96 lg:w-2/3  ml-12 mt-4 mb-8 ">
                                <div className="mb-4 ">
                                    <label className="block text-gray-500 text-sm font-bold mb-2" for="username">
                                        Nombre
                                    </label>
                                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Agrega un Nombre al Proyecto" />
                                </div>
                                <div className="mb-4 ">
                                    <label className="block text-gray-500 text-sm font-bold mb-2" for="text">
                                        Descripción
                                    </label>
                                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="text" type="text" placeholder="¿De qué se trata el Proyecto?" />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-500 text-sm font-bold mb-2" for="date">
                                        Fecha de Inicio
                                    </label>
                                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="team" type="text" placeholder="¿Cuándo comenzará el Proyecto?" />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-500 text-sm font-bold mb-2" for="text">
                                        Recursos y Activos
                                    </label>
                                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="team" type="text" placeholder="Proporcionar Recursos y Activos al Proyecto" />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-500 text-sm font-bold mb-2" for="text">
                                        Estado
                                    </label>
                                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="team" type="text" placeholder="Proporcionar Recursos y Activos al Proyecto" />
                                </div>

                             
                            </form>

                        </div>

                        <div className=' my-3 w-full h-20 flex justify-between items-center'>

                            <button className='font-medium text-center text-lg bg-gradient-to-r from-[#1E4C6A]  to-[#1B7FC5] p-2 mx-5 my-3 rounded-lg text-white ml-auto mr-12'>Crear Proyecto</button>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default NuevoProyecto
