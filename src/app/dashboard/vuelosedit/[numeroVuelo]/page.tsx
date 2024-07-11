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

  const handleActualizar = async () => {
    if (vuelo) {
      try {
        // Convertir la fecha al formato correcto
        const formattedHoraSalida = new Date(horaSalida).toISOString().slice(0, 19).replace('T', ' ');
        
        const response = await actualizarVuelo(vuelo.numero_vuelo, destino, formattedHoraSalida, estado);
        alert('Vuelo actualizado exitosamente');
      } catch (error) {
        console.error('Error al actualizar vuelo:', error);
        alert('Error al actualizar vuelo');
      }
    }
  };

  if (!vuelo) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h1>Editar Vuelo</h1>
      <div>
        <label>Número de Vuelo:</label>
        <input type="text" value={vuelo.numero_vuelo} readOnly />
      </div>
      <div>
        <label>Destino:</label>
        <input type="text" value={destino} onChange={(e) => setDestino(e.target.value)} />
      </div>
      <div>
        <label>Hora de Salida:</label>
        <input type="text" value={horaSalida} onChange={(e) => setHoraSalida(e.target.value)} />
      </div>
      <div>
        <label>Estado:</label>
        <input type="text" value={estado} onChange={(e) => setEstado(e.target.value)} />
      </div>
      <button onClick={handleActualizar}>Actualizar</button>
    </div>
  );
}

export default VuelosEdit;
