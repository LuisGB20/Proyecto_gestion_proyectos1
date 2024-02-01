import { Link } from 'react-router-dom'
import Objeto from '../../IMG/OBJECTS.png'
import Assets from '../../IMG/activo.png'
import Resources from '../../IMG/recurso.png'

function ResourcesAndAssets(){
    return(
        <div>
            <div className="bg-slate-200 flex items-center justify-center h-screen">
                <div className="bg-white h-[60%] w-[55%] rounded-xl grid place-content-center shadow-xl">
                    <button className="bg-gradient-to-r from-blue-900 to-blue-500 text-white h-10 w-28 rounded-lg absolute ml-5 mt-5">Atras</button>
                    <div className="flex justify-center items-center flex-col">
                        <img src={Objeto} alt="" className="h-32 mb-5"/>
                        <h1 className="font-bold text-xl mb-5">Solicitud De Recursos Y/O Activos</h1>
                    </div>
                    <div className="flex">
                        <Link to="/SolicitudActivos">
                            <button className="flex justify-center items-center flex-col border-2 h-32 w-72 rounded-2xl hover:border-blue-400">  
                                <div className="flex">
                                    <img src={Assets} alt="" className="h-6"/>
                                    <h3 className="ml-2 text-xl">Activos</h3>
                                </div>
                                <p>Solicita activos y evalualos</p>
                            </button>
                        </Link>
                        <Link to="/SolicitudRecursos">
                            <button className="flex justify-center items-center flex-col border-2 h-32 w-72 ml-10 rounded-2xl hover:border-blue-400">
                                <div className="flex">
                                    <img src={Resources} alt="" className="h-6"/>
                                    <h3 className="ml-3 text-xl">Recursos</h3>
                                </div>
                                <p>Solicita recursos y evalualos</p>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ResourcesAndAssets