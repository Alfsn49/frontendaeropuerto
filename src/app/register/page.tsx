"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { vueloSchema, mappedEstados } from "@/validations/vueloSchema";
import {registrarVuelo} from "../../utils/xmlrpcClient"

type Inputs ={
    numero_vuelo: string;
    destino: string;
    hora_salida: string;
    estado: string;
}

export default function Register() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>({
        resolver: zodResolver(vueloSchema)
    });

    const estadosOptions = Object.entries(mappedEstados).map(([key, value]) => (
        <option key={key} value={key}>{value}</option>
    ));

    console.log(errors);

    // const onSubmit:SubmitHandler<Inputs> = async (data) => {
    //     console.log(data);
    //     try{
    //         const formattedHoraSalida = new Date(data.hora_salida).toISOString().slice(0, 19).replace('T', ' ');
            
    //         const response = await registrarVuelo(
    //             data.numero_vuelo,
    //             data.destino,
    //             formattedHoraSalida,
    //             data.estado
    //         );
    //         console.log('Respuesta del servidor:', response);
    //     }catch(error){
    //         console.error('Error al enviar el formulario',error)
    //     }
    // };

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        console.log(data);
        try {
            const formattedHoraSalida = new Date(data.hora_salida).toISOString().slice(0, 19).replace('T', ' ');
            
            const response = await fetch('http://localhost:8000/vuelos/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    numero_vuelo: data.numero_vuelo,
                    destino: data.destino,
                    hora_salida: data.hora_salida,
                    estado: data.estado,
                }),
            });
            
            if (!response.ok) {
                throw new Error('Error en la respuesta del servidor');
            }

            const responseData = await response.json();
            console.log('Respuesta del servidor:', responseData);
        } catch (error) {
            console.error('Error al enviar el formulario', error);
        }
    };
    return (
        <>
            <div className="min-h-screen bg-gray-100 ">
            <div className="flex justify-center items-center py-5">
            <h1 className="text-2xl font-semibold whitespace-nowrap dark:text-white">Registro de vuelo</h1>
            </div>
            <div className="py-20">
            <form className="max-w-md mx-auto " onSubmit={handleSubmit(onSubmit)}>
                <div className="relative z-0 w-full mb-5 group">
                <input className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" type="text" id="numero_vuelo" {...register("numero_vuelo")} />
                <label htmlFor="numero_vuelo" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Número de vuelo</label>
                {errors.numero_vuelo?.message && <p className="text-red-500">{errors.numero_vuelo?.message}</p>}
                </div>

                
                <div className="relative z-0 w-full mb-5 group">
                <input className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" type="text" id="destino" {...register("destino")} />
                <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6" htmlFor="destino">Destino</label>
                {errors.destino?.message && <p className="text-red-500">{errors.destino?.message}</p>}
                </div>

                <div className="relative z-0 w-full mb-5 group">
                <input className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" type="datetime-local" id="hora_salida" {...register("hora_salida")} />
                <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6" htmlFor="hora_salida">Hora de salida</label>
                {errors.hora_salida?.message && <p className="text-red-500">{errors.hora_salida?.message}</p>}
                </div>

                <div className="relative z-0 w-full mb-5 group">
                <select className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" id="estado" {...register("estado")}>
                    {estadosOptions}
                </select>
                <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6" htmlFor="estado">Estado</label>
                {errors.estado?.message && <p className="text-red-500">{errors.estado?.message}</p>}
                </div>

                <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="submit">Enviar</button>
            </form>
            </div>
            <div>
                {JSON.stringify(watch(), null, 2)}
            </div>
            </div>
        </>
    );
}
