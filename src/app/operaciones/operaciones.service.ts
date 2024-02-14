import { Injectable } from '@angular/core';
import { of, Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { URL_BACKEND } from 'src/config/config';
import { Operacion } from './operacion';

@Injectable({
  providedIn: 'root'
})
export class OperacionesService {

  public urlEndPonint:string = URL_BACKEND + '/leonesgym/operaciones';

  constructor(public http: HttpClient,
    public router: Router) { }

  getOperaciones(page: number): Observable<any> {
    return this.http.get(this.urlEndPonint + '/page/' + page).pipe(
       tap((response: any) => {
        (response.content as Operacion[]).forEach(operacion => {
          console.log(operacion);
        });
      }),
      map((response: any) => {
        (response.content as Operacion[]).map(operacion => {
            operacion.cliente = operacion.cliente;
          return operacion;
        });
        return response;
      }),
      tap(response => {
        console.log('OperacionService: tap 2');
        (response.content as Operacion[]).forEach(operacion => {
          console.log(operacion.cliente);
        });
      })
        );
    }
}