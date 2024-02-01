    import Header from "../../components/header"
    import TarjetasMiembros from "./components/TarjetasMiembros"
    import TarjetaMiembro from "./components/TarjetaMiembro"
    import TarjetasMiembross from "./components/TarjetasMiembross"
    import SidebarMiDashboard from "../../components/SidebarMiDashboard"
        function Miembro() {
        return (
            <>
                <div className='w-full h-full bg-slate-200'>
        <Header />
        <div className='flex w-full h-full'>
        <SidebarMiDashboard/>
            <div className='w-full'>
            <div className='bg-white my-3 w-full h-20'>
            </div>
            <div className='flex w-full h-auto'>
                <div className='w-1/2 m-5 bg-white rounded-2xl'>
                <form className='flex flex-col rounded-2xl'>
                    <label className=' my-8 mb-1 mx-10 font-semibold text-lg italic w-11/12'>Nombre</label>
                    <input type="text" className='rounded-lg w-11/12 h-10 border-2 mx-auto outline-none text-lg font-medium pl-2' placeholder='Luis Gomez' />
                    <label className=' my-8 mb-1 mx-10 font-semibold text-lg italic w-11/12'>Correo</label>
                    <input type="email" className='rounded-lg w-11/12 h-10 border-2 mx-auto outline-none text-lg font-medium pl-2' placeholder='Gomez@Gmail.com' />
                    <label className=' my-8 mb-1 mx-10 font-semibold text-lg italic w-11/12'>Equipo</label>
                    <input type="text" className='rounded-lg w-11/12 h-10 border-2 mx-auto outline-none text-lg font-medium pl-2' placeholder='Spotifal' />
                    <label className=' my-8 mb-1 mx-10 font-semibold text-lg italic w-11/12 '>Miembros</label>
                    <input type="text" className='rounded-lg w-11/12 h-10 border-2 mx-auto outline-none text-lg font-medium pl-2' placeholder='Misael Rosado' />
                </form>
                </div>
                <div className='w-1/2 h-full rounded-2xl m-5 bg-white'>
                <h1 className='text-2xl font-semibold italic p-5'>Proycetos Trbajados</h1>
                <div className='w-full h-[515px] overflow-auto'>
                    <TarjetasMiembros />
                    <TarjetaMiembro />
                    <TarjetasMiembross />
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
            </>
        )
        }

        export default Miembro
