import { Component, OnInit } from '@angular/core';
import { Venta } from './models/venta';
import { UsuarioService } from '../usuarios/usuario.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Observable} from 'rxjs';
import {flatMap, map, startWith} from 'rxjs/operators';
import {AsyncPipe} from '@angular/common';
import {MatAutocompleteModule, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { VentaService } from './services/venta.service';
import { Producto } from './models/producto';
import { ItemVentaComponent } from './item-venta.component';
import { DetalleVenta } from './models/detalle-venta';
import Swal from 'sweetalert2';
import { AuthService } from '../usuarios/auth.service';
import { Usuario } from '../usuarios/usuario';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit{

  titulo: string = 'Nueva Venta';
  venta: Venta = new Venta();
  usuario: Usuario =  new Usuario();
  autoCompleteControl = new FormControl();
  productosFiltrados: Observable<Producto[]>;

  constructor(public usuarioService: UsuarioService,
              public activatedRoute: ActivatedRoute,
              public ventaService: VentaService,
              public authService: AuthService,
              public router: Router){}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      let usuarioId = +params.get('usuarioId');
      let user = this.authService.obtenerUsuario();
      console.log('USER:', user)
      this.usuarioService.getUsuarioUsername(user).subscribe(usuario => this.venta.usuario = usuario);
      this.venta.user = user;
    });

    this.productosFiltrados = this.autoCompleteControl.valueChanges
    .pipe(
      map(value => typeof value === 'string'? value: value.nombre),
      flatMap(value => value ? this._filter(value): [])
    );
  }

  private _filter(value: string): Observable<Producto[]> {
    const filterValue = value.toLowerCase();

    return this.ventaService.filtrarProducto(filterValue);
  }

  mostrarNombre(producto?: Producto):string | undefined{
    return producto? producto.nombre: undefined;
  }

  seleccionarProducto(event: MatAutocompleteSelectedEvent): void {
    let producto = event.option.value as Producto;
    console.log(producto);

    if(this.existeItem(producto.id)){
      this.incrementaCantidad(producto.id);
    } else {
      let nuevoItem = new DetalleVenta();
      nuevoItem.producto = producto;
      this.venta.detalles.push(nuevoItem);
    }

    this.autoCompleteControl.setValue('');
    event.option.focus();
    event.option.deselect();
  }

  actualizarCantidad(id:number, event:any): void {
    let cantidad:number = event.target.value as number;

    if(cantidad==0){
      return this.eliminarItemVenta(id);
    }

    this.venta.detalles = this.venta.detalles.map((item:DetalleVenta) => {
      if(id === item.producto.id){
        item.cantidad = cantidad;
      }
      return item;
    });
  }

  existeItem(id:number):boolean {
    let existe = false;
    this.venta.detalles.forEach((item: DetalleVenta) => {
      if(id === item.producto.id){
        existe = true;
      }
    });
    return existe;
  }

  incrementaCantidad(id:number):void {
    this.venta.detalles = this.venta.detalles.map((item: DetalleVenta) => {
      if(id === item.producto.id){
        ++item.cantidad;
      }
      return item;
    });
  }

  eliminarItemVenta(id:number):void {
    this.venta.detalles = this.venta.detalles.filter((item: DetalleVenta) => id !== item.producto.id);
  }

  create(): void {
    console.log(this.venta);
    this.ventaService.create(this.venta).subscribe(venta => {
      Swal.fire(this.titulo, `Venta registrada con éxito!`, 'success');
      this.router.navigate(['/clientes']);
    });
  }

}
