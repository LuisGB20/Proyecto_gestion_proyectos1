    import Header from "../../components/header"
    import SidebarMiDashboard from "../../components/SidebarMiDashboard"
    import TarjetasActivas from "./components/TarjetasActivas"
    import TarjetasDisponibilidad from "../SolicitudRecursos/components/TarjetasDisponibilidad"
    import TarjetasServidores from "./components/TarjetasServidores"
            function SolicitudActivos() {
            return (
                <>
                <div className='w-full h-full bg-slate-200'>
            <Header />
            <div className='flex w-full h-full'>
                <SidebarMiDashboard/>
                <div className='w-full'>
                <div className='bg-white my-3 w-full h-20'>
                    <h1 className='text-2xl font-semibold italic p-5'>Activos</h1>
                </div>
                <div className='flex w-full h-auto'>
                    <div className='w-1/2 m-5 bg-white rounded-2xl'>
                    <form className='flex flex-col rounded-2xl'>
                        <label className=' my-8 mb-1 mx-10 font-semibold text-lg italic w-11/12'>Nombre</label>
                        <input type="text" className='rounded-lg w-11/12 h-10 border-2 mx-auto outline-none text-lg font-medium pl-2' placeholder='Computadoras' />
                        <label className=' my-8 mb-1 mx-10 font-semibold text-lg italic w-11/12'>Tipo</label>
                        <input type="text" className='rounded-lg w-11/12 h-10 border-2 mx-auto outline-none text-lg font-medium pl-2' placeholder='Equipo De Trabajo' />
                        <label className=' my-8 mb-1 mx-10 font-semibold text-lg italic w-11/12'>Disponibilidad</label>
                        <input type="text" className='rounded-lg w-11/12 h-10 border-2 mx-auto outline-none text-lg font-medium pl-2' placeholder='Disponible' />
                        <label className=' my-8 mb-1 mx-10 font-semibold text-lg italic w-11/12'>Evaluación</label>
                        <input type="text" className='rounded-lg w-11/12 h-10 border-2 mx-auto outline-none text-lg font-medium pl-2' placeholder='Califica Del 1 al 10 Este Recurso' />
                        <label className=' my-8 mb-1 mx-10 font-semibold text-lg italic w-11/12 '>Comentarios</label>
                        <textarea cols="30" rows="6" className='rounded-lg w-11/12 border-2 mx-auto mb-10 resize-none outline-none text-lg font-medium pl-2' placeholder='Escribe Caulquier Comentario Que Tengas Sobre El Recurso'></textarea>
                    </form>
                    </div>
                    <div className='w-1/2 h-full rounded-2xl m-5 bg-white'>
                    <h1 className='text-2xl font-semibold italic p-5'>Inventario de recursos</h1>
                    <div className='w-full h-[515px] overflow-auto'>
                        <TarjetasActivas />
                        <TarjetasDisponibilidad />
                        <TarjetasServidores/>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
                </>
            )
            }

            export default SolicitudActivos
