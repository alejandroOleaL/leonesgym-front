import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URL_BACKEND } from 'src/config/config';
import { Venta } from '../models/venta';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  public urlEndPonint:string = URL_BACKEND + '/leonesgym/ventas';

  constructor(public http: HttpClient) { }

  getVenta(id:number):Observable<Venta>{
    return this.http.get<Venta>(`${this.urlEndPonint}/${id}`);
  }

  delete(id: number): Observable<void>{
    return this.http.delete<void>(`${this.urlEndPonint}/${id}`);
  }

  filtrarProducto(term:string): Observable<Producto[]>{
    return this.http.get<Producto[]>(`${this.urlEndPonint}/filtrar-productos/${term}`);
  }

  create(venta: Venta): Observable<Venta> {
    return this.http.post<Venta>(this.urlEndPonint, venta);
  }

}
