import React from 'react';
import Logo from '../../IMG/logo.png'
import { Link } from "react-router-dom";
import { useState } from "react";
import Modal from 'react-modal';
import Swal from 'sweetalert2'

function Login() {
    const [usuario, setUsuario] = useState({
        email: "",
        contrasena: "",
    });
    const [pregunta, setPregunta] = useState("");
    const [respuesta, setRespuesta] = useState("");
    const [codigo, setCodigo] = useState("");
    const [modalCodigoIsOpen, setModalCodigoIsOpen] = useState(false);
    const [modalPreguntaIsOpen, setModalPreguntaIsOpen] = useState(false);

    // Modal de codigo de verificacion
    const openModalCodigo = () => {
        setModalCodigoIsOpen(true);
    }
    const closeModalCodigo = () => {
        setModalCodigoIsOpen(false);
    }

    //Modal de pregunta
    const openModalPregunta = () => {
        setModalPreguntaIsOpen(true);
    }
    const closeModalPregunta = () => {
        setModalPreguntaIsOpen(false);
    }

    const validar = () => {
        if (usuario.email.trim() === "" || usuario.contrasena.trim() === "") {
            Swal.fire({
                icon: "warning",
                text: "Por favor, complete todos los campos"
            })
            return;
        }
        if (usuario.contrasena.length < 8) {
            Swal.fire({
                icon: 'warning',
                text: 'La contraseña debe tener al menos 8 caracteres'
            });
            return;
        }
    }

    const validarPregunta = async () => {
        console.log(usuario.email, pregunta, respuesta)
        const response = await fetch('https://localhost:4000/verificacion-pregunta', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                email: usuario.email,
                pregunta_seguridad: pregunta,
                respuesta_seguridad: respuesta
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                if (data.message === "Pregunta de seguridad incorrecta") {
                    Swal.fire({
                        icon: 'error',
                        text: "La respuesta a la pregunta de seguridad es incorrecta"
                    });
                    return;
                }
                Swal.fire({
                    title: 'Confirmación',
                    icon: "success",
                    text: "Pregunta de seguridad correcta"
                });
                // Me devuelve el json
                console.log(data)
                closeModalPregunta();
                setCodigo("");
                setPregunta("");
                setRespuesta("");
                setUsuario({
                    email: "",
                    contrasena: "",
                })
                sessionStorage.setItem('token', data.token)
                window.location.href = 'https://localhost:5173/';
                closeModalPregunta();
            })
            .catch(error => {
                console.error('Error:', error);
            })
    }

    const validarCodigo = async () => {
        const respuesta = await fetch('https://localhost:4000/verificacion-codigo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                codigo: codigo
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                if (data.message === "Codigo verificado") {
                    Swal.fire({
                        icon: "success",
                        text: "Codigo verificado",
                        timer: 3000
                    });
                    openModalPregunta();
                    closeModalCodigo();
                    openModalPregunta();
                }
                if (data.message === "Codigo no encontrado") {
                    Swal.fire({
                        icon: "warning",
                        text: "Codigo no encontrado",
                        timer: 3000
                    });
                    return;
                }
            })
            .catch(error => {
                console.error('Error:', error);
            })
    }

    const enviarCorreo = async () => {
        const respuesta = await fetch('https://localhost:4000/verificacion-correo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                email: usuario.email
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                if (data.message === "Correo enviado") {
                    Swal.fire({
                        icon: "info",
                        title: 'Enviado!',
                        text: "Revisa tu correo electrónico para obtener el código de verificación."
                    });
                    openModalCodigo();
                }
            })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const forbiddenCharsRegex = /[<>`';"]/;
        if (forbiddenCharsRegex.test(usuario.nombre) || forbiddenCharsRegex.test(usuario.apellido) || forbiddenCharsRegex.test(usuario.email) || forbiddenCharsRegex.test(usuario.contrasena)) {
            Swal.fire({
                icon: "warning",
                text: "Los campos no pueden contener caracteres especiales como <>`;',\""
            });
            return;
        }
        if (usuario.email.trim() === "" || usuario.contrasena.trim() === "") {
            Swal.fire({
                icon: "warning",
                text: "Por favor, complete todos los campos"
            });
            return;
        }
        if (usuario.contrasena.length < 8) {
            Swal.fire({
                icon: 'warning',
                text: 'La contraseña debe tener al menos 8 caracteres'
            });
            return;
        }        
        if (!usuario.email.includes('@')) {
            Swal.fire({
                icon: "warning",
                text: "El correo electrónico debe contener el símbolo '@'"
            });
            return;
        }
        console.log(usuario)
        const respuesta = await fetch('https://localhost:4000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                email: usuario.email,
                contrasena: usuario.contrasena,
            }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.message === "Usuario no encontrado") {
                    Swal.fire({
                        icon: "error",
                        text: "Usuario no encontrado"
                    });
                    return;
                }
                if (data.message === "Contraseña incorrecta") {
                    Swal.fire({
                        icon: "error",
                        text: "Contraseña incorrecta"
                    });
                    return;
                }
                console.log(data)
                sessionStorage.setItem('usuario', JSON.stringify({
                    id: data.id,
                    nombre: data.nombre,
                    apellido: data.apellido,
                    email: data.email,
                    contrasena: data.contrasena,
                    pregunta_seguridad: data.pregunta_seguridad,
                    respuesta_seguridad: data.respuesta_seguridad,
                    rol_id: data.rol_id,
                    equipo: data.equipo_id
                }));
                setPregunta(data.pregunta_seguridad)
                enviarCorreo();
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    return (
        <div className='bg-slate-200 flex items-center justify-center h-screen w-full'>
            <div className="bg-white h-11/12 w-[90%] sm:w-1/3 rounded-xl grid place-content-center shadow-xl">
                <div className="flex justify-center w-full flex-col mx-auto align-middle">
                    <img src={Logo} alt="" className="w-20 mx-auto mt-5" />
                    <p className="text-[#00568D] text-xl mx-auto font-extrabold italic">ProManSys</p>
                </div>
                <div className="text-center my-5">
                    <p className="text-[#4D4D4D] text-lg font-semibold">Bienvenido a</p>
                    <p className="font-bold text-xl">Sistema De Gestión De Proyectos Empresariales</p>
                    <p className="text-[#4D4D4D] font-semibold text-lg">Por favor de Iniciar Sesion</p>
                </div>
                <div className="grid place-content-center w-full">
                    <form className='flex justify-center items-center flex-col w-full h-full mx-auto'>
                        <label className="text-xl font-semibold italic ">Correo electronico</label>
                        <input
                            required
                            type="email"
                            value={usuario.email}
                            onChange={(e) => setUsuario({ ...usuario, email: e.target.value })}
                            placeholder="Ingresa tu correo electronico"
                            className="bg-slate-100 w-11/12 h-10 mx-auto rounded-lg pl-4 outline-none"
                        />
                        <label className="text-xl font-semibold italic mt-5">Contraseña</label>
                        <input
                            required
                            type="password"
                            value={usuario.contrasena}
                            onChange={(e) => setUsuario({ ...usuario, contrasena: e.target.value })}
                            placeholder="Ingresa tu contraseña"
                            className="bg-slate-100 w-11/12 h-10 mx-auto rounded-lg pl-4 outline-none"
                        />
                    </form>
                    <div className='flex flex-col justify-center align-middle'>
                        <button className="bg-gradient-to-r from-blue-900 to-blue-500 text-white w-40 h-10 rounded-xl mx-auto my-5" onClick={handleSubmit}>Iniciar Sesion</button>
                        <p className="text-center mt-3 text-xl font-semibold italic">Nuevo Miembro?
                            <Link to='/Register'>
                                <span className="text-blue-400 ml-2">Registrate ahora</span>
                            </Link>
                        </p>
                        <p className='text-center mt-3 text-xl font-semibold italic mb-3'>Al iniciar sesión aceptas nuestras condiciones de uso y
                        <Link to={"/Politicas"} className='text-blue-400'> politica de privacidad.</Link>
                    </p>
                    </div>
                </div>
            </div>
            <Modal
                isOpen={modalCodigoIsOpen}
                onRequestClose={closeModalCodigo}
                contentLabel="Example Modal"
                className="bg-white rounded-lg shadow-lg p-6 w-1/2 m-auto my-52 flex flex-col justify-center align-middle outline-none"
            >
                <h2 className="text-xl font-bold mb-4">Codigo de Verificacion</h2>
                <p className="text-gray-700 mb-4">Por favor ingrese el codigo de verificacion enviado a su correo electronico.</p>
                <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    value={codigo}
                    onChange={(e) => setCodigo(e.target.value)}
                />
                <button className="bg-gradient-to-r from-blue-900 to-blue-500 text-white w-80 h-10 rounded-xl mx-auto my-3" onClick={validarCodigo}>Enviar</button>
            </Modal>
            <Modal
                isOpen={modalPreguntaIsOpen}
                onRequestClose={closeModalPregunta}
                contentLabel="Example Modal"
                className="bg-white rounded-lg shadow-lg p-6 w-1/2 m-auto my-52 flex flex-col justify-center align-middle outline-none"
            >
                <h1 className="text-2xl font-bold mb-6">Pregunta de Seguridad</h1>
                <p className="text-gray-700 mb-4">La pregunta de seguridad es: {pregunta}</p>
                <p className="text-gray-700 mb-4">Por favor ingrese la respuesta a la pregunta de seguridad.</p>
                <input
                    type="text"
                    value={respuesta}
                    onChange={(e) => setRespuesta(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    placeholder="Respuesta"
                />
                <button
                    className="bg-gradient-to-r from-blue-900 to-blue-500 text-white w-80 h-10 rounded-xl mx-auto my-5"
                    onClick={validarPregunta}
                >
                    Enviar
                </button>
            </Modal>
        </div>
    )
}
export default Login