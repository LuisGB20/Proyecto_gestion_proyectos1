import imagenEquipo from '../../../IMG/imageEquipo.png';
import eliminar from '../../../IMG/eliminar.png';
import editar from '../../../IMG/editar.png';
import { Link } from 'react-router-dom';

function TarjetasEquipo(props) {
    const { equipo } = props;
    console.log(equipo)
    return (
        <Link to={`/equipos/${equipo.id}`}>
            <div className='bg-white rounded-lg overflow-hidden shadow-md my-4 w-full'>
                <img src={imagenEquipo} alt='Equipo' className='object-cover w-full h-48' />

                <div className='p-6'>
                    <h1 className='text-2xl font-semibold italic mb-2'>{equipo.nombreEquipo}</h1>
                    <p className='text-base text-gray-700 mb-4'>{equipo.equipoDescripcion}</p>
                    <p className='text-sm text-gray-500 mb-2'>Proyecto: {equipo.nombreproyecto}</p>
                    <div className='flex justify-end items-center'>
                        {/* <button className='mr-2' onClick={() => >
      <img src={editar} alt='Editar' className='w-6 h-6' />
    </button> */}
                        {/* <button onClick={() => {}>
      <img src={eliminar} alt='Eliminar' className='w-6 h-6' />
    </button> */}
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default TarjetasEquipo;
