import { Injectable } from '@angular/core';
import { of, Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { URL_BACKEND } from 'src/config/config';
import { Producto } from '../ventas/models/producto';
import { AuthService } from '../usuarios/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  public urlEndPonint:string = URL_BACKEND + '/leonesgym/productos';

  public httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(public http: HttpClient,
    public router: Router, public authService: AuthService) { }

    private isNoAutorizado(e): boolean{
      if(e.status==401){
  
        if(this.authService.isAuthenticated()) {
          this.authService.logout();
        }
  
        this.router.navigate(['/login'])
        return true;
      }
      if( e.status==403){
        Swal.fire('Accedo denegado', `Hola ${this.authService.usuario.username} no tienes acceso a este recurso!`, 'warning');
        this.router.navigate(['/clientes']);
        return true;
      }
      return false;
    }

  getProductos(page: number): Observable<any> {
    return this.http.get(this.urlEndPonint + '/page/' + page).pipe(
       tap((response: any) => {
        (response.content as Producto[]).forEach(producto => {
          console.log(producto);
        });
      }),
      map((response: any) => {
        (response.content as Producto[]).map(producto => {
            producto.nombre = producto.nombre;
          return producto;
        });
        return response;
      }),
      tap(response => {
        console.log('ProductoService: tap 2');
        (response.content as Producto[]).forEach(producto => {
          console.log(producto);
        });
      })
      );
    }

    create(producto: Producto) : Observable<Producto> {
      return this.http.post(this.urlEndPonint, producto, {headers: this.httpHeaders}).pipe(
        map ( (response: any) => response.producto as Producto),
        catchError(e => {

          if(this.isNoAutorizado(e)){
            return throwError(e);
          }

          if(e.estatus==400){
            return throwError(e);
          }

          console.error(e.error.mensaje);
          Swal.fire(e.error.mensaje, e.error.error, 'error');
          return throwError(e);
        })
      );
    }

    getProducto(id): Observable<Producto>{
      return this.http.get<Producto>(`${this.urlEndPonint}/${id}`).pipe(
        catchError(e => {

          if(this.isNoAutorizado(e)){
            return throwError(e);
          }

          this.router.navigate(['/productos']);
          Swal.fire('Error al buscar', e.error.mensaje, 'error');
          return throwError(e);
        })
      );
    }

    update(producto: Producto): Observable<Producto>{
      return this.http.put<Producto>(`${this.urlEndPonint}/${producto.id}`, producto, {headers: this.httpHeaders}).pipe(
        map( (response: any) => response.producto as Producto),
        catchError(e => {
          Swal.fire(e.error.mensaje, e.error.error, 'error');
          return throwError(e);
        })
      );
    }

    delete(id: number): Observable<Producto>{
      return this.http.delete<Producto>(`${this.urlEndPonint}/${id}`, {headers: this.httpHeaders}).pipe(
        catchError(e => {
          Swal.fire(e.error.mensaje, e.error.error, 'error');
          return throwError(e);
        })
      );
    }

}
