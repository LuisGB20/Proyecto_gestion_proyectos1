import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/header";
import SidebarAdmin from "../../components/SidebarAdmin";
import perfil from "../../Img/perfil.png";
import Modal from 'react-modal';
import Swal from "sweetalert2";

function Miembro() {
    const miembroId = useParams();
    const [miembro, setMiembro] = useState({});
    const [editando, setEditando] = useState(false);
    const [rol, setRol] = useState("");

    // Mensaje de Errores
    const [nombreError, setNombreError] = useState("");
    const [apellidoError, setApellidoError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [equipoError, setEquipoError] = useState("");

    const validarDatos = () => {
        let errores = false;
        if (!miembro.nombre) {
            setNombreError("Por favor, ingresa el nombre.");
            errores = true;
        } else {
            setNombreError("");
        }
        if (!miembro.apellido) {
            setApellidoError("Por favor, ingresa el apellido.");
            errores = true;
        } else {
            setApellidoError("");
        }
        if (!miembro.email) {
            setEmailError("Por favor, ingresa el correo.");
            errores = true;
        } else {
            setEmailError("");
        }
        if (!miembro.equipo) {
            setEquipoError("Por favor, ingresa el equipo.");
            errores = true;
        } else {
            setEquipoError("");
        }
        return !errores;
    };

    const actualizarDatos = () => {
        if (validarDatos()) {
            console.log(miembroId);
            console.log(miembro.nombre);
            console.log(miembro.apellido);
            console.log(miembro.email);
            console.log(miembro.rol);
            console.log(miembro.equipo);
    
            fetch(`https://localhost:4000/usuarios/${Number(miembroId.miembroId)}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nombre: miembro.nombre,
                    apellido: miembro.apellido,
                    email: miembro.email,
                    rol: miembro.rol,
                    equipo: miembro.equipo,
                }),
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                // Puedes agregar más lógica aquí si es necesario
                MySwal.fire('¡Actualizado!', 'La información del miembro ha sido actualizada.', 'success');
                setEditando(false); // Cerrar el modal después de la actualización
            })
            .catch(error => {
                console.log(error);
                // Puedes manejar errores aquí si es necesario
                MySwal.fire('Error', 'Hubo un problema al actualizar la información del miembro.', 'error');
            });
        }
    };

    const confirmarEliminacion = () => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: 'Esta acción no se puede deshacer.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
        }).then((result) => {
            if (result.isConfirmed) {
                eliminarMiembro();
            }
        });
    };

    const eliminarMiembro = () => {
        alert("Eliminando miembro")
        fetch(`https://localhost:4000/usuarios/${miembroId.miembroId}`, {
            method: "DELETE",
        }).then((res) => {
            if (res.ok) {
                Swal.fire('¡Eliminado!', 'El miembro ha sido eliminado.', 'success');
                window.location.href = "/miembros";
            }
        })
        .catch((err) => console.log(err));
    }

    const obtenerMiembro = () => {
        fetch(`https://localhost:4000/usuarios/${miembroId.miembroId}`)
            .then((res) => res.json())
            .then((data) => {
                setMiembro(data);
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        obtenerMiembro();
    }, []);

    return (
        <div className="w-full h-full bg-slate-200">
            <Header area={"Información del miembro"} />
            <div className="flex w-full h-full">
                <SidebarAdmin />
                <div className="flex items-center justify-between h-full p-8 w-full">
                    <img src={perfil} className="w-64 h-64 rounded-full mb-4 mx-20" alt="Perfil" />
                    <div className="bg-white rounded-lg p-8 w-6/12 mx-20">
                        <h1 className="text-2xl font-semibold mb-4">Información del usuario</h1>
                        <div className="mb-4">
                            <h1 className="font-semibold text-lg italic">Nombre</h1>
                            <p className="rounded-lg h-10 border-2 outline-none text-lg font-medium pl-2">
                                {miembro.nombre}
                            </p>
                        </div>
                        <div className="mb-4">
                            <h1 className="font-semibold text-lg italic">Apellido</h1>
                            <p className="rounded-lg h-10 border-2 outline-none text-lg font-medium pl-2">
                                {miembro.apellido}
                            </p>
                        </div>
                        <div className="mb-4">
                            <h1 className="font-semibold text-lg italic">Correo</h1>
                            <p className="rounded-lg h-10 border-2 outline-none text-lg font-medium pl-2">
                                {miembro.email}
                            </p>
                        </div>
                        <div className="mb-4">
                            <h1 className="font-semibold text-lg italic">Equipo</h1>
                            <p className="rounded-lg h-10 border-2 outline-none text-lg font-medium pl-2">
                                {miembro.equipo}
                            </p>
                        </div>
                        <div>
                            <h1 className="font-semibold text-lg italic">Rol</h1>
                            <p className="rounded-lg h-10 border-2 outline-none text-lg font-medium pl-2">
                                {miembro.rol}
                            </p>
                        </div>
                        <div className="my-5 flex justify-between">
                            <button
                                type="button"
                                className="bg-red-500 text-white rounded px-4 py-2 mx-auto"
                                onClick={confirmarEliminacion}
                            >
                                Eliminar
                            </button>
                            <button
                                type="button"
                                className="bg-gradient-to-r from-[#1E4C6A]  to-[#1B7FC5] text-white rounded px-4 py-2 mx-auto"
                                onClick={() => setEditando(true)}
                            >
                                Editar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                isOpen={editando}
                onRequestClose={() => setEditando(false)}
                contentLabel="Editar miembro"
                className="bg-white rounded-lg shadow-lg p-6 w-1/2 m-auto my-20 flex flex-col justify-center align-middle outline-none"
            >
                <form className="p-8 bg-white rounded-lg w-full mx-auto flex flex-col justify-center align-middle">
                    <h1 className="text-2xl font-semibold mb-4 mx-auto">Editar información del usuario</h1>
                    <div className="mb-4 flex flex-col">
                        <label htmlFor="nombre" className="font-semibold text-lg italic">Nombre</label>
                        <input
                            required
                            type="text"
                            className={`rounded-lg h-10 border-2 outline-none text-lg font-medium pl-2 ${nombreError ? 'border-red-500' : ''}`}
                            value={miembro.nombre}
                            onChange={(e) => setMiembro({ ...miembro, nombre: e.target.value })}
                        />
                        <p className="text-red-500 text-sm mt-1">{nombreError}</p>
                    </div>
                    <div className="mb-4 flex flex-col">
                        <label htmlFor="nombre" className="font-semibold text-lg italic">Apellido</label>
                        <input
                            required
                            type="text"
                            className={`rounded-lg h-10 border-2 outline-none text-lg font-medium pl-2 ${apellidoError ? 'border-red-500' : ''}`}
                            value={miembro.apellido}
                            onChange={(e) => setMiembro({ ...miembro, apellido: e.target.value })}
                        />
                        <p className="text-red-500 text-sm mt-1">{apellidoError}</p>
                    </div>
                    <div className="mb-4 flex flex-col">
                        <label htmlFor="nombre" className="font-semibold text-lg italic">Email</label>
                        <input
                            required
                            type="text"
                            className={`rounded-lg h-10 border-2 outline-none text-lg font-medium pl-2 ${emailError ? 'border-red-500' : ''}`}
                            value={miembro.email}
                            onChange={(e) => setMiembro({ ...miembro, email: e.target.value })}
                        />
                        <p className="text-red-500 text-sm mt-1">{emailError}</p>
                    </div>
                    <div className="mb-4 flex flex-col">
                        <label htmlFor="nombre" className="font-semibold text-lg italic">Equipo</label>
                        <input
                            required
                            type="text"
                            className={`rounded-lg h-10 border-2 outline-none text-lg font-medium pl-2 ${equipoError ? 'border-red-500' : ''}`}
                            value={miembro.equipo}
                            onChange={(e) => setMiembro({ ...miembro, equipo: e.target.value })}
                        />
                        <p className="text-red-500 text-sm mt-1">{equipoError}</p>
                    </div>
                    <div className="mb-4 flex flex-col">
                        <label htmlFor="nombre" className="font-semibold text-lg italic">Rol</label>
                        <select className='rounded-lg h-10 border-2 outline-none text-lg font-medium pl-2' value={miembro.rol} 
                        onChange={(e) => setMiembro({ ...miembro, rol: e.target.value })}>
                            <option value="Jefe" className='text-black'>Jefe</option>
                            <option value="Diseñador">Diseñador</option>
                            <option value="Programador">Programador</option>
                            <option value="Analista">Analista</option>
                        </select>
                    </div>
                    <div className="flex justify-between mt-4">
                        <button
                            type="button"
                            className="bg-gradient-to-r from-[#1E4C6A] to-[#1B7FC5] text-white rounded px-4 py-2"
                            onClick={actualizarDatos}
                        >
                            Guardar
                        </button>
                        <button
                            type="button"
                            className="bg-red-500 text-white rounded px-4 py-2"
                            onClick={() => setEditando(false)}
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}

export default Miembro;
