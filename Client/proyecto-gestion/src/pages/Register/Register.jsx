import { useState } from 'react';
import Logo from '../../IMG/logo.png'
import { Link } from "react-router-dom";
import Modal from 'react-modal';
import preguntas_seguridad from '../../data/preguntas';
import Swal from 'sweetalert2';

function Register() {
    const numeroAleatorio = Math.floor(Math.random() * 100);
    const [usuario, setUsuario] = useState({
        email: "",
        contrasena: "",
        nombre: "",
        apellido: "",
        rol_id: 3,
    })
    const [confirmarContra, setConfirmaContra] = useState("")
    const [codigoVerificacion, setCodigoVerificacion] = useState("")
    const [pregunta, setPregunta] = useState("");
    const [respuesta, setRespuesta] = useState("");

    // Modales
    // Modal de codigo
    const [modalCorreoIsOpen, setCorreoModalIsOpen] = useState(false);
    const openModalCorreo = () => {
        setCorreoModalIsOpen(true);
    };
    const closeModalCorreo = () => {
        setCorreoModalIsOpen(false);
    };

    // Modal de pregunta
    const [modalPreguntaIsOpen, setModalPreguntaIsOpen] = useState(false);
    const openModalPregunta = () => {
        setModalPreguntaIsOpen(true);
    };
    const closeModalPregunta = () => {
        setModalPreguntaIsOpen(false);
    };

    const registrarRespuesta = async () => {
        if (pregunta.trim() === "" || respuesta.trim() === "") {
            Swal.fire({
                icon: "warning",
                text: "Por favor, completa todos los campos"
            });
            return;
        }
        console.log(pregunta)
        const response = await fetch('https://localhost:4000/crearRespuestaPregunta', {
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
                if (data.message === "Pregunta y respuesta agregadas") {
                    alert("Pregunta y respuesta agregadas")
                    setUsuario({
                        nombre: "",
                        apellido: "",
                        email: "",
                        contrasena: "",
                        rol_id: 3,
                    })
                    closeModalPregunta()
                    setRespuesta("")
                    setPregunta("")
                    setUsuario({
                        nombre: "",
                        apellido: "",
                        email: "",
                        contrasena: "",
                        rol_id: 3,
                    })
                    window.location.href = 'https://localhost:5173/Login';
                } else {
                    Swal.fire({
                        icon: "error",
                        text: "Error al crear la respuesta"
                    });
                    return;
                }
            })
            .catch(error => {
                console.log(error)
            })
        }

    const Validarcodigo = async () => {
        if (codigoVerificacion.trim() === "") {
            Swal.fire({
                icon: "warning",
                text: "Por favor, ingresa el código de verificación"
            });
            return;
        }
        const respuesta = await fetch('https://localhost:4000/verificacion-codigo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(
                {
                    codigo: codigoVerificacion
                }
            )
        })
            .then(response => response.json())
            .then(data => {
                if (data.message === "Codigo verificado") {
                    Swal.fire({
                        icon: "success",
                        text: "Código verificado",
                        timer: 3000
                    });
                    handleQuestion();
                    setCodigoVerificacion("")
                    closeModalCorreo()
                    openModalPregunta();
                } else {
                    Swal.fire({
                        icon: "error",
                        text: "Código incorrecto"
                    });
                    return;
                }
            })
            .catch(error => {
                console.log(error)
            })
    }

    const handleEnviarCorreo = async () => {
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
            })
            .catch(error => {
                console.log(error)
            })
    }

    const validar = () => {
        if (usuario.nombre.trim() === "" || usuario.apellido.trim() === "" || usuario.email.trim() === "" || confirmarContra.trim() === "" || usuario.contrasena.trim() === "") {
            Swal.fire({
                icon: "warning",
                text: "Por favor, complete todos los campos"
            });
            return;
        }
        if (usuario.contrasena !== confirmarContra) {
            Swal.fire({
                icon: "warning",
                text: "Las contraseñas no coinciden"
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
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!validar()) {
            return;
        }
        console.log(usuario)
        const respuesta = await fetch('https://localhost:4000/registro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(usuario)
        })
            .then(response => response.json())
            .then(data => {
                if (data.message === "El correo ya está en uso") {
                    Swal.fire({
                        icon: 'warning',
                        text: "El correo ya está en uso"
                    });
                    return;
                } else if (data.status === 500) {
                    Swal.fire({
                        icon: 'error',
                        text: "Error al registrar"
                    });
                    return;
                }
                console.log(data)
                Swal.fire({
                    icon: "success",
                    text: "Registro exitoso",
                    timer: 3000
                })
                openModalCorreo();
                handleEnviarCorreo();
            })
            .catch(error => {
                console.error(error)
            })
        setConfirmaContra("")
    }

    return (
        <div className='bg-slate-200 flex items-center justify-center h-screen'>
            <div className="bg-white h-11/12 w-[90%] sm:w-1/3 rounded-xl grid place-content-center shadow-xl">
                <div className="flex flex-col justify-center align-middle w-full h-full">
                    <img src={Logo} alt="" className="w-16 mx-auto mt-5" />
                    <p className="text-[#00568D] text-xl mx-auto font-extrabold italic">ProManSys</p>
                </div>
                <div className="text-center mt-5 mb-5">
                    <p className="text-[#4D4D4D] text-lg font-semibold">Bienvenido a</p>
                    <p className="font-bold text-xl">Sistema De Gestión De Proyectos Empresariales</p>
                    <p className="text-[#4D4D4D] font-semibold text-lg">Por favor Registrate</p>
                </div>
                <form className='flex justify-center items-center flex-col w-full h-full mx-auto'>
                    <div className='flex flex-col w-full'>
                        <label className="text-xl font-semibold italic ml-8">Correo electronico</label>
                        <input
                            required
                            type="email"
                            placeholder="Ingresa tu correo electronico"
                            value={usuario.email}
                            onChange={(e) => setUsuario({ ...usuario, email: e.target.value })}
                            className="bg-slate-100 w-11/12 h-10 mx-auto rounded-lg mb-4 pl-4 outline-none"
                        />
                    </div>
                    <div className="grid sm:grid-cols-2 w-full ml-10">
                        <div className='w-full m-auto'>
                            <label className='text-xl font-semibold italic ml-5 sm:ml-0'>Nombre</label>
                            <input
                                required
                                placeholder="Ingresa tu primer nombre"
                                type="text"
                                value={usuario.nombre}
                                onChange={(e) => setUsuario({ ...usuario, nombre: e.target.value })}
                                className="bg-slate-100 w-10/12 h-10 rounded-xl pl-5 mb-4 mx-auto outline-none"
                            />
                        </div>
                        <div className='w-full m-auto'>
                            <label className='text-xl font-semibold italic ml-5 sm:ml-0'>Apellido</label>
                            <input
                                required
                                placeholder="Ingresa tu segundo nombre"
                                type="text"
                                value={usuario.apellido}
                                onChange={(e) => setUsuario({ ...usuario, apellido: e.target.value })}
                                className="bg-slate-100 w-10/12 h-10 rounded-xl pl-5 mb-4 mx-auto outline-none"
                            />
                        </div>
                        <div>
                            <label className='text-xl font-semibold italic ml-5 sm:ml-0'>Crear Contraseña</label>
                            <input
                                required
                                placeholder="Escribe tu contraseña"
                                type="password"
                                value={usuario.contrasena}
                                onChange={(e) => setUsuario({ ...usuario, contrasena: e.target.value })}
                                className="bg-slate-100 w-10/12 h-10 rounded-xl pl-5 mb-4 mx-auto outline-none"
                            />
                        </div>
                        <div>
                            <label className='text-xl font-semibold italic ml-5 sm:ml-0'>Confirmar Contraseña</label>
                            <input
                                required
                                placeholder="Confirma tu contraseña"
                                type="password"
                                value={confirmarContra}
                                onChange={(e) => setConfirmaContra(e.target.value)}
                                className="bg-slate-100 w-10/12 h-10 rounded-xl pl-5 mb-4 mx-auto outline-none"
                            />
                        </div>
                    </div>
                    <div className='flex flex-col w-full'>
                        <label className='text-xl font-semibold italic ml-8'>Rol</label>
                        <select className='bg-slate-100 w-11/12 h-10 mx-auto rounded-lg mb-4 pl-4 outline-none' value={usuario.rol_id} onChange={(e) => setUsuario({ ...usuario, rol_id: e.target.value })}>
                            <option value="1" className='text-black'>Jefe</option>
                            <option value="2">Diseñador</option>
                            <option value="3">Programador</option>
                            <option value="4">Analista</option>
                        </select>
                    </div>
                </form>
                <div className='w-full flex flex-col justify-center align-middle'>
                    <button className="bg-gradient-to-r from-blue-900 to-blue-500 text-white w-80 h-10 rounded-xl mx-auto my-3" onClick={handleSubmit}>Crear Cuenta</button>
                    <p className="text-center mt-3 text-xl font-semibold italic">¿Ya tienes cuenta?
                        <Link to='/Login'>
                            <span className="text-blue-400 ml-2">Iniciar Sesion</span>
                        </Link>
                    </p>
                    <p className='text-center mt-3 text-xl font-semibold italic mb-3'>Al registrarse aceptas nuestras condiciones de uso y
                        <Link to={"/Politicas"} className='text-blue-400'> politica de privacidad.</Link>
                    </p>
                </div>
            </div>
            <Modal
                isOpen={modalCorreoIsOpen}
                onRequestClose={closeModalCorreo}
                contentLabel="Example Modal"
                className="bg-white rounded-lg shadow-lg p-6 w-96 sm:w-1/2 m-auto my-52 flex flex-col justify-center align-middle"
            >
                <h2 className="text-2xl font-bold mb-4">Te enviamos un código a tu correo, revisa tu bandeja de entrada</h2>
                <p className="text-lg mb-4">Ingresa tu código de verificación</p>
                <input
                    type="text"
                    placeholder="Código de verificación"
                    value={codigoVerificacion}
                    onChange={(e) => setCodigoVerificacion(e.target.value)}
                    className="w-full h-10 px-4 mb-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                />
                <button
                    onClick={Validarcodigo}
                    className="bg-gradient-to-r from-blue-900 to-blue-500 text-white w-80 h-10 rounded-xl mx-auto my-3"
                >
                    Validar código
                </button>
            </Modal>
            <Modal
                isOpen={modalPreguntaIsOpen}
                onRequestClose={closeModalPregunta}
                contentLabel="Example Modal"
                className="bg-white rounded-lg shadow-lg p-6 w-96 sm:w-1/2 m-auto my-52 flex flex-col justify-center align-middle"
            >
                <h2 className="text-2xl font-bold mb-4">Selecciona una pregunta de seguridad</h2>
                <select
                    value={pregunta}
                    onChange={(e) => setPregunta(e.target.value)}
                    className="w-full h-10 px-4 mb-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-xl font-semibold italic"
                >
                    {preguntas_seguridad.map((pregunta, index) => (
                        <option key={index} value={pregunta} className='text-xl font-semibold italic'>
                            {pregunta}
                        </option>
                    ))}
                </select>
                <label className="text-lg mb-4">Ingresa tu respuesta</label>
                <input
                    type="text"
                    placeholder="Respuesta"
                    value={respuesta}
                    onChange={(e) => setRespuesta(e.target.value)}
                    className="w-full h-10 px-4 mb-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                />
                <button
                    onClick={registrarRespuesta}
                    className="bg-gradient-to-r from-blue-900 to-blue-500 text-white w-80 h-10 rounded-xl mx-auto my-3"
                >
                    Confirmar
                </button>
            </Modal>
        </div>
    )
}
export default Register