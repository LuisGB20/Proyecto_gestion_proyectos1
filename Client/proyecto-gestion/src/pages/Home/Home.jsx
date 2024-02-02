
import { Link } from 'react-router-dom'
import Logo from '../../IMG/logo.png'
import Sesion from '../../IMG/sesion.png'
import Miembro from '../../IMG/miembro.png'
import Diseño from '../../IMG/diseño.png'
import Header from './components/Header'

function Home() {
  return (
    <div className='flex flex-col'>
      <Header/>
          <div className='flex justify-center items-center bg-gradient-to-bl from-indigo-300 to-cyan-100 h-screen'>
      <div className='absolute sm:left-32'>
        <div className='flex mb-10 items-center'>
          <img src={Logo} alt='' className='w-12'/>
          <p className='text-[#00568D] text-xl'>ProManSys</p>
        </div>
        <div className='mb-10'>
          <h1>
            <span className='text-[#00568D] font-bold text-6xl'>Manejo de</span> <br/>
            <span className='font-bold text-6xl'>Proyectos</span>
          </h1>
        </div>
        <div className='mb-10'>
          <p>Bienvenido a tu sitio web donde podrás de manera<br/>sencilla desarrollar la dirección de tus diferentes<br/>proyectos con tus correspondientes equipos de<br/>trabajo.</p>
        </div>
        <div className=''>
          <Link to="/Login">
            <button className="bg-gradient-to-r from-blue-900 to-blue-500 text-white w-40 h-10 rounded-xl">Iniciar Sesion</button>
          </Link>
          <Link to="/Register">
            <button className="bg-gradient-to-r from-blue-900 to-blue-500 text-white w-40 h-10 rounded-xl ml-10">Registro</button>
          </Link>
        </div>
      </div>
      <div className='hidden sm:block'>
        <div className='flex absolute right-0 bottom-0'>
          <div className='flex justify-end items-end'>
            <img src={Diseño} alt='' className='h-[80%] rounded-tl-3xl shadow-strong'/>
          </div>
          <div className='w-96'>
            <img src={Sesion} className=' rounded-tl-3xl shadow-strong'/>
            <img src={Miembro} className='shadow-strong'/>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Home