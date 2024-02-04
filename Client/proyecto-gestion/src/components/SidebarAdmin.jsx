    import { useState } from 'react';
    import { Link } from 'react-router-dom';

    function SidebarAdmin() {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const cerrarSesion = () => {
        sessionStorage.clear();
        window.location.href = '/';
    }
    return (
        <>
        {/* Estructura para pantallas grandes */}
        <div className='hidden lg:block bg-white w-72 h-auto border-2'>
            <ul className='my-10 mx-auto'>
            <li className='mx-auto text-center my-10'>
                <Link
                className='font-medium text-center text-lg italic mx-auto hover:bg-gradient-to-r hover:from-[#1E4C6A]  hover:to-[#1B7FC5] p-4 rounded-lg hover:text-white'
                to='/proyectos'
                >
                Proyectos
                </Link>
            </li>
            <li className='mx-auto text-center my-10'>
                <Link
                className='font-medium text-center text-lg italic mx-auto hover:bg-gradient-to-r hover:from-[#1E4C6A]  hover:to-[#1B7FC5] p-4 rounded-lg hover:text-white'
                to='/equipos'
                >
                Equipos
                </Link>
            </li>
            <li className='mx-auto text-center my-10'>
                <Link
                className='font-medium text-center text-lg italic mx-auto hover:bg-gradient-to-r hover:from-[#1E4C6A]  hover:to-[#1B7FC5] p-4 rounded-lg hover:text-white'
                to='/miembros'
                >
                Miembros
                </Link>
            </li>
            <li className='mx-auto text-center my-10'>
                <Link
                className='font-medium text-center text-lg italic mx-auto hover:bg-gradient-to-r hover:from-[#1E4C6A]  hover:to-[#1B7FC5] p-4 rounded-lg hover:text-white'
                to='/Recursosy/oActivos'
                >
                Recursos y activos
                </Link>
            </li>
            {/* <li className='mx-auto text-center my-10'>
                <Link
                className='font-medium text-center text-lg italic mx-auto hover:bg-gradient-to-r hover:from-[#1E4C6A]  hover:to-[#1B7FC5] p-4 rounded-lg hover:text-white'
                to='/Tareas'
                >
                Tareas
                </Link>
            </li> */}
            <li className='mx-auto text-center my-10'>
                <Link
                className='font-medium text-center text-lg italic mx-auto hover:bg-gradient-to-r hover:from-[#1E4C6A]  hover:to-[#1B7FC5] p-4 rounded-lg hover:text-white'
                onClick={cerrarSesion}
                >
                Cerrar Sesión
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
            <div className='bg-white w-72 h-auto border-2'>
                <ul className='my-10 mx-auto'>
                <li className='mx-auto text-center my-10'>
                    <Link
                    className='font-medium text-center text-lg italic mx-auto hover:bg-gradient-to-r hover:from-[#1E4C6A]  hover:to-[#1B7FC5] p-4 rounded-lg hover:text-white'
                    to='/dashboard-admin'
                    onClick={() => setMenuOpen(false)}
                    >
                    Dashboard administrador
                    </Link>
                </li>
                <li className='mx-auto text-center my-10'>
                    <Link
                    className='font-medium text-center text-lg italic mx-auto hover:bg-gradient-to-r hover:from-[#1E4C6A]  hover:to-[#1B7FC5] p-4 rounded-lg hover:text-white'
                    to='/TodosProyectos'
                    onClick={() => setMenuOpen(false)}
                    >
                    Proyectos
                    </Link>
                </li>
                <li className='mx-auto text-center my-10'>
                    <Link
                    className='font-medium text-center text-lg italic mx-auto hover:bg-gradient-to-r hover:from-[#1E4C6A]  hover:to-[#1B7FC5] p-4 rounded-lg hover:text-white'
                    to='/TodosEquipos'
                    onClick={() => setMenuOpen(false)}
                    >
                    Equipos
                    </Link>
                </li>
                <li className='mx-auto text-center my-10'>
                    <Link
                    className='font-medium text-center text-lg italic mx-auto hover:bg-gradient-to-r hover:from-[#1E4C6A]  hover:to-[#1B7FC5] p-4 rounded-lg hover:text-white'
                    to='/UsuarioMiembro'
                    onClick={() => setMenuOpen(false)}
                    >
                    Miembros
                    </Link>
                </li>
                <li className='mx-auto text-center my-10'>
                    <Link
                    className='font-medium text-center text-lg italic mx-auto hover:bg-gradient-to-r hover:from-[#1E4C6A]  hover:to-[#1B7FC5] p-4 rounded-lg hover:text-white'
                    to='/'
                    onClick={() => setMenuOpen(false)}
                    >
                    Cerrar Sesión
                    </Link>
                </li>
                </ul>
            </div>
            )}
        </div> */}
        </>
    );
    }

    export default SidebarAdmin;
