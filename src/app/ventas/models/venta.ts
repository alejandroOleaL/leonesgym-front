import { Usuario } from "src/app/usuarios/usuario";
import { DetalleVenta } from "./detalle-venta";

export class Venta {

    id: number;
    nota: String;
    detalles: Array<DetalleVenta>=[];
    usuario: Usuario;
    total: number;
    fechaVenta: string;
    horaVenta: string;
    user: string;

    calcularGranTotal(): number{
        this.total = 0;
        this.detalles.forEach((item:DetalleVenta) => {
            this.total = this.total + item.calcularImporte();
        });
        return this.total;
    }
}
