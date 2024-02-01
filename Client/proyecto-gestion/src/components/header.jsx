import { Link } from 'react-router-dom';
import Logo from '../IMG/logo.png';
import imagenPerfil from '../IMG/imagenPerfil.png';

function Header(props) {
  const { area } = props
  const usuario = JSON.parse(sessionStorage.getItem('usuario'))

  return (
    <div className="bg-white w-full h-25 flex flex-row justify-between border-2">
      <div className=" my-3 flex mx-10">
        <img src={Logo} className="w-16 h-16 mx-3" />
        <h1 className=" font-semibold italic text-center m-auto text-xl text-[#00568D]">PMS</h1>
      </div>
      <h1 className="text-lg font-semibold italic my-auto">{area}</h1>
      <Link className='flex flex-row my-auto' to='/Profile'>
        <div className="flex flex-row my-auto">
          <img src={imagenPerfil} className="mr-5 my-2" />
          <div className="my-auto mr-10">
            <h1 className=" text-lg font-semibold italic">{usuario.nombre + " " + usuario.apellido}</h1>
            <h1 className="text-lg font-semibold italic text-[#999999]">ID: {usuario.id}</h1>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default Header