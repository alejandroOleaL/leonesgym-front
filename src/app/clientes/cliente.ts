import { Periodo
 } from "./periodo";
export class Cliente {
    id:number;
    nombre:string;
    apellidos:string;
    fechaInicio:string;
    fechaFin: string;
    correo:string;
    foto:string;
    periodo: Periodo;
    diasPeriodo: number;
    estatus: boolean;
    username:string;
    roleUser:string;
    existe: boolean;
}
