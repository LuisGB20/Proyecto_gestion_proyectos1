import perfil from '../../../IMG/perfil.png'

    function UsuarioMensaje() {
    return (
        <>
                <div className='border-2 w-11/12 mx-auto rounded-lg flex my-3'>
            <img src={perfil} className=' h-28 w-24 mr-32' />
            <p className='text-center text-md  w-26 mr-36 font-semibold italic my-auto'>Nombre: Luis Gomez</p>
            <p className='text-center text-md  w-26 mr-36 font-semibold italic my-auto'>Rol:Diseñador</p>
            <p className='text-center text-md  w-26 mr-36 font-semibold italic my-auto'>Equipo: Spotifal</p>
            <p className='text-center text-md  w-26 mr-36 font-semibold italic my-auto'>Disponibilidad: Ocupado</p>
        </div>
        </>
    )
    }

    export default UsuarioMensaje
