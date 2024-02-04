import React from 'react';

const EstadisticasWidget = ({ totalClientes, ingresosMensuales, productosVendidos, datosGrafico }) => {
  // Datos de ejemplo para el gráfico de barras
  const datosDeEjemplo = [25, 40, 60, 35, 20, 45, 30];

  return (
    <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-8 rounded-lg shadow-md text-white h-96 w-11/12 m-auto">
      <h3 className="text-2xl font-semibold mb-4 font-sans">Resumen de Estadísticas</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-blue-600 rounded-md">
          <p className="text-sm">Clientes Totales</p>
          <p className="text-2xl font-bold">{totalClientes}</p>
        </div>

        <div className="p-4 bg-purple-600 rounded-md">
          <p className="text-sm">Ingresos Mensuales</p>
          <p className="text-2xl font-bold">${ingresosMensuales}</p>
        </div>

        <div className="p-4 bg-indigo-600 rounded-md">
          <p className="text-sm">Productos Vendidos</p>
          <p className="text-2xl font-bold">{productosVendidos}</p>
        </div>
      </div>

      <div className="mt-8">
        <h4 className="text-lg font-semibold mb-4">Gráfico de Datos</h4>
        <div className="bg-white p-4 rounded-md shadow-md">
          <div className="grid grid-cols-7 gap-4">
            {datosDeEjemplo.map((dato, index) => (
              <div
                key={index}
                className="h-full bg-blue-500"
                style={{ height: `${dato}px` }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EstadisticasWidget;
