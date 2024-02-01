import React from "react";

function ListaTareas(){
    return(
        <div>
            <div className="p-10 flex">
                <div className="bg-white h-52 w-[49%] p-5 rounded-2xl">
                    <h1 className="text-xl mb-5">Mis Tareas</h1>
                    <table>
                        <thead>
                            <tr>
                                <th>Tarea</th>
                                <th className="pl-10">Fecha de entrega</th>
                                <th className="pl-10">Estatus</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Diseñar pagina de contacto</td>
                                <td className="text-center">23-Ene-24</td>
                                <td className="text-blue-500 pl-10">En proceso</td>
                            </tr>
                            <tr>
                                <td>Diseñar carrito</td>
                                <td className="text-center">20-Ene-24</td>
                                <td className="pl-10">Pendiente</td>
                            </tr>
                            <tr>
                                <td>Diseñar recuperar contraseña</td>
                                <td className="text-center">10-Feb-24</td>
                                <td className="pl-10">Completado</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="bg-white h-52 w-[49%] p-5 rounded-2xl ml-10">
                    <h1 className="text-xl mb-5">Tareas Realizadas</h1>
                    <table>
                        <thead>
                            <tr>
                                <th>  </th>
                                <th className="pl-14">Fecha de entrega</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Diseño Home</td>
                                <td className="pl-14">12-Ene-24</td>
                            </tr>
                            <tr>
                                <td>Diseño Login</td>
                                <td className="pl-14">18-Ene-24</td>
                            </tr>
                            <tr>
                                <td>Diseño Registro</td>
                                <td className="pl-14">20-Ene-24</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
export default ListaTareas