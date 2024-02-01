import React from "react";

function ListaTareas(){
    return(
        <div>
            <div className="p-10 flex">
                <div className="bg-white h-56 w-[49%] p-5 rounded-2xl">
                    <h1 className="text-xl mb-5">Miembros del equipo</h1>
                    <table>
                        <thead>
                            <tr>
                                <th>Miembro</th>
                                <th className="pl-20">Rol</th>
                                <th className="pl-20">Estatus</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Luis Gomez</td>
                                <td className="pl-20">Diseñador</td>
                                <td className="pl-20">Ocupado</td>
                            </tr>
                            <tr>
                                <td>Delannie Teodoro</td>
                                <td className="pl-20">Programador</td>
                                <td className="pl-20">Sin tareas</td>
                            </tr>
                            <tr>
                                <td>Misael Rosado</td>
                                <td className="pl-20">Analista</td>
                                <td className="pl-20">Ocupado</td>
                            </tr>
                            <tr>
                                <td>Miguel Bolon</td>
                                <td className="pl-20">Programador</td>
                                <td className="pl-20">Sin tareas</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="bg-white h-56 w-[49%] p-5 rounded-2xl ml-10">
                    <h1 className="text-xl mb-5">Tareas completadas del proyecto</h1>
                    <table>
                        <thead>
                            <tr>
                                <th>  </th>
                                <th className="pl-14">Fecha de entrega</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Diseño Registro</td>
                                <td className="pl-14">20-Ene-24</td>
                            </tr>
                            <tr>
                                <td>Diseño Home</td>
                                <td className="pl-14">16-Ene-24</td>
                            </tr>
                            <tr>
                                <td>Analisis de datos</td>
                                <td className="pl-14">10-Ene-24</td>
                            </tr>
                            
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
export default ListaTareas