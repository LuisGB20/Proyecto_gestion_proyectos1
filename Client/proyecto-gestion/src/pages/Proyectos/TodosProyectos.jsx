import { Link } from 'react-router-dom';
import Header from '../../components/header';
import SidebarAdmin from '../../components/SidebarAdmin';
import TarjetasProyecto from './components/TarjetasProyecto';
import { useEffect, useState } from 'react';

function TodosProyectos() {
    const [proyectos, setProyectos] = useState([]);

    const obtenerProyectos = async () => {
        const response = await fetch('https://localhost:4000/proyectos', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(data => {
                setProyectos(data);
                console.log(data);
            })
    }

    useEffect(() => {
        obtenerProyectos();
        console.log(proyectos);
    }, [proyectos])

    return (
        <>
            <div className='w-full h-full bg-slate-200'>
                <Header area={"Dashboard administrador"} />
                <div className='flex'>
                    <SidebarAdmin />
                    <div className='w-full h-full'>
                        <div className='w-full h-full'>
                            <div className='bg-white my-3 w-full h-20 flex justify-between'>
                                <h1 className='text-2xl font-semibold italic p-5'>Proyectos</h1>
                                <Link to='/NuevoProyecto'>
                                    <button className='font-medium text-center text-lg italic bg-gradient-to-r from-[#1E4C6A]  to-[#1B7FC5] p-2 mx-5 my-3 rounded-lg text-white'>Crear Nuevo Proyecto</button>
                                </Link>
                            </div>
                        </div>
                        {proyectos.length > 0 ? (
                                                    <div className='grid grid-cols-3 gap-4 mx-5 overflow-auto h-[623px]'>
                                                    {proyectos.map(proyecto => (
                                                        <Link key={proyecto.id} to={`/proyectos/${proyecto.id}`}>
                                                            <TarjetasProyecto proyecto={proyecto} />
                                                        </Link>
                                                    ))}
                                                    {/* <button className='font-medium text-center text-lg italic bg-gradient-to-r from-[#1E4C6A]  to-[#1B7FC5] p-2 ml-40 my-5 rounded-lg text-white'>Siguiente</button> */}
                                                </div>
                        ) : (
                            <h1 className='text-2xl font-semibold italic p-5'>No hay proyectos registrados</h1>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default TodosProyectos;
