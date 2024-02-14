import { Component } from '@angular/core';
import { ClienteService } from '../clientes/cliente.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../usuarios/auth.service';
import { ModalService } from '../clientes/detalle/modal.service';
import { formatDate } from '@angular/common';
import { Cliente } from '../clientes/cliente';
import { URL_BACKEND } from 'src/config/config';
import { tap } from 'rxjs';

@Component({
  selector: 'app-registros',
  templateUrl: './registros.component.html',
  styleUrls: ['./registros.component.css']
})
export class RegistrosComponent {

  clientes: Cliente[];
  paginador: any;
  clienteSeleccionado: Cliente;
  fecha = formatDate(new Date(), 'yyyy-MM-dd', 'en-ES')
  urlBackend: string = URL_BACKEND;

  constructor(private clienteService: ClienteService,
    private activatedRoute: ActivatedRoute,
    public authService: AuthService,
    public modalService: ModalService){}

  ngOnInit(){
    this.activatedRoute.paramMap.subscribe( params => {
    let page:number = +params.get('page');

    if(!page){
      page = 0;
    }

    this.clienteService.getRegistros(page)
    .pipe(
      tap(response => {
        console.log('ClientesComponent: tap 3');
        (response.content as Cliente[]).forEach(cliente => {
          console.log(cliente.nombre);
        });
      })
    ).subscribe(response => {
      this.clientes = response.content as Cliente[];
      this.paginador = response;
    });
    });

    this.modalService.notificarUpload.subscribe(cliente => {
      this.clientes = this.clientes.map(clienteOriginal => {
        if(cliente.id == clienteOriginal.id){
          clienteOriginal.foto = cliente.foto;
        }
        return clienteOriginal;
      });
    });
  }

  abrirModal(cliente: Cliente){
    this.clienteSeleccionado = cliente;
    this.modalService.abrirModal();
  }
}
