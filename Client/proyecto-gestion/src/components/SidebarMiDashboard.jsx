import { useState } from 'react';
import { Link } from 'react-router-dom';

function SidebarMiDashboard() {
    const [isMenuOpen, setMenuOpen] = useState(false);

    const cerrarSesion = () => {
        sessionStorage.clear();
        window.location.href = '/';
    };

    return (
        <>
            {/* Estructura para pantallas grandes */}
            <div className='hidden lg:block bg-white w-64 h-auto border-2'>
                <ul className='my-10 mx-auto'>
                    <li className='mx-auto text-center my-10'>
                        <Link
                            to='/Dashboard'
                            className='font-medium text-center text-lg italic mx-auto hover:bg-gradient-to-r hover:from-[#1E4C6A]  hover:to-[#1B7FC5] p-4 rounded-lg hover:text-white'
                        >
                            Mi Dashboard
                        </Link>
                    </li>
                    <li className='mx-auto text-center my-10'>
                        <Link
                            to='/DashboardEquipos'
                            className='font-medium text-center text-lg italic mx-auto hover:bg-gradient-to-r hover:from-[#1E4C6A]  hover:to-[#1B7FC5] p-4 rounded-lg hover:text-white'
                        >
                            Mi equipo
                        </Link>
                    </li>
                    <li className='mx-auto text-center my-10'>
                        <Link
                            to='/mensajeria'
                            className='font-medium text-center text-lg italic mx-auto hover:bg-gradient-to-r hover:from-[#1E4C6A]  hover:to-[#1B7FC5] p-4 rounded-lg hover:text-white'
                        >
                            Tablero de miembros
                        </Link>
                    </li>
                    {/* <li className='mx-auto text-center my-10'>
                <Link
                to='/SolicitudRecursos'
                className='font-medium text-center text-lg italic mx-auto hover:bg-gradient-to-r hover:from-[#1E4C6A]  hover:to-[#1B7FC5] p-4 rounded-lg hover:text-white'
                >
                Recursos 
                </Link>
            </li> */}
                    <li className='mx-auto text-center my-10'>
                        <Link
                            to='/SolicitudActivos'
                            className='font-medium text-center text-lg italic mx-auto hover:bg-gradient-to-r hover:from-[#1E4C6A]  hover:to-[#1B7FC5] p-4 rounded-lg hover:text-white'
                        >
                            Recursos y activos
                        </Link>
                    </li>
                    <li className='mx-auto text-center my-10' onClick={cerrarSesion}>
                        <Link
                            className='font-medium text-center text-lg italic mx-auto hover:bg-gradient-to-r hover:from-[#1E4C6A]  hover:to-[#1B7FC5] p-4 rounded-lg hover:text-white'
                            to='/'
                            onClick={cerrarSesion}
                        >
                            Cerrar sesión
                        </Link>
                    </li>
                </ul>
            </div>

            {/* Menú hamburguesa para pantallas pequeñas
        <div className='lg:hidden'>
            <button
            className='bg-gray-800 text-white p-2'
            onClick={() => setMenuOpen(!isMenuOpen)}
            >
            ☰
            </button>

            {isMenuOpen && (
            <div className='bg-white w-64 h-auto border-2'>
                <ul className='my-10 mx-auto'>
                <li className='mx-auto text-center my-10'>
                    <Link
                    to='/Dashboard'
                    className='font-medium text-center text-lg italic mx-auto hover:bg-gradient-to-r hover:from-[#1E4C6A]  hover:to-[#1B7FC5] p-4 rounded-lg hover:text-white'
                    onClick={() => setMenuOpen(false)}
                    >
                    Mi Dashboard
                    </Link>
                </li>
                <li className='mx-auto text-center my-10'>
                    <Link
                    to='/DashboardEquipos'
                    className='font-medium text-center text-lg italic mx-auto hover:bg-gradient-to-r hover:from-[#1E4C6A]  hover:to-[#1B7FC5] p-4 rounded-lg hover:text-white'
                    onClick={() => setMenuOpen(false)}
                    >
                    Mi equipo
                    </Link>
                </li>
                <li className='mx-auto text-center my-10'>
                    <Link
                    to='/TableroMiembros'
                    className='font-medium text-center text-lg italic mx-auto hover:bg-gradient-to-r hover:from-[#1E4C6A]  hover:to-[#1B7FC5] p-4 rounded-lg hover:text-white'
                    onClick={() => setMenuOpen(false)}
                    >
                    Tablero de miembros
                    </Link>
                </li>
                <li className='mx-auto text-center my-10'>
                    <Link
                    to='/ResourcesAndAssets'
                    className='font-medium text-center text-lg italic mx-auto hover:bg-gradient-to-r hover:from-[#1E4C6A]  hover:to-[#1B7FC5] p-4 rounded-lg hover:text-white'
                    onClick={() => setMenuOpen(false)}
                    >
                    Recursos y activos
                    </Link>
                </li>
                <li className='mx-auto text-center my-10'>
                    <Link
                    to='/SolicitudRecursos'
                    className='font-medium text-center text-lg italic mx-auto hover:bg-gradient-to-r hover:from-[#1E4C6A]  hover:to-[#1B7FC5] p-4 rounded-lg hover:text-white'
                    onClick={() => setMenuOpen(false)}
                    >
                    Recursos 
                    </Link>
                </li>
                <li className='mx-auto text-center my-10'>
                    <Link
                    to='/SolicitudActivos'
                    className='font-medium text-center text-lg italic mx-auto hover:bg-gradient-to-r hover:from-[#1E4C6A]  hover:to-[#1B7FC5] p-4 rounded-lg hover:text-white'
                    onClick={() => setMenuOpen(false)}
                    >
                    activos
                    </Link>
                </li>
                <li className='mx-auto text-center my-10' onClick={() => setMenuOpen(false)}>
                    <Link
                    className='font-medium text-center text-lg italic mx-auto hover:bg-gradient-to-r hover:from-[#1E4C6A]  hover:to-[#1B7FC5] p-4 rounded-lg hover:text-white'
                    to='/'
                    >
                    Cerrar sesión
                    </Link>
                </li>
                </ul>
            </div>
            )}
        </div> */}
        </>
    );
}

export default SidebarMiDashboard;
