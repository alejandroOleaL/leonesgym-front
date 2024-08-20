import { Venta } from "../ventas/models/venta";
import { Role } from "./role";

export class Usuario {
    id:number;
    username:string;
    password:string;
    nombre:string;
    apellidos:string;
    email:string;
    roles:string[]=[];
    role: Role[]=[];
    tipo: number;
    ventas: Venta[] = [];
}
