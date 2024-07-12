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
            <h1>Registro de vuelo</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="numero_vuelo">Número de vuelo</label>
                <input type="text" id="numero_vuelo" {...register("numero_vuelo")} />
                {errors.numero_vuelo?.message && <p>{errors.numero_vuelo?.message}</p>}

                <label htmlFor="destino">Destino</label>
                <input type="text" id="destino" {...register("destino")} />
                {errors.destino?.message && <p>{errors.destino?.message}</p>}

                <label htmlFor="hora_salida">Hora de salida</label>
                <input type="datetime-local" id="hora_salida" {...register("hora_salida")} />
                {errors.hora_salida?.message && <p>{errors.hora_salida?.message}</p>}

                <label htmlFor="estado">Estado</label>
                <select id="estado" {...register("estado")}>
                    {estadosOptions}
                </select>
                {errors.estado?.message && <p>{errors.estado?.message}</p>}

                <button type="submit">Enviar</button>
            </form>
            <div>
                {JSON.stringify(watch(), null, 2)}
            </div>
        </>
    );
}
