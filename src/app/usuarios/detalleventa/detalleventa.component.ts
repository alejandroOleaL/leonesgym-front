import { Component, Input } from '@angular/core';
import { UsuarioService } from '../usuario.service';
import { ActivatedRoute } from '@angular/router';
import { ModalService } from 'src/app/clientes/detalle/modal.service';
import { URL_BACKEND } from 'src/config/config';
import { Usuario } from '../usuario';
import { VentaService } from 'src/app/ventas/services/venta.service';
import { Venta } from 'src/app/ventas/models/venta';
import swal from 'sweetalert2';

@Component({
  selector: 'app-detalleventa',
  templateUrl: './detalleventa.component.html',
  styleUrls: ['./detalleventa.component.css']
})
export class DetalleventaComponent {

  @Input() usuario: Usuario;

  titulo: string = "Detalle del usuario";
  public fotoSeleccionada: File;
  public progreso: number = 0;

  urlBackend: string = URL_BACKEND;

  constructor(public usuarioService: UsuarioService,
              public activatedRoute: ActivatedRoute,
              public modalService: ModalService,
              public ventaService: VentaService){}

  ngOnInit(): void {
 
  }

  cerrarModal(){
    this.modalService.cerrarModal();
    this.progreso = 0;
  }

  delete(venta: Venta): void {
    swal.fire({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar la venta ${venta.id}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.ventaService.delete(venta.id).subscribe(
          response => {
            this.usuario.ventas = this.usuario.ventas.filter(f => f !== venta)
            swal.fire(
              'Venta eliminada!',
              `Venta ${venta.id} eliminada con éxito.`,
              'success'
            )
          }
        )

        
      }
    })
  }

}
