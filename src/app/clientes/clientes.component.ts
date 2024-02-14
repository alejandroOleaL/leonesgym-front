import { Component, OnInit, ViewChild } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { ModalService } from './detalle/modal.service';
import swal from 'sweetalert2';
import { tap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { formatDate } from '@angular/common';
import { AuthService } from '../usuarios/auth.service';
import { URL_BACKEND } from 'src/config/config';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[];
  paginador: any;
  clienteSeleccionado: Cliente;
  fecha = formatDate(new Date(), 'yyyy-MM-dd', 'en-ES')
  urlBackend: string = URL_BACKEND;
  dataSource:any;

  @ViewChild(MatSort, {static: true}) sort!: MatSort;

  constructor(private clienteService: ClienteService,
    private activatedRoute: ActivatedRoute,
    public authService: AuthService,
    public modalService: ModalService){}

    columnas: string[] = ['nombre', 'apellidos', 'numControl', 'fechaInicio', 'fechaFin', 'estatus', 'eliminar'];

  ngOnInit(){
    this.activatedRoute.paramMap.subscribe( params => {
    let page:number = +params.get('page');

    if(!page){
      page = 0;
    }

    this.clienteService.getClientes(page)
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
      this.dataSource = new MatTableDataSource<Cliente>(this.clientes);
    console.log(this.dataSource)
    this.dataSource.sort = this.sort;
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

  delete(cliente: Cliente): void {
    swal.fire({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar al cliente ${cliente.nombre} ${cliente.apellidos}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.clienteService.delete(cliente.id).subscribe(
          response => {
            this.clientes = this.clientes.filter(cli => cli !== cliente)
            swal.fire(
              'Cliente eliminado!',
              `Cliente ${cliente.nombre} eliminado con éxito.`,
              'success'
            )
          }
        )

        
      }
    })
  }

  abrirModal(cliente: Cliente){
    this.clienteSeleccionado = cliente;
    this.modalService.abrirModal();
  }

}
