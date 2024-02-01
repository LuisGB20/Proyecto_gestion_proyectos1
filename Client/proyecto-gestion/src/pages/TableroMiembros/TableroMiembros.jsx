
import Header from '../../components/header'
import SidebarMiDashboard from '../../components/SidebarMiDashboard'
import Mensaje from './components/Mensaje'

function TableroMiembros() {
    return (
        <div className='w-full h-full bg-slate-200'>
            <Header area={"Mi dashboard"}></Header>
            <div className='w-full h-full flex'>
                <SidebarMiDashboard />
                <div className='w-full h-full'>
                    <div className='bg-white my-3 w-full h-20'>
                        <h1 className='text-2xl font-semibold italic p-5'>Tablero de miembros</h1>
                    </div>
                    <div className='w-11/12 h-full rounded-2xl bg-white mx-auto'>
                        <h1 className='m-5 p-5 font-semibold italic text-xl'>Chat del equipo</h1>
                        <div className='w-full h-[515px] m-5 overflow-auto'>
                            <Mensaje/>
                            <Mensaje/>
                            <Mensaje/>
                            <Mensaje/>
                            <Mensaje/>
                            <Mensaje/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TableroMiembros