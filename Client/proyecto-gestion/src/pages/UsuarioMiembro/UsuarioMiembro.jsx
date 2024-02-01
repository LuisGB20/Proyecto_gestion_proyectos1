
import { useEffect, useState } from 'react'
import Header from '../../components/header'
import SidebarAdmin from '../../components/SidebarAdmin'
import UsuarioMensaje from './components/UsuarioMensaje'

function UsuarioMiembro() {
    const [miembros, setMiembros] = useState([]);


    const obtenerMiembros = () => {
        fetch('https://localhost:4000/usuarios')
            .then(res => res.json())
            .then(data => setMiembros(data))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        obtenerMiembros()
    }, [])


    return (
        <div className='w-full h-screen bg-slate-200'>
            <Header />
            <div className='w-full flex'>
                <SidebarAdmin />
                <div className='w-full h-full'>
                    <div className='bg-white my-3 w-full h-20'>
                        <h1 className='text-2xl font-semibold italic p-5'>Miembros</h1>
                    </div>
                    <div className='w-11/12 h-full rounded-2xl bg-white mx-auto'>
                        <div className='w-full h-[580px] m-5 overflow-auto'>
                            {miembros.map(miembro => {
                                return (
                                    <UsuarioMensaje miembro={miembro} />
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UsuarioMiembro
