import React from 'react';
import { Link } from 'react-router-dom';
import recursoImagen from '../../../Img/Servidor.png';

function TarjetaRecursoProyecto({ recurso }) {
    
       //Formatear como yyyy-mmm-dd
       function formatearFecha2(fecha) {
        const date = new Date(fecha);
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2); // Months are zero-based
        const day = ('0' + date.getDate()).slice(-2);
        const fechaFormateada = `${year}-${month}-${day}`;
        return fechaFormateada;
    }

    return (
        <Link
            className="border-2 w-11/12 mx-auto rounded-lg flex my-5 hover:cursor-pointer mr-24"
        >
            <div className="flex justify-around w-full p-4">
                <img src="https://cdn-icons-png.flaticon.com/512/993/993510.png" alt="Imagen del recurso" className="w-20 h-20 m-auto mx-10" />
                <div className="flex flex-col w-1/2">
                    <p className="text-md font-semibold italic mb-2">
                        Nombre: {recurso.nombreRecurso}
                    </p>
                    <p className="text-md font-semibold italic mb-2">
                        Descripción: {recurso.descripcionRecurso}
                    </p>
                    <p className="text-md font-semibold italic mb-2">
                        Proyecto: {recurso.nombreProyecto}
                    </p>
                </div>
                <div className="flex flex-col w-1/2 ml-20">
                    <p className="text-md font-semibold italic mb-2">
                        Tipo: {recurso.tipoRecurso}
                    </p>
                    <p className="text-md font-semibold italic mb-2">
                        Fecha de solicitud: {formatearFecha2(recurso.fechaSolicitud)}
                    </p>
                    < p className ="text-md font-semibold italic mb-2">
                        Disponibilidad : {recurso.disponibilidadRecurso}
                    </p>
                </div>
            </div>
        </Link>
    );
}

export default TarjetaRecursoProyecto;
