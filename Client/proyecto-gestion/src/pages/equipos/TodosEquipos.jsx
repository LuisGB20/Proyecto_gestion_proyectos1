
import { Link } from 'react-router-dom'
import Header from '../../components/header'
import SidebarAdmin from '../../components/SidebarAdmin'
import TarjetasEquipo from './components/TarjetasEquipo'
import { useEffect, useState } from 'react'

function TodosEquipos() {
    const [equipos, setEquipos] = useState([])

    const obtenerEquipos = async () => {
        const response = await fetch('https://localhost:4000/equipos', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(data => {
                setEquipos(data);
                console.log(data);
            })
    }

    useEffect(() => {
        obtenerEquipos();
        console.log(equipos);
    }, [])

    return (
        <div className='w-full h-full bg-slate-200'>
            <Header area={"Dashboard administrador"} />
            <div className='flex'>
                <SidebarAdmin />
                <div className='w-full h-full'>
                    <div className='w-full h-full'>
                        <div className='bg-white my-3 w-full h-20 flex justify-between'>
                            <h1 className='text-2xl font-semibold italic p-5'>Equipos</h1>
                            <Link to='/NuevoEquipo'>
                                <button className='font-medium text-center text-lg italic bg-gradient-to-r from-[#1E4C6A]  to-[#1B7FC5] p-2 mx-5 my-3 rounded-lg text-white'>Agregar nuevo equipo</button>

                            </Link>
                        </div>
                    </div>
                    <div className='grid grid-cols-3 gap-4 mx-5 overflow-auto h-[623px]'>
                        {equipos.map(equipo => {
                            return (
                                <Link>
                                    <TarjetasEquipo key={equipo.id} equipo={equipo} />
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TodosEquipos