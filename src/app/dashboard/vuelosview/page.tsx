'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { consultarVuelos } from '@/utils/xmlrpcClient';
import {useRouter} from 'next/navigation'

interface Vuelo {
  id: number;
  numero_vuelo: string;
  destino: string;
  hora_salida: string;
  estado: string;
}

const Vuelos: React.FC = () => {
  const [vuelos, setVuelos] = useState<Vuelo[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter()

  
  useEffect(() => {
    const fetchVuelos = async () => {
      try {
        const response = await fetch('http://localhost:8000/vuelos/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data: Vuelo[] = await response.json();
        setVuelos(data);
      } catch (error) {
        console.error('Error al obtener vuelos:', error);
      } finally{
        setLoading(false);
      }
    };

    fetchVuelos();
  }, []);

  const handleCancelar = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:8000/vuelos/cancel/${id}`, {
        method: 'PUT', // O el método adecuado para cancelar en tu API
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }), // Puedes enviar más datos si tu API lo requiere
      });

      if (!response.ok) {
        throw new Error('Error al cancelar el vuelo');
      }

      console.log(`Vuelo con ID ${id} cancelado exitosamente`);
      router.refresh()
      // Aquí puedes actualizar localmente la lista de vuelos o mostrar un mensaje de éxito
    } catch (error) {
      console.error('Error al cancelar el vuelo:', error);
      // Aquí puedes manejar el error, mostrar un mensaje de error, etc.
    }
  };
  if (loading) {
    return <p>Cargando vuelos...</p>;
  }

  return (
    <div className="mx-auto max-w-3xl p-4 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-4">Lista de Vuelos</h1>
      <ul className="divide-y divide-gray-200">
        {vuelos.map((vuelo) => (
          <li key={vuelo.id} className="py-4 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-xl font-semibold">{vuelo.numero_vuelo}</span>
              <span className="text-gray-600">{vuelo.destino}</span>
              <span className="text-gray-600">{vuelo.hora_salida}</span>
              <span className="text-gray-600">{vuelo.estado}</span>
            </div>
            <div className="flex gap-2">
              <Link href={`/dashboard/vuelosedit/${vuelo.numero_vuelo}`} passHref>
                <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Editar</button>
              </Link>
              <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600" onClick={() => handleCancelar(vuelo.numero_vuelo)}>Cancelar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Vuelos;
