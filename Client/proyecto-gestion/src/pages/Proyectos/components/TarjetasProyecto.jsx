
import instagram from '../../../IMG/instagram.png'
import eliminar from '../../../IMG/eliminar.png'
import editar from '../../../IMG/editar.png'

function TarjetasProyecto(props) {
    const { proyecto } = props;

    const fechaOriginal = new Date(proyecto.fecha_inicio);

    const opcionesDeFormato = {
        year: "numeric",
        month: "long",
        day: "numeric"
    };

    const formatoFecha = new Intl.DateTimeFormat("es-ES", opcionesDeFormato).format(fechaOriginal);
    return (
        <>
            <div className='bg-white rounded-lg overflow-hidden shadow-md my-4 w-full'>
                <img src={instagram} className='rounded-xl w-96 my-3 mx-auto' />
                <div className='my-3 mx-3'>
                    <h1 className='text-left text-2xl font-semibold my-3 italic'>{proyecto.nombre}</h1>
                    <p className='text-left text-lg font-normal'> {proyecto.descripcion}</p>
                    <p className='text-left text-lg font-normal'>Fecha de finalización: {formatoFecha}</p>
                </div>
                {/* <div>
                <button className=' border-2 text-white font-bold py-2 px-4 rounded-lg mx-3 my-3'>
                    <img src={editar} className='w-8 h-8 m-auto' />
                </button>
                <button className='border-2 text-white font-bold py-2 px-4 rounded-lg mx-3 my-3'>
                    <img src={eliminar} className='w-8 h-8 m-auto' />
                </button>
            </div> */}
            </div>
        </>
    )
}

export default TarjetasProyecto
