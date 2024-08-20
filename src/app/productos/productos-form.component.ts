import { Component, OnInit } from '@angular/core';
import { ProductoService } from './producto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../usuarios/auth.service';
import { Producto } from '../ventas/models/producto';
import swal from 'sweetalert2';

@Component({
  selector: 'app-productos-form',
  templateUrl: './productos-form.component.html',
  styleUrls: ['./productos-form.component.css']
})
export class ProductosFormComponent implements OnInit {

  public producto: Producto = new Producto();
  errores: string[];

  constructor(public productoService: ProductoService,
    public authService: AuthService,
    public router: Router,
    public activatedRoute: ActivatedRoute){}

  ngOnInit(){
    this.activatedRoute.paramMap.subscribe(params => {
      let id = +params.get('id');
      if (id) {
        this.productoService.getProducto(id).subscribe((producto) => this.producto = producto);
        console.log(this.producto)
        
      }
    });
  }

  create() {
    this.productoService.create(this.producto).subscribe(json => {
        console.log(this.producto);
        this.router.navigate(['/productos/page/0'])
      swal.fire('Se registro producto', `El producto ${this.producto.nombre} ha sido registrado con éxito!`, 'success')
      },
      err => {
        this.errores = err.error.errors as string[];
      }
    );
  } 

  update(): void{
    this.productoService.update(this.producto).subscribe(
      usuario => {
        this.router.navigate(['/productos/page/0'])
        swal.fire('Producto actualizado', 'Producto actualizado con exito', 'success');
      }
    )
  }
 
}
