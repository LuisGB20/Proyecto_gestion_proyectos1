import { Link } from 'react-router-dom';
import perfil from '../../../IMG/perfil.png'

function UsuarioMensaje(props) {
    const miembro = props.miembro;
    return (
        <div>
            {miembro.rol === 'Jefe' ? null :
                <Link to={`/miembros/${miembro.id}`} className='border-2 w-11/12 mx-auto rounded-lg flex my-3 hover: cursor-pointer'>
                    <img src={perfil} className=' h-28 w-24 mr-32' />
                    <p className='text-center text-md  w-26 mx-auto font-semibold italic my-auto'>Nombre: {miembro.nombre + " " + miembro.apellido}</p>
                    <p className='text-center text-md  w-26 mx-auto font-semibold italic my-auto'>Rol: {miembro.rol}</p>
                    <p className='text-center text-md  w-26 mx-auto font-semibold italic my-auto'>Equipo: {miembro.equipo === null ? 'Sin equipo' : miembro.equipo}</p>
                </Link>
            }
        </div>
    )
}

export default UsuarioMensaje
