'use client'
import React, { useState, useEffect } from 'react';
import { actualizarVuelo } from '@/utils/xmlrpcClient';

interface Vuelo {
  numero_vuelo: string;
  destino: string;
  hora_salida: string;
  estado: string;
}

function VuelosEdit({ params }: { params: { numeroVuelo: string } }) {
  const [vuelo, setVuelo] = useState<Vuelo | null>(null);
  const [destino, setDestino] = useState('');
  const [horaSalida, setHoraSalida] = useState('');
  const [estado, setEstado] = useState('');

  useEffect(() => {
    const numeroVuelo = params.numeroVuelo;
    setVuelo({
      numero_vuelo: numeroVuelo,
      destino: 'Destino actual',
      hora_salida: '2025-04-05 08:05:00',
      estado: 'Disponible'
    });
    setDestino('Destino actual');
    setHoraSalida('2025-04-05 08:05:00');
    setEstado('Disponible');
  }, [params.numeroVuelo]);

  // const handleActualizar = async () => {
  //   if (vuelo) {
  //     try {
  //       // Convertir la fecha al formato correcto
  //       const formattedHoraSalida = new Date(horaSalida).toISOString().slice(0, 19).replace('T', ' ');
        
  //       const response = await actualizarVuelo(vuelo.numero_vuelo, destino, formattedHoraSalida, estado);
  //       alert('Vuelo actualizado exitosamente');
  //     } catch (error) {
  //       console.error('Error al actualizar vuelo:', error);
  //       alert('Error al actualizar vuelo');
  //     }
  //   }
  // };

  const handleActualizar = async () => {
    try {
        const formattedHoraSalida = new Date(horaSalida).toISOString().slice(0, 19).replace('T', ' ');

        const response = await fetch(`http://localhost:8000/vuelos/update/${params.numeroVuelo}`, {
            method: 'PUT', // O PATCH dependiendo de tu API
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                destino,
                hora_salida: formattedHoraSalida,
                estado,
            }),
        });

        if (!response.ok) {
            throw new Error('Error al actualizar el vuelo');
        }

        console.log('Vuelo actualizado exitosamente');
        alert('Vuelo actualizado exitosamente');
    } catch (error) {
        console.error('Error al actualizar el vuelo:', error);
        alert('Error al actualizar el vuelo');
    }
};

  if (!vuelo) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 ">
      <div className="flex justify-center items-center py-5">
            <h1 className="text-2xl font-semibold whitespace-nowrap dark:text-white">Registro de vuelo</h1>
            </div>
      <div className="max-w-md mx-auto ">
      <div className="relative z-0 w-full mb-5 group">
      <input className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" type="text" value={vuelo.numero_vuelo} readOnly />
        <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Número de Vuelo:</label>
        
      </div >
      <div className="relative z-0 w-full mb-5 group">
        
        <input className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" type="text" value={destino} onChange={(e) => setDestino(e.target.value)} />
        <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Destino:</label>
      </div>
      <div className="relative z-0 w-full mb-5 group">
        
        <input className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"  type="text" value={horaSalida} onChange={(e) => setHoraSalida(e.target.value)} />
        <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Hora de Salida:</label>
      </div>
      <div className="relative z-0 w-full mb-5 group">
        
        <input className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"  type="text" value={estado} onChange={(e) => setEstado(e.target.value)} />
        <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Estado:</label>
      </div>
      <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={handleActualizar}>Actualizar</button>
      </div>
    </div>
  );
}

export default VuelosEdit;
