
import Logo from '../../IMG/logo.png'

function RecuperarContraseña() {
    const [ showModal, setShowModal ] = useState(false)
    const [ showModalQuestion, setShowModalQuestion ] = useState(false)
    const [ showModalPassword, setShowModalPassword ] = useState(false)

    const handleEnviarCorreo = () => {
        setShowModal(true);
    }
    const handleQuestion = () => {
        setShowModalQuestion(true);
    }
    const handleConfirmPassword = () => {
        setShowModalPassword(true);
    }
    return(
        <div>
            <div className="bg-slate-200 flex items-center justify-center h-screen">
                <div className="bg-white h-[75%] w-[90%] sm:w-[35%] rounded-xl grid place-content-center shadow-xl">
                    <div className="flex justify-center">
                        <img src={Logo} alt="" className="w-10"/>
                        <p className="text-[#00568D] text-xl">ProManSys</p>
                    </div>
                    <div className="mt-5 mb-5 text-center">
                        <p className="font-bold text-xl mb-5">Recuperar Contraseña</p>
                        <p className="text-[#4D4D4D] text-sm">Ingresa tu Correo Electronico</p>
                        <p className="text-[#4D4D4D] text-sm mt-1">Te enviaremos un Código de Confirmación</p>
                    </div>
                    <div className="grid place-content-center">
                        <form>
                            <h3 className="mb-1">Correo electronido</h3>
                            <input
                                required
                                type="text"
                                placeholder="gomez@gmail.com"
                                className="bg-slate-100 w-80 h-10 rounded-xl pl-5 mb-4"
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
                                    <input placeholder='Mi Primera Chamba' className="bg-slate-300 placeholder:text-black w-80 h-10 rounded-xl pl-5 mb-4"/>
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
                                    <input placeholder='Escribe tu respuesta' className="bg-slate-300 placeholder:text-black w-80 h-10 rounded-xl pl-5 mb-4"/>
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
                                    <input placeholder='Tu Nueva Contraseña' className="bg-slate-300 placeholder:text-black w-80 h-10 rounded-xl pl-5 mb-4"/>
                                    <p className="font-bold text-xl mb-5 text-center">Confirma tu Nueva Contraseña</p>
                                    <input placeholder='Confirma tu Nueva Contraseña' className="bg-slate-300 placeholder:text-black w-80 h-10 rounded-xl pl-5 mb-4"/>
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
    )
}
export default RecuperarContraseña