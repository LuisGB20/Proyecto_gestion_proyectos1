import SidebarAdmin from '../../components/SidebarAdmin'
import Header from '../../components/header'
import Whatsapp from '../../Img/whatsapp.png'
import Telegram from '../../Img/telegram.png'
import Netflix from '../../Img/netflix.png'

function Profile() {
  return (
    <div className='bg-slate-50'>
      <Header />
      <div className='flex'>
        <SidebarAdmin/>
        <div className='w-full h-full'>
          <div className='w-full h-full '>
            <div className='bg-white my-3 w-full h-20 flex justify-between shadow'>
              <h1 className='text-2xl font-semibold  p-5'>MI PERFIL</h1>
            </div>
            <div className='flex mt-6'>
              <div className="w-full max-w-xs mr-10 ml-6  ">
                <form className="bg-white shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] rounded px-10 pt-8 pb-12 mb-8 ">
                  <div className="mb-4">
                    <label className="block text-gray-500 text-sm font-bold mb-2" htmlFor="username">
                      Nombre
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Luis" />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-500 text-sm font-bold mb-2" htmlFor="email">
                      Correo
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Gomez@gmail.com" />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-500 text-sm font-bold mb-2" htmlFor="team">
                      Equipo
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="team" type="text" placeholder="Spotify" />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-500 text-sm font-bold mb-2" htmlFor="team2">
                      Otro Equipo
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="team2" type="text" placeholder="Netflix" />
                  </div>

                </form>
                <p className="text-center text-gray-500 text-xs">
                  Información de Perfil
                </p>
              </div>


              <div className="w-full mr-6">
                <form className="bg-white shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] rounded px-10 pt-8 pb-12 mb-4 ">
                  <div className="mb-8">
                    <label className="block text-gray-500 text-sm font-bold mb-2" htmlFor="username">
                      Proyectos Completados
                    </label>
                    {/* <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Luis"/> */}
                  </div>
                  <div className="flex mb-8 p-4 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
                    <img src={Whatsapp} alt="Whatsapp" />
                    <div className='flex items-center ml-8 '>Image 03.Png</div>
                    <div className='flex'>
                      <div className='ml-80'>Completed
                        <div
                          className="bg-blue-600 h-2.5 rounded-full dark:bg-blue-500"
                          style={{ width: '100%' }}
                        ></div>
                      </div>
                      {/* <div className='ml-4' ></div> */}
                    </div>

                  </div>
                  {/* Telegram */}
                  <div className="flex mb-8 p-4 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
                    <img src={Telegram} alt="Telegram" />
                    <div className='flex items-center ml-8'>Image 03.Png</div>
                    <div className='flex'>
                      <div className='ml-80 '>Completed
                        <div
                          className="bg-blue-600 h-2.5 rounded-full dark:bg-blue-500"
                          style={{ width: '100%' }}
                        ></div>
                      </div>
                    </div>

                  </div>
                  <div className=" flex mb-14 p-4 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
                    <img src={Netflix} alt="Netflix" />
                    <div className='flex items-center ml-8'>Image 03.Png</div>
                    <div className='flex'>
                      <div className='ml-80'>Completed
                        <div
                          className="bg-blue-600 h-2.5 rounded-full dark:bg-blue-500"
                          style={{ width: '100%' }}
                        ></div>
                      </div>
                    </div>

                  </div>

                </form>
                {/* <p className="text-center text-gray-500 text-xs">
                  All your information
                </p> */}
              </div>
            </div>

          </div>

        </div>
      </div>

    </div>
  )
}

export default Profile;
