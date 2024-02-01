import perfil from '../../../IMG/perfil.png'
import rectangulo from "../../../Img/Rectangle41348.png"
function PerfilMensaje() {
    return (
        <div className='w-full h-full '>
            <div className='w-11/12 mx-auto rounded-lg flex my-10'>
                <img src={perfil} className=' w-1/4 h-1/4 mx-auto  rounded-full' />
                <div className='w-1/2 mx-auto bg-white rounded-3xl'>
                    <h1 className=' mt-10 mx-auto text-center font-semibold italic text-5xl '>Información</h1>
                    <div className='my-10'>
                        <p className='text-center font-bold italic my-3 text-3xl'>Nombre: <span className='font-medium italic'>Misael Rosado</span></p>
                        <p className='text-center font-bold italic my-3 text-3xl'>Equipo: <span className='font-medium italic'>Spotifal</span></p>
                        <p className='text-center font-bold italic my-3 text-3xl'>Rol: <span className='font-medium italic'>Analista</span></p>
                        <p className='text-center font-bold italic my-3 text-3xl'>Inicio De Operaciones: <span className='font-medium italic'>10-Diciembre-2022</span></p>
                    </div>
                </div>
            </div>
            <div className='w-full mx-auto flex my-3'>
                <div className='w-1/2 h-full my-10'>
                    <h1 className=' font-sans italic my-auto text-xl mx-20 '>Ultimas Tareas completadas</h1>
                    <div className='border-2 w-10/12 bg-white mx-auto rounded-lg flex my-3 '>
                        <img src={rectangulo} className='ml-16 w-28 h-28 m-auto ' />
                        <p className='text-center text-md  mx-auto font-semibold italic my-auto '>Pruebas Y Validacion En El Software: Smilebook</p>
                    </div>
                    <div className='border-2 w-10/12 bg-white mx-auto rounded-lg flex my-3 '>
                        <img src={rectangulo} className=' ml-16 w-28 h-28 m-auto ' />
                        <p className='text-center text-md  mx-auto font-semibold italic my-auto '>Documentacion Del Proyecto: AllSlow</p>
                    </div>
                    <div className='border-2 w-10/12 bg-white mx-auto rounded-lg flex my-3 '>
                        <img src={rectangulo} className=' ml-16 w-28  h-28 m-auto ' />
                        <p className='text-center text-md  mx-auto font-semibold italic my-auto '>Identificacion En El Problema De Seguridad En La Aplicacion Movil: Chat JPT</p>
                    </div>
                </div>
                <div className='w-1/2 h-full my-10'>
                    <h1 className=' font-sans italic my-auto text-xl mx-20 '>Proyectos anteriores</h1>
                    <div className='border-2 w-10/12 bg-white mx-auto rounded-lg flex my-3 '>
                        <img src={rectangulo} className='ml-16 w-28 h-28 m-auto ' />
                        <p className='text-center text-md  mx-auto font-semibold italic my-auto '>Smilebook</p>
                    </div>
                    <div className='border-2 w-10/12 bg-white mx-auto rounded-lg flex my-3 '>
                        <img src={rectangulo} className=' ml-16 w-28 h-28 m-auto ' />
                        <p className='text-center text-md  mx-auto font-semibold italic my-auto '>AllSlow</p>
                    </div>
                    <div className='border-2 w-10/12 bg-white mx-auto rounded-lg flex my-3 '>
                        <img src={rectangulo} className=' ml-16 w-28  h-28 m-auto ' />
                        <p className='text-center text-md  mx-auto font-semibold italic my-auto '>Chat JPT</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PerfilMensaje
