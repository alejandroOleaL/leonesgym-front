import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import { of, Observable, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Usuario } from './usuario';
import { map, catchError, tap } from 'rxjs/operators';
import { Role } from './role';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public urlEndPoint:string = 'http://localhost:8080/leonesgym/usuarios';

  public httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(public http: HttpClient,
    public router: Router, public authService: AuthService) { }

    private agregarAuthorizationHeader(){
      let token = this.authService.token;
      if(token != null){
        return this.httpHeaders.append('Authorization', 'Bearer ' + token);
      }
      return this.httpHeaders;
    }

    getUsuarios(page: number): Observable<any> {
      return this.http.get(this.urlEndPoint + '/page/' + page).pipe(
         tap((response: any) => {
          (response.content as Usuario[]).forEach(usuario => {
            console.log(usuario.roles);
          });
        }),
        map((response: any) => {
          (response.content as Usuario[]).map(usuario => {
            usuario.nombre = usuario.nombre.toUpperCase();
            return usuario;
          });
          return response;
        }),
        tap(response => {
          console.log('UsuarioService: tap 2');
          (response.content as Usuario[]).forEach(usuario => {
            console.log(usuario.roles);
          });
        })
          );
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

    getRoles(): Observable<Role[]>{
      return this.http.get<Role[]>(this.urlEndPoint + '/roles').pipe(
        catchError(e => {
          this.isNoAutorizado(e);
          return throwError(e);
        })
      );
    }

    getUsuario(id): Observable<Usuario>{
      return this.http.get<Usuario>(`${this.urlEndPoint}/${id}`, {headers: this.agregarAuthorizationHeader()}).pipe(
        catchError(e => {

          if(this.isNoAutorizado(e)){
            return throwError(e);
          }

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
}
