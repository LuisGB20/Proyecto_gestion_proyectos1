import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/header";
import SidebarAdmin from "../../components/SidebarAdmin";
import perfil from "../../Img/perfil.png";
import Modal from 'react-modal';

function Miembro() {
    const miembroId = useParams();
    const [miembro, setMiembro] = useState({});
    const [editando, setEditando] = useState(false);
    const [rol, setRol] = useState("");

    const actualizarDatos = () => {
        console.log(miembroId)
        console.log(miembro.nombre);
        console.log(miembro.apellido);
        console.log(miembro.email);
        console.log(miembro.rol);
        console.log(miembro.equipo);
        const response = fetch(`https://localhost:4000/usuarios/${Number(miembroId.miembroId)}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nombre: miembro.nombre,
                apellido: miembro.apellido,
                email: miembro.email,
                rol: miembro.rol,
                equipo: miembro.equipo
            })
        }).then(response => response.json())
            .then(data => {
                    console.log(data)
            }
            )
            .catch(error => {
                    console.log(error)
            }
        )
        console.log(miembro)
        console.log(rol)
    }

    const eliminarMiembro = () => {
        alert("Eliminando miembro")
        fetch(`https://localhost:4000/usuarios/${miembroId.miembroId}`, {
            method: "DELETE",
        }).then((res) => {
            if (res.ok) {
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
                                onClick={eliminarMiembro}
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
                            type="text"
                            className="rounded-lg h-10 border-2 outline-none text-lg font-medium pl-2"
                            value={miembro.nombre}
                            onChange={(e) => setMiembro({ ...miembro, nombre: e.target.value })}
                        />
                    </div>
                    <div className="mb-4 flex flex-col">
                        <label htmlFor="nombre" className="font-semibold text-lg italic">Apellido</label>
                        <input
                            type="text"
                            className="rounded-lg h-10 border-2 outline-none text-lg font-medium pl-2"
                            value={miembro.apellido}
                            onChange={(e) => setMiembro({ ...miembro, apellido: e.target.value })}
                        />
                    </div>
                    <div className="mb-4 flex flex-col">
                        <label htmlFor="nombre" className="font-semibold text-lg italic">Email</label>
                        <input
                            type="text"
                            className="rounded-lg h-10 border-2 outline-none text-lg font-medium pl-2"
                            value={miembro.email}
                            onChange={(e) => setMiembro({ ...miembro, email: e.target.value })}
                        />
                    </div>
                    <div className="mb-4 flex flex-col">
                        <label htmlFor="nombre" className="font-semibold text-lg italic">Equipo</label>
                        <input
                            type="text"
                            className="rounded-lg h-10 border-2 outline-none text-lg font-medium pl-2"
                            value={miembro.equipo}
                            onChange={(e) => setMiembro({ ...miembro, equipo: e.target.value })}
                        />
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
