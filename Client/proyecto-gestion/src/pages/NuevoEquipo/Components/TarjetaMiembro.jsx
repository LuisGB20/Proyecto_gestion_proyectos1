import React from 'react';
import UsuarioAgregado from '../../../Img/usuarioagregado.png';
import EliminarUsuario from '../../../Img/eliminarUsuario.png';

function TarjetaMiembro(props) {
    const {nombre, rol, onDelete} = props;
  return (
    <div className="flex items-center bg-white p-4 rounded shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] h-1/2">
      <div>
        <img className="w-10 h-10 mr-4" src={UsuarioAgregado} alt="Usuario Agregado" />
      </div>

      <div className="flex flex-col">
        <span className="text-lg font-semibold">{nombre}</span>
        <span className="text-sm text-gray-500">{rol}</span>
      </div>

      <div className="ml-10">
        <img className="w-6 h-6" src={EliminarUsuario} alt="Eliminar Usuario" onClick={onDelete}/>
      </div>
    </div>
  );
}

export default TarjetaMiembro;
