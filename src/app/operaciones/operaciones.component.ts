import { Component, OnInit } from '@angular/core';
import { Operacion } from './operacion';
import { OperacionesService } from './operaciones.service';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';

@Component({
  selector: 'app-operaciones',
  templateUrl: './operaciones.component.html',
  styleUrls: ['./operaciones.component.css']
})
export class OperacionesComponent implements OnInit{

  public operacion: Operacion[];
  paginador: any;

  constructor(public operacionService: OperacionesService,
    public activatedRoute: ActivatedRoute) {}  

  ngOnInit(){
    this.activatedRoute.paramMap.subscribe( params => {
    let page:number = +params.get('page');

    if(!page){
      page = 0;
    }

    this.operacionService.getOperaciones(page)
    .pipe(
      tap(response => {
        console.log('OperacionComponent: tap 3');
        (response.content as Operacion[]).forEach(operacion => {
          console.log(operacion.cliente);
        });
      })
    ).subscribe(response => {
      this.operacion = response.content as Operacion[];
      this.paginador = response;
    });
    });
  }

}
