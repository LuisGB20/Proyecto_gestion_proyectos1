import React from 'react';
import { Link } from 'react-router-dom';
import recursoImagen from '../../../Img/Servidor.png';

function TarjetaRecurso({ recurso, onEditar }) {

    
    return (
        <Link
            className="border-2 w-11/12 mx-auto rounded-lg flex my-5 hover:cursor-pointer"
            onClick={() => onEditar(recurso)}
        >
            <div className="flex justify-around w-full p-4">
                <img src="https://cdn-icons-png.flaticon.com/512/993/993510.png" alt="Imagen del recurso" className="w-20 h-20 m-auto mx-10" />
                <div className="flex flex-col w-1/2">
                    <p className="text-md font-semibold italic mb-2">
                        Nombre: {recurso.recursoNombre}
                    </p>
                    <p className="text-md font-semibold italic mb-2">
                        Descripción: {recurso.recursoDescripcion}
                    </p>
                    <p className="text-md font-semibold italic mb-2">
                        Disponibilidad: {recurso.recursoDisponibilidad}
                    </p>
                </div>
                <div className="flex flex-col w-1/2">
                    <p className="text-md font-semibold italic mb-2">
                        Tipo: {recurso.recursoTipo}
                    </p>
                    <p className="text-md font-semibold italic mb-2">
                        Categoría: {recurso.CategoriaNombre}
                    </p>
                    <p className="text-md font-semibold italic mb-2">
                        Descripción Categoría: {recurso.categoriaDescripcion}
                    </p>
                </div>
            </div>
        </Link>
    );
}

export default TarjetaRecurso;
