import React, { useEffect, useState } from 'react';
import Header from '../../components/header';
import SidebarAdmin from '../../components/SidebarAdmin';
import Swal from 'sweetalert2';
import preguntas from '../../data/preguntas.js';

function NuevoMiembro() {
    const [nuevoUsuario, setNuevoUsuario] = useState({
        nombre: '',
        apellido: '',
        email: '',
        contrasena: '',
        pregunta_seguridad: '',
        respuesta_seguridad: '',
        rol_id: null,
    });
    const [equipos, setEquipos] = useState([]);
    const [equipo, setEquipo] = useState(null);

    const agregarUsuario = async (e) => {
        e.preventDefault();
        const forbiddenCharsRegex = /[<>`';"]/;
        if (forbiddenCharsRegex.test(nuevoUsuario.nombre) || forbiddenCharsRegex.test(nuevoUsuario.apellido) || forbiddenCharsRegex.test(nuevoUsuario.email) || forbiddenCharsRegex.test(nuevoUsuario.contrasena) || forbiddenCharsRegex.test(nuevoUsuario.pregunta_seguridad) || forbiddenCharsRegex.test(nuevoUsuario.respuesta_seguridad)) {
            Swal.fire({
                icon: "warning",
                text: "Los campos no pueden contener caracteres especiales como <>`;',\""
            });
            return;
        }
        if (nuevoUsuario.nombre.trim() === "" || nuevoUsuario.apellido.trim() === "" || nuevoUsuario.email.trim() === "" || nuevoUsuario.contrasena.trim() === "" || nuevoUsuario.pregunta_seguridad.trim() === "" || nuevoUsuario.respuesta_seguridad.trim() === "") {
            Swal.fire({
                icon: "warning",
                text: "Los campos no pueden estar vacios"
            });
            return;
        }
        if (nuevoUsuario.contrasena.length < 8) {
            Swal.fire({
                icon: 'warning',
                text: 'La contraseña debe tener al menos 8 caracteres'
            });
            return;
        }
        if (!nuevoUsuario.email.includes('@')) {
            Swal.fire({
                icon: "warning",
                text: "El correo electrónico debe contener el símbolo '@'"
            });
            return;
        }
        try {
            console.log(nuevoUsuario)
            console.log(equipo)
            const response = await fetch('https://localhost:4000/usuarios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    ...nuevoUsuario,
                    equipo: equipo === "" ? null : equipo
                }),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.message === "El usuario ya existe") {
                        Swal.fire({
                            icon: "warning",
                            text: "El usuario ya existe"
                        })
                    }
                    if (data.ok) {
                        Swal.fire({
                            title: "Usuario agregado con exito",
                            showDenyButton: false,
                            showCancelButton: false,
                            confirmButtonText: "Save",
                            denyButtonText: `Don't save`
                        }).then((result) => {
                            if (result.isConfirmed) {
                                window.location.href = '/miembros';
                            }
                        });
                    }
                })
                .catch(error => {
                    console.log(error)
                });
        } catch (error) {
            console.error('Error al crear el usuario:', error);
        }
    };

    useEffect(() => {
        const response = fetch('https://localhost:4000/equipos')
            .then(response => response.json())
            .then(data => {
                setEquipos(data);
                console.log(data)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    return (
        <div className='bg-slate-50'>
            <Header />
            <div className='flex w-full h-full'>
                <SidebarAdmin />
                <div className='w-full h-full'>
                    <div className='w-full h-full'>
                        <div className='bg-white my-3 w-full h-20 flex justify-between shadow'>
                            <h1 className='text-2xl font-semibold p-3 my-auto'>NUEVO MIEMBRO</h1>
                            <button
                                className='font-medium text-center text-lg bg-gradient-to-r from-[#1E4C6A]  to-[#1B7FC5] p-2 mx-5 my-3 rounded-lg text-white ml-auto mr-12'
                                onClick={agregarUsuario}
                            >
                                Crear Miembro
                            </button>
                        </div>
                        <div className='w-full flex items-center m-auto'>
                            <form className='bg-white shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] rounded px-10 pt-8 pb-12 md:w-96 lg:w-11/12  mx-auto my-24'>
                                <div className='mb-4 '>
                                    <label className='block text-gray-500 text-sm font-bold mb-2' htmlFor='nombre'>
                                        Nombre
                                    </label>
                                    <input
                                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                        id='nombre'
                                        type='text'
                                        placeholder='Agrega un Nombre'
                                        value={nuevoUsuario.nombre}
                                        onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, nombre: e.target.value })}
                                    />
                                </div>
                                <div className='mb-4 '>
                                    <label className='block text-gray-500 text-sm font-bold mb-2' htmlFor='apellido'>
                                        Apellido
                                    </label>
                                    <input
                                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
                                        id='apellido'
                                        type='text'
                                        placeholder='Agrega un Apellido'
                                        value={nuevoUsuario.apellido}
                                        onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, apellido: e.target.value })}
                                    />
                                </div>
                                <div className='mb-4 '>
                                    <label className='block text-gray-500 text-sm font-bold mb-2' htmlFor='email'>
                                        Email
                                    </label>
                                    <input
                                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
                                        id='email'
                                        type='email'
                                        placeholder='Agrega un Email'
                                        value={nuevoUsuario.email}
                                        onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, email: e.target.value })}
                                    />
                                </div>
                                <div className='mb-4 '>
                                    <label className='block text-gray-500 text-sm font-bold mb-2' htmlFor='contrasena'>
                                        Contraseña
                                    </label>
                                    <input
                                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
                                        id='contrasena'
                                        type='password'
                                        placeholder='Agrega una Contraseña'
                                        value={nuevoUsuario.contrasena}
                                        onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, contrasena: e.target.value })}
                                    />
                                </div>
                                <div className='mb-4 '>
                                    <label className='block text-gray-500 text-sm font-bold mb-2' htmlFor='equipo'>
                                        Equipo
                                    </label>
                                    <select
                                        value={equipo}
                                        onChange={(e) => setEquipo(e.target.value)}
                                        className="w-full h-10 px-4 mb-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                    >
                                        <option value="" className='text-xl'>
                                            Ninguno
                                        </option>
                                        {equipos.map((equipo) => (
                                            <option key={equipo.id} value={equipo.id} className='text-xl'>
                                                {equipo.nombreEquipo}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className='mb-4 '>
                                    <label className='block text-gray-500 text-sm font-bold mb-2' htmlFor='pregunta_seguridad'>
                                        Pregunta de Seguridad
                                    </label>
                                    <select
                                        value={nuevoUsuario.pregunta_seguridad}
                                        onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, pregunta_seguridad: e.target.value })}
                                        className="w-full h-10 px-4 mb-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                    >
                                        {preguntas.map((pregunta, index) => (
                                            <option key={index} value={pregunta} className='text-xl'>
                                                {pregunta}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className='mb-4 '>
                                    <label className='block text-gray-500 text-sm font-bold mb-2' htmlFor='respuesta_seguridad'>
                                        Respuesta de Seguridad
                                    </label>
                                    <input
                                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
                                        id='respuesta_seguridad'
                                        type='text'
                                        placeholder='Agrega una Respuesta de Seguridad'
                                        value={nuevoUsuario.respuesta_seguridad}
                                        onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, respuesta_seguridad: e.target.value })}
                                    />
                                </div>
                                <div className='mb-4'>
                                    <label className='block text-gray-500 text-sm font-bold mb-2' htmlFor='rol_id'>
                                        Rol
                                    </label>
                                    <select
                                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                        value={nuevoUsuario.rol_id}
                                        onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, rol_id: Number(e.target.value) })}
                                    >
                                        <option value='' disabled>
                                            Seleccionar Rol
                                        </option>
                                        <option value='1'>Jefe</option>
                                        <option value='2'>Diseñador</option>
                                        <option value='3'>Programador</option>
                                        <option value='4'>Analista</option>
                                    </select>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NuevoMiembro;
