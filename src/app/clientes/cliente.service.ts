import { Injectable } from '@angular/core';
import { formatDate, DatePipe} from '@angular/common';
import { Cliente } from './cliente';
import { Periodo } from './periodo';
import { of, Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AuthService } from '../usuarios/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  public urlEndPonint:string = 'http://localhost:8080/leonesgym/clientes';

  public urlEndPointQr:string = 'http://localhost:8080/leonesgym/clientes/qr';

  public urlEndPonintNumero:string = 'http://localhost:8080/leonesgym/clientes/numero/control';
  public httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(public http: HttpClient,
    public router: Router, public authService, AuthSerivce) { }

  private agregarAuthorizationHeader(){
    let token = this.authService.token;
    if(token != null){
      return this.httpHeaders.append('Authorization', 'Bearer ' + token);
    }
    return this.httpHeaders;
  }

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

  getPeriodos(): Observable<Periodo[]>{
    return this.http.get<Periodo[]>(this.urlEndPonint + '/periodos').pipe(
      catchError(e => {
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }

  getClientes(page: number): Observable<any> {
    return this.http.get(this.urlEndPonint + '/page/' + page).pipe(
       tap((response: any) => {
        (response.content as Cliente[]).forEach(cliente => {
          console.log(cliente.nombre);
        });
      }),
      map((response: any) => {
        (response.content as Cliente[]).map(cliente => {
          cliente.nombre = cliente.nombre.toUpperCase();
          return cliente;
        });
        return response;
      }),
      tap(response => {
        console.log('ClienteService: tap 2');
        (response.content as Cliente[]).forEach(cliente => {
          console.log(cliente.nombre);
        });
      })
        );
    }

    create(cliente: Cliente) : Observable<Cliente> {
      return this.http.post(this.urlEndPonint, cliente, {headers: this.httpHeaders}).pipe(
        map ( (response: any) => response.cliente as Cliente),
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

    getCliente(id): Observable<Cliente>{
      return this.http.get<Cliente>(`${this.urlEndPonint}/${id}`, {headers: this.agregarAuthorizationHeader()}).pipe(
        catchError(e => {

          if(this.isNoAutorizado(e)){
            return throwError(e);
          }

          this.router.navigate(['/clientes']);
          Swal.fire('Error al buscar', e.error.mensaje, 'error');
          return throwError(e);
        })
      );
    }

    getClienteQr(id): Observable<Cliente>{
      return this.http.get<Cliente>(`${this.urlEndPointQr}/${id}`).pipe(
        catchError(e => {

          if(this.isNoAutorizado(e)){
            return throwError(e);
          }

          this.router.navigate(['/clientes']);
          Swal.fire('Error al buscar', e.error.mensaje, 'error');
          return throwError(e);
        })
      );
    }

    getClienteNumero(numcontrol): Observable<Cliente>{
      return this.http.get<Cliente>(`${this.urlEndPonintNumero}/${numcontrol}`).pipe(
        catchError(e => {
          this.isNoAutorizado(e);
          return throwError(e);
        })
      );
    }

    update(cliente: Cliente): Observable<any>{
      return this.http.put<any>(`${this.urlEndPonint}/${cliente.id}`, cliente, {headers: this.agregarAuthorizationHeader()}).pipe(
        catchError(e => {

          if(e.estatus==400){
            return throwError(e);
          }

          console.error(e.error.mensaje);
          Swal.fire(e.error.mensaje, e.error.error, 'error');
          return throwError(e);
        })
      );
    }

    delete(id: number): Observable<Cliente>{
      return this.http.delete<Cliente>(`${this.urlEndPonint}/${id}`, {headers: this.agregarAuthorizationHeader()}).pipe(
        catchError(e => {

          if(this.isNoAutorizado(e)){
            return throwError(e);
          }

          console.error(e.error.mensaje);
          Swal.fire(e.error.mensaje, e.error.error, 'error');
          return throwError(e);
        })
      );
    }

    subirFoto(archivo: File, id): Observable<HttpEvent<{}>>{
      let formData = new FormData();
      formData.append("archivo", archivo);
      formData.append("id", id);

      let httpHeaders = new HttpHeaders();
      let token = this.authService.token;
      if(token != null){
        httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + token);
      }

      const req = new HttpRequest('POST', `${this.urlEndPonint}/upload`, formData, {
        reportProgress: true,
        headers: httpHeaders
      });

      return this.http.request(req).pipe(
        catchError(e => {
          this.isNoAutorizado(e);
          return throwError(e);
        })
      );
    }

}
