
import rectangulo from '../../../IMG/Rectangle41348.png'

function TarjetasActivas(props) {
    const {recurso} = props;
    return (
        <div className='border-2 w-10/12 mx-auto rounded-lg flex my-3 cursor-pointer'>
            <img src={rectangulo} className='w-1/4 h-28 m-auto' />
            <p className='text-center text-md w-1/4 mx-auto font-semibold italic my-auto'>{recurso.nombre}</p>
            <div className='w-1/4 my-auto mx-auto'>
                <h2 className='text-center text-md mx-auto font-semibold italic my-auto'>{recurso.disponibilidad}</h2>
            </div>
        </div>
    )
}

export default TarjetasActivas
