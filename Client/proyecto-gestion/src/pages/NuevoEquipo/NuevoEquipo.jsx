import  { useEffect, useState } from 'react';

import Header from '../../components/header';
import Anadir from '../../Img/anadir.png';
import SidebarAdmin from '../../components/SidebarAdmin';
import TarjetaMiembro from './Components/TarjetaMiembro';
import Swal from 'sweetalert2';

function NuevoEquipo() {
    const [proyectos, setProyectos] = useState([]);
    const [miembros, setMiembros] = useState([]);
    const [equipo, setEquipo] = useState({
        nombre: '',
        descripcion: '',
        proyecto: null,
        miembros: [],
    });
    const [nuevoMiembro, setNuevoMiembro] = useState({
        id: "",
        nombre: "",
        apellido: "",
        rol: ""
    });


    const traerTodosProyectos = async () => {
        const respuesta = await fetch('https://localhost:4000/proyectos', {
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

    const traerTodosMiembros = () => {
        const respuesta = fetch('https://localhost:4000/usuariosnojefes', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(data => {
                setMiembros(data);
                console.log(data);
            })
    }

    const agregarMiembro = (id, nombre, apellido, rol) => { 
        // Agregar el miembro al estado del equipo
        setEquipo((prevEquipo) => ({
            ...prevEquipo,
            miembros: [...prevEquipo.miembros, { id, nombre, apellido, rol }],
        }))
        // Limpiar los campos del formulario
        setNuevoMiembro({
            id: "",
            nombre: "",
            apellido: "",
            rol: ""
        });
    }

    const eliminarMiembro = (index) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: 'Esta acción eliminará al miembro del equipo. ¿Deseas continuar?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminar miembro',
        }).then((result) => {
            if (result.isConfirmed) {
                // Llama a la función para eliminar el miembro solo si el usuario confirma
                setEquipo((prevEquipo) => {
                    const nuevosMiembros = [...prevEquipo.miembros];
                    nuevosMiembros.splice(index, 1);
                    return {
                        ...prevEquipo,
                        miembros: nuevosMiembros,
                    };
                });

                Swal.fire({
                    title: '¡Eliminado!',
                    icon:'success',
                    text: 'El miembro ha sido eliminado del equipo.'
                });
            }
        });
    };

    const crearEquipo = async (e) => {
        e.preventDefault();
        if (equipo.nombre.trim() === '' || equipo.descripcion.trim() === '' || equipo.proyecto === null || equipo.miembros.length === 0) {
            Swal.fire({
                icon: 'Error', 
                text: 'Por favor, completa todos los campos antes de crear el equipo.'
            });
            return;
        }
        Swal.fire({
            title: '¿Estás seguro?',
            text: 'Esta acción creará el equipo. ¿Deseas continuar?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, crear equipo',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    console.log(equipo);
                    const response = await fetch('https://localhost:4000/equipos', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(equipo),
                    });
                    if (response.ok) {
                        // Equipo creado exitosamente
                        Swal.fire({
                            icon: "success",
                            text: 'Equipo creado exitosamente',
                        });
                        // Redirigir al usuario a la página de inicio al hacer click en la alerta
                        window.location.href = '/equipos'; // Cambia la ruta a la página de inicio
                    } else {
                        // Manejo de error, puedes mostrar un mensaje al usuario, etc.
                    }
                } catch (error) {
                    console.error('Error al crear el equipo:', error);
                    Swal.fire({
                        icon: 'Error', 
                        text: 'Hubo un problema al crear el equipo'
                    });
                }
            }
        });
    };

    useEffect(() => {
        traerTodosProyectos();
        traerTodosMiembros();
    }, [])
    return (
        <div className='bg-slate-50 w-full'>
            <Header area={"Miembros"} />
            <div className='flex'>
                <SidebarAdmin />
                <div className='w-full h-full'>
                    <div className='w-full h-full'>
                        <div className='bg-white my-3 w-full h-20 flex justify-between shadow'>
                            <h1 className='text-2xl font-semibold  p-5'>NUEVO EQUIPO</h1>
                        </div>
                        <div className="w-full flex items-center ">
                            <form className="bg-white shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] rounded px-10 pt-8 pb-12 md:w-96 xl:w-11/12 lg:w-2/3  ml-12 mt-4 mb-8 ">
                                <div className="mb-4 ">
                                    <label className="block text-gray-500 text-sm font-bold mb-2" for="username">
                                        Nombre
                                    </label>
                                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Agrega un Nombre al Equipo"
                                        value={equipo.nombre} required
                                        onChange={(e) => setEquipo({ ...equipo, nombre: e.target.value })}
                                    />
                                </div>
                                <div className="mb-4 ">
                                    <label className="block text-gray-500 text-sm font-bold mb-2" for="text">
                                        Descripción
                                    </label>
                                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="text" type="text" placeholder="Describe información General sobre el Equipo"
                                        value={equipo.descripcion} required
                                        onChange={(e) => setEquipo({ ...equipo, descripcion: e.target.value })}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-500 text-sm font-bold mb-2" for="text">
                                        Asignar un Proyecto
                                    </label>
                                    {/* <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="team" type="text" placeholder="¿Qué proyecto va a realizar?"
                                        value={equipo.proyecto}
                                        onChange={(e) => setEquipo({ ...equipo, proyecto: e.target.value })}
                                    /> */}
                                    <select className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="team'
                                        value={equipo.proyecto}
                                        onChange={(e) => setEquipo({ ...equipo, proyecto: Number(e.target.value) })}
                                    >
                                        <option value="" disabled>Selecciona un Proyecto</option>
                                        {proyectos.map((proyecto, index) => (
                                            <option key={index} value={proyecto.id}>{proyecto.nombre}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-4 flex items-center">
                                <select
    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="team'
    value={nuevoMiembro.id}
    onChange={(e) => {
        const selectedMember = miembros.find(member => member.id === Number(e.target.value));

        setNuevoMiembro({
            id: selectedMember.id,
            nombre: selectedMember.nombre,
            apellido: selectedMember.apellido,
            rol: selectedMember.rol_id === 2 ? 'Diseñador' :
                selectedMember.rol_id === 3 ? 'Programador' :
                    selectedMember.rol_id === 4 ? 'Analista' : 'Rol Desconocido',
        });
    }}
>
    <option value="" disabled>Selecciona un Miembro</option>
    {miembros.map((miembro, index) => (
        <option key={index} value={miembro.id}>{`${miembro.nombre} ${miembro.apellido} - ${miembro.rol_id === 2 ? 'Diseñador' :
                miembro.rol_id === 3 ? 'Programador' :
                    miembro.rol_id === 4 ? 'Analista' : 'Rol Desconocido'
            }`}</option>
    ))}
</select>
<button
    className="ml-4 bg-gray-800 text-white px-4 py-2 rounded"
    onClick={(e) => {
        e.preventDefault();
        agregarMiembro(nuevoMiembro.id, nuevoMiembro.nombre, nuevoMiembro.apellido, nuevoMiembro.rol);
    }}
>
    Agregar
</button>

                                </div>

                                <div className="mb-8 p-4 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] w-full h-96 grid grid-cols-4 gap-4 ">
                                    {equipo.miembros.map((miembro, index) => (
                                        <TarjetaMiembro
                                          key={index}
                                          nombre={miembro.nombre}
                                          rol={miembro.rol}
                                          onDelete={() => eliminarMiembro(index)}
                                        />
                                    ))}
                                </div>

                            </form>
                        </div>
                        <div className=' my-3 w-full h-20 flex justify-between items-center'>
                            <button className='font-medium text-center text-lg bg-gradient-to-r from-[#1E4C6A]  to-[#1B7FC5] p-2 mx-5 my-3 rounded-lg text-white ml-auto mr-12'
                            onClick={crearEquipo}>Crear Equipo</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NuevoEquipo;
