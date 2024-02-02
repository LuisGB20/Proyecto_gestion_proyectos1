import { useState } from 'react';
import Logo from '../../IMG/logo.png';
import Swal from 'sweetalert2'
function RecuperarContraseña() {
    const [showModal, setShowModal] = useState(false);
    const [showModalQuestion, setShowModalQuestion] = useState(false);
    const [showModalPassword, setShowModalPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [confirmationCode, setConfirmationCode] = useState('');
    const [securityAnswer, setSecurityAnswer] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    const validarEmail = () => {
        return /\S+@\S+\.\S+/.test(email);
    };

    const validarCodigo = () => {
        return confirmationCode.trim() !== '';
    };

    const validarRespuestaSeguridad = () => {
        return securityAnswer.trim() !== '';
    };

    const validarNuevaContraseña = () => {
        return newPassword.trim() !== '' && newPassword === confirmNewPassword;
    };

    const handleEnviarCorreo = () => {
        if (validarEmail()) {
            setShowModal(true);
        } else {
            Swal.fire({
                icon: "warning",
                text: "Por favor, Ingrese un corrreo electronico valido"
            })
        }
    };

    const handleQuestion = () => {
        if (validarCodigo()) {
            setShowModalQuestion(true);
        } else {
                        Swal.fire({
                icon: "warning",
                text: "Por favor, Ingrese un codigo de confirmacion valido"
            })
        }
    };

    const handleConfirmPassword = () => {
        if (validarRespuestaSeguridad() && validarNuevaContraseña()) {
            setShowModalPassword(true);
        } else {
            Swal.fire({
                icon: "warning",
                text: "Por favor, complete todos los campos y asegúrese de que las contraseñas coincidan."
            })
            
        }
    };

    return (
        <div>
            <div className="bg-slate-200 flex items-center justify-center h-screen">
                <div className="bg-white h-[75%] w-[90%] sm:w-[35%] rounded-xl grid place-content-center shadow-xl">
                    <div className="flex justify-center">
                        <img src={Logo} alt="" className="w-10"/>
                        <p className="text-[#00568D] text-xl">ProManSys</p>
                    </div>
                    <div className="mt-5 mb-5 text-center">
                        <p className="font-bold text-xl mb-5">Recuperar Contraseña</p>
                        <p className="text-[#4D4D4D] text-sm">Ingresa tu Correo Electrónico</p>
                        <p className="text-[#4D4D4D] text-sm mt-1">Te enviaremos un Código de Confirmación</p>
                    </div>
                    <div className="grid place-content-center">
                        <form>
                            <h3 className="mb-1">Correo electrónico</h3>
                            <input
                                required
                                type="text"
                                placeholder="gomez@gmail.com"
                                className={`bg-slate-100 w-80 h-10 rounded-xl pl-5 mb-4 ${validarEmail() ? '' : 'border-red-500'}`}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </form>
                        <div>
                            <button className="bg-gradient-to-r from-blue-900 to-blue-500 text-white w-80 h-10 rounded-xl my-2" onClick={handleEnviarCorreo}>
                                Enviar
                            </button>
                        </div>
                    </div>
                    {showModal && (
                        <div className="fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 flex items-center justify-center">
                            <div className="bg-white p-8 rounded-xl flex flex-col">
                                <p className="font-bold text-xl mb-5">Ingresa tu Código de Confirmación</p>
                                <form>
                                    <input
                                        placeholder='Mi Primera Chamba'
                                        className={`bg-slate-300 placeholder:text-black w-80 h-10 rounded-xl pl-5 mb-4 ${validarCodigo() ? '' : 'border-red-500'}`}
                                        value={confirmationCode}
                                        onChange={(e) => setConfirmationCode(e.target.value)}
                                    />
                                </form>
                                <div className="grid place-content-center">
                                    <button className="bg-gradient-to-r from-blue-900 to-blue-500 h-10 w-40 text-white rounded-xl" onClick={handleQuestion}>
                                        Verificar
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                    {showModalQuestion && (
                        <div className="fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 flex items-center justify-center">
                            <div className="bg-white p-8 rounded-xl flex flex-col">
                                <p className="font-bold text-xl mb-5 text-center">Q dia es Hoy?</p>
                                <form>
                                    <input
                                        placeholder='Escribe tu respuesta'
                                        className={`bg-slate-300 placeholder:text-black w-80 h-10 rounded-xl pl-5 mb-4 ${validarRespuestaSeguridad() ? '' : 'border-red-500'}`}
                                        value={securityAnswer}
                                        onChange={(e) => setSecurityAnswer(e.target.value)}
                                    />
                                </form>
                                <div className="grid place-content-center">
                                    <button className="bg-gradient-to-r from-blue-900 to-blue-500 h-10 w-40 text-white rounded-xl" onClick={handleConfirmPassword}>
                                        Verificar
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                    {showModalPassword && (
                        <div className="fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 flex items-center justify-center">
                            <div className="bg-white p-8 rounded-xl flex flex-col">
                                <form>
                                    <p className="font-bold text-xl mb-5 text-center">Escribe tu Nueva Contraseña</p>
                                    <input
                                        placeholder='Tu Nueva Contraseña'
                                        className={`bg-slate-300 placeholder:text-black w-80 h-10 rounded-xl pl-5 mb-4 ${validarNuevaContraseña() ? '' : 'border-red-500'}`}
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                    <p className="font-bold text-xl mb-5 text-center">Confirma tu Nueva Contraseña</p>
                                    <input
                                        placeholder='Confirma tu Nueva Contraseña'
                                        className={`bg-slate-300 placeholder:text-black w-80 h-10 rounded-xl pl-5 mb-4 ${validarNuevaContraseña() ? '' : 'border-red-500'}`}
                                        value={confirmNewPassword}
                                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                                    />
                                </form>
                                <div className="grid place-content-center">
                                    <button className="bg-gradient-to-r from-blue-900 to-blue-500 h-10 w-40 text-white rounded-xl" onClick={handleConfirmPassword}>
                                        Confirmar
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default RecuperarContraseña;