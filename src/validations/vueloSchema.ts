import {z} from 'zod';

const estado = ["Disponible", "Programado"] as const;

export type Estados = (typeof estado)[number];

export const mappedEstados: {[key in Estados]:string}={
    Disponible:"Disponible",
    Programado:"Programado"
}

export const vueloSchema = z.object({
numero_vuelo: z.string().refine(numero_vuelo => !isNaN(parseInt(numero_vuelo)),{
    message:"El numero de vuelo debe ser un número"
}),
destino: z.string().min(3, {message:"El destino debe tener al menos 3 caracteres"}),
hora_salida: z.coerce.date({message:"La hora de salida debe ser una fecha"}),
estado: z.enum(estado,{
    errorMap: ()=>({message:"Debe escoger un estado"})
}),
});