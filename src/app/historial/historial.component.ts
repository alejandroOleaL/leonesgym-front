import { Component, OnInit } from '@angular/core';
import { Historial } from './historial';
import { HistorialService } from './historial.service';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {

  public historial: Historial[];
  paginador: any;

  constructor(public historialService: HistorialService,
    public activatedRoute: ActivatedRoute) {}  

  ngOnInit(){
    this.activatedRoute.paramMap.subscribe( params => {
    let page:number = +params.get('page');

    if(!page){
      page = 0;
    }

    this.historialService.getHistorial(page)
    .pipe(
      tap(response => {
        console.log('HistorialComponent: tap 3');
        (response.content as Historial[]).forEach(historial => {
          console.log(historial.nombre);
        });
      })
    ).subscribe(response => {
      this.historial = response.content as Historial[];
      this.paginador = response;
    });
    });
  }
}
