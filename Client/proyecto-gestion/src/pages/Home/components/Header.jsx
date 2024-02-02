import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Header() {
    const [rolId, setRolId] = useState(null);

    useEffect(() => {
        const usuario = JSON.parse(sessionStorage.getItem('usuario'));
        if (usuario !== null) {
            setRolId(usuario.rol_id);
        }
    }, [])

    return (
        <header className="bg-blue-500 p-4">
            <div className="container mx-auto flex items-center justify-between">
                <Link to="/" className="text-2xl font-bold text-white hover:text-gray-200">ProManSys</Link>
                <nav className="space-x-4">
                    {
                        rolId == null ? (
                            null
                        ) : rolId === 1 ? (
                            <div>
                                <Link to="/" className="text-white hover:text-gray-200 mx-5">Inicio</Link>
                                <Link to="/proyectos" className="text-white hover:text-gray-200  mx-5">Proyectos</Link>
                                <Link to="/equipos" className="text-white hover:text-gray-200  mx-5">Equipos</Link>
                                <Link to="/miembros" className="text-white hover:text-gray-200  mx-5">Miembros</Link>
                            </div>
                        ) : rolId === 2 || rolId === 3 || rolId  === 4 ? (
                            <div>
                                <Link to="/" className="text-white hover:text-gray-200 mx-5">Inicio</Link>
                                <Link to="/dashboard" className="text-white hover:text-gray-200 mx-5">Dashboard</Link>
                                <Link to="/DashboardEquipos" className="text-white hover:text-gray-200 mx-5">Dashboard Equipos</Link>
                                <Link to="/mensajeria" className="text-white hover:text-gray-200 mx-5">Mensajes</Link>
                            </div>
                        ) : null
                    }
                </nav>
            </div>
        </header>
    )
}

export default Header