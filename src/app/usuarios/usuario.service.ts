import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import { of, Observable, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Usuario } from './usuario';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public urlEndPoint:string = 'http://localhost:8080/leonesgym/usuarios';

  public httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(public http: HttpClient,
    public router: Router) { }

    getUsuarios(): Observable<Usuario[]>{
      return this.http.get<Usuario[]>(this.urlEndPoint);
    }

    create(usuario: Usuario): Observable<Usuario>{
      return this.http.post(this.urlEndPoint, usuario, {headers: this.httpHeaders}).pipe(
        map( (response: any) => response.usuario as Usuario),
        catchError(e => {
          Swal.fire(e.error.mensaje, e.error.error, 'error');
          return throwError(e);
        })
      );
    }

    getUsuario(id): Observable<Usuario>{
      return this.http.get<Usuario>(`${this.urlEndPoint}/${id}`).pipe(
        catchError(e => {
          this.router.navigate(['/usuarios']);
          Swal.fire('Error al buscar', e.error.mensaje, 'error');
          return throwError(e);
        })
      );
    }

    update(usuario: Usuario): Observable<Usuario>{
      return this.http.put<Usuario>(`${this.urlEndPoint}/${usuario.id}`, usuario, {headers: this.httpHeaders}).pipe(
        map( (response: any) => response.usuario as Usuario),
        catchError(e => {
          Swal.fire(e.error.mensaje, e.error.error, 'error');
          return throwError(e);
        })
      );
    }

    delete(id: number): Observable<Usuario>{
      return this.http.delete<Usuario>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders}).pipe(
        catchError(e => {
          Swal.fire(e.error.mensaje, e.error.error, 'error');
          return throwError(e);
        })
      );
    }
}
