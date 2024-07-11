// xmlrpcClient.ts

import * as xmlrpc from 'xmlrpc';

const clientRPC = xmlrpc.createClient({
  host: 'localhost',
  port: 8000,
  path: '/',
});

export async function registrarVuelo(numeroVuelo: string, destino: string, horaSalida: string, estado: string) {
  try {
    const value = await new Promise((resolve, reject) => {
      clientRPC.methodCall(
        'registrar_vuelo',
        [numeroVuelo, destino, horaSalida, estado],
        (error, value) => {
          if (error) {
            reject(error);
            console.error('Error en methodCall:', error);
          } else {
            resolve(value);
          }
        }
      );
    });
    return value;
  } catch (error) {
    console.error('Error al realizar la llamada RPC:', error);
    throw error;
  }
  
}
export async function consultarVuelos() {
  try {
    const vuelos = await new Promise<any[]>((resolve, reject) => {
      clientRPC.methodCall('consultar_vuelos', [], (error, value) => {
        
        if (error) {
          reject(error);
          console.error('Error en methodCall:', error);
        } else {
          resolve(value);
          
        }
      });
    });
    return vuelos;
  } catch (error) {
    console.error('Error al realizar la llamada RPC:', error);
    throw error;
  }
}
export async function actualizarVuelo(numeroVuelo: string, destino: string, horaSalida: string, estado: string) {
  try {
    const value = await new Promise((resolve, reject) => {
      clientRPC.methodCall(
        'actualizar_vuelo',
        [numeroVuelo, destino, horaSalida, estado],
        (error, value) => {
          if (error) {
            reject(error);
            console.error('Error en methodCall:', error);
          } else {
            resolve(value);
          }
        }
      );
    });
    return value;
  } catch (error) {
    console.error('Error al realizar la llamada RPC:', error);
    throw error;
  }
}

export async function cancelarVuelo(numeroVuelo: string) {
  try {
    const value = await new Promise((resolve, reject) => {
      clientRPC.methodCall(
        'cancelar_vuelo',
        [numeroVuelo],
        (error, value) => {
          if (error) {
            reject(error);
            console.error('Error en methodCall:', error);
          } else {
            resolve(value);
          }
        }
      );
    });
    return value;
  } catch (error) {
    console.error('Error al realizar la llamada RPC:', error);
    throw error;
  }
}
