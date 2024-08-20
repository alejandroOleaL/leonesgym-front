import { Producto } from "./producto";

export class DetalleVenta {

    producto: Producto;
    cantidad: number  = 1;
    importe: number;

    public calcularImporte(): number{
        return this.cantidad * this.producto.precio;
    }
}
