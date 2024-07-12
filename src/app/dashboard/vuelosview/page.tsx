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
  const router = useRouter()

  // useEffect(() => {
  //   const fetchVuelos = async () => {
  //     try {
  //       const response = await fetch('http://localhost:8000/', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'text/xml',
            
  //         },
  //         body: `<?xml version="1.0"?>
  //           <methodCall>
  //             <methodName>consultar_vuelos</methodName>
  //             <params></params>
  //           </methodCall>`,
            
  //       } );

  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }

  //       const text = await response.text();
  //       console.log(text); // Imprime la respuesta en texto para depuración

  //       const parser = new DOMParser();
  //       const xmlDoc = parser.parseFromString(text, "text/xml");

  //       const vuelosArray: Vuelo[] = [];
  //       const values = xmlDoc.getElementsByTagName("value");

  //       for (let i = 0; i < values.length; i++) {
  //         const struct = values[i].getElementsByTagName("struct")[0];
  //         if (struct) {
  //           const id = parseInt(struct.getElementsByTagName("int")[0].textContent || '0');
  //           const numero_vuelo = struct.getElementsByTagName("string")[0].textContent || '';
  //           const destino = struct.getElementsByTagName("string")[1].textContent || '';
  //           const hora_salida = struct.getElementsByTagName("string")[2].textContent || '';
  //           const estado = struct.getElementsByTagName("string")[3].textContent || '';
            
  //           // Verifica si ya existe un vuelo con el mismo ID antes de agregarlo
  //           if (!vuelosArray.some(v => v.id === id)) {
  //             vuelosArray.push({ id, numero_vuelo, destino, hora_salida, estado });
  //           }
  //         }
  //       }

  //       setVuelos(vuelosArray);
  //     } catch (error) {
  //       console.error('Error al obtener vuelos:', error);
  //     }
  //   };

  //   fetchVuelos();
  // }, []);

  // const handleCancelar = (id: number) => {
  //   // Lógica para cancelar el vuelo con el ID dado
  //   console.log(`Cancelar vuelo con ID: ${id}`);
  // };

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

  return (
    <div>
      <h1>Lista de Vuelos</h1>
      <ul>
        {vuelos.map((vuelo) => (
          <li key={vuelo.id}>
            {vuelo.numero_vuelo} - {vuelo.destino} - {vuelo.hora_salida} - {vuelo.estado} 
            <Link href={`/dashboard/vuelosedit/${vuelo.numero_vuelo}`} passHref>
              <button>Editar</button>
            </Link>
            <button onClick={() => handleCancelar(vuelo.numero_vuelo)}>Cancelar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Vuelos;
