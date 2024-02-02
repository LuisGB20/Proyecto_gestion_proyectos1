import React from 'react';

const Nopermitido = () => {

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <h1 className="text-4xl font-bold mb-6 text-red-600">Acceso Restringido</h1>
                <p className="text-lg mb-4 text-gray-700">
                    Lo sentimos, tu rol no tiene acceso a esta pantalla.
                </p>
                <p className="text-lg mb-6 text-gray-700">
                    Por favor, contacta al administrador para obtener más información.
                </p>
                <a href="/" className="text-blue-600 hover:underline">Volver a la pantalla principal</a>
            </div>
        </div>
    );
}

export default Nopermitido;
