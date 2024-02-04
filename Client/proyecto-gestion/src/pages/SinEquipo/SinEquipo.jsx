import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Home/components/Header';

const SinEquipo = () => {
  return (
    <div className="flex flex-col items-center h-screen w-full">
      <Header />
      <div className="p-8 rounded-lg shadow-md text-center m-auto bg-white">
        <img
          src="https://media.tenor.com/0xfAbrRRBjUAAAAi/cat-up.gif"
          alt="gatito"
          className="w-60 mx-auto my-5"
        />
        <h1 className="text-4xl font-bold mb-6 text-red-600">Acceso Restringido</h1>
        <p className="text-lg mb-4 text-gray-700">
          Lo sentimos, no tienes un equipo asignado.
        </p>
        <p className="text-lg mb-6 text-gray-700">
          Por favor, contacta al administrador para obtener más información.
        </p>
        <Link to="/" className="text-blue-600 hover:underline">
          <button className="bg-gradient-to-r from-[#1E4C6A] to-[#1B7FC5] text-white font-bold py-2 px-4 rounded">
            Volver a la pantalla principal
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SinEquipo;
