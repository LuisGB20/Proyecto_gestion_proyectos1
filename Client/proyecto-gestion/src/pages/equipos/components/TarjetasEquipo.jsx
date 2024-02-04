import imagenEquipo from '../../../IMG/imageEquipo.png';

function TarjetasEquipo(props) {
    const { equipo } = props;
    console.log(equipo)
    return (
        <div className='bg-white rounded-lg overflow-hidden shadow-md my-4 w-full'>
            <img src={imagenEquipo} alt='Equipo' className='object-cover w-full h-48' />

            <div className='p-6'>
                <h1 className='text-2xl font-semibold italic mb-2'>{equipo.nombreEquipo}</h1>
                <p className='text-base text-gray-700 mb-4'>{equipo.equipoDescripcion}</p>
                <p className='text-sm text-gray-500 mb-2'>Proyecto: {equipo.nombreproyecto}</p>
                <div className='flex justify-end items-center'>
                </div>
            </div>
        </div>
    );
}

export default TarjetasEquipo;
