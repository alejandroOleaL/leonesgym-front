import { Injectable } from '@angular/core';
import { of, Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Historial } from './historial';

@Injectable({
  providedIn: 'root'
})
export class HistorialService {

  public urlEndPonint:string = 'http://localhost:8080/leonesgym/historial';

  constructor(public http: HttpClient,
    public router: Router) { }

  getHistorial(page: number): Observable<any> {
    return this.http.get(this.urlEndPonint + '/page/' + page).pipe(
       tap((response: any) => {
        (response.content as Historial[]).forEach(historial => {
          console.log(historial.cliente.nombre);
        });
      }),
      map((response: any) => {
        (response.content as Historial[]).map(historial => {
          historial.cliente.nombre = historial.cliente.nombre.toUpperCase();
          return historial;
        });
        return response;
      }),
      tap(response => {
        console.log('ClienteService: tap 2');
        (response.content as Historial[]).forEach(historial => {
          console.log(historial.cliente.nombre);
        });
      })
        );
    }
}
