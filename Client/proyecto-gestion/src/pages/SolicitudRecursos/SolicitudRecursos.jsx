
import Header from '../../components/header'
import SidebarMiDashboard from '../../components/SidebarMiDashboard'
import TarjetasDisponibilidad from './components/TarjetasDisponibilidad'

function SolicitudRecursos() {

  return (
    <div className='w-full h-full bg-slate-200'>
      <Header area={"Dashboard de recursos y activos"} />
      <div className='flex w-full h-full'>
        <SidebarMiDashboard/>
        <div className='w-full'>
          <div className='bg-white my-3 w-full h-20'>
            <h1 className='text-2xl font-semibold italic p-5'>Recursos</h1>
          </div>
          <div className='flex w-full h-auto'>
            <div className='w-1/2 m-5 bg-white rounded-2xl'>
              <form className='flex flex-col rounded-2xl'>
                <label className=' my-8 mb-1 mx-10 font-semibold text-lg italic w-11/12'>Nombre</label>
                <input type="text" className='rounded-lg w-11/12 h-10 border-2 mx-auto outline-none text-lg font-medium pl-2' placeholder='Indica el nombre del recurso' />
                <label className=' my-8 mb-1 mx-10 font-semibold text-lg italic w-11/12'>Tipo</label>
                <input type="text" className='rounded-lg w-11/12 h-10 border-2 mx-auto outline-none text-lg font-medium pl-2' placeholder='Selecciona el tipo de recurso' />
                <label className=' my-8 mb-1 mx-10 font-semibold text-lg italic w-11/12'>Evaluación</label>
                <input type="text" className='rounded-lg w-11/12 h-10 border-2 mx-auto outline-none text-lg font-medium pl-2' placeholder='Evalua el recurso' />
                <label className=' my-8 mb-1 mx-10 font-semibold text-lg italic w-11/12 '>Comentarios</label>
                <textarea cols="30" rows="6" className='rounded-lg w-11/12 border-2 mx-auto mb-10 resize-none outline-none text-lg font-medium pl-2' placeholder='Ingresa tu comentario'></textarea>
              </form>
            </div>
            <div className='w-1/2 h-full rounded-2xl m-5 bg-white'>
              <h1 className='text-2xl font-semibold italic p-5'>Inventario de recursos</h1>
              <div className='w-full h-[515px] overflow-auto'>
                <TarjetasDisponibilidad />
                <TarjetasDisponibilidad />
                <TarjetasDisponibilidad />
                <TarjetasDisponibilidad />
                <TarjetasDisponibilidad />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SolicitudRecursos