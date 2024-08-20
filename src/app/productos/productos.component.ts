import { Component, OnInit } from '@angular/core';
import { ProductoService } from './producto.service';
import { ActivatedRoute } from '@angular/router';
import { Producto } from '../ventas/models/producto';
import { tap } from 'rxjs';
import swal from 'sweetalert2';
import { AuthService } from '../usuarios/auth.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  
  public producto: Producto[];
  paginador: any;

  constructor(public productoService: ProductoService,
    public authService: AuthService,
    public activatedRoute: ActivatedRoute) {} 

  ngOnInit(){
    this.activatedRoute.paramMap.subscribe( params => {
    let page:number = +params.get('page');

    if(!page){
      page = 0;
    }

    this.productoService.getProductos(page)
    .pipe(
      tap(response => {
        console.log('HistorialComponent: tap 3');
        (response.content as Producto[]).forEach(producto => {
          console.log(producto.nombre);
        });
      })
    ).subscribe(response => {
      this.producto = response.content as Producto[];
      this.paginador = response;
    });
    });
  }

  delete(producto: Producto): void {
    swal.fire({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar el producto ${producto.nombre}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.productoService.delete(producto.id).subscribe(
          response => {
            this.producto = this.producto.filter(cli => cli !== producto)
            swal.fire(
              'Producto eliminado!',
              `Producto ${producto.nombre} eliminado con éxito.`,
              'success'
            )
          }
        )

        
      }
    })
  }

}
